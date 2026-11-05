<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Honeypot check (bots auto-fill hidden fields)
    if (!empty($_POST["website_url"])) {
        @http_response_code(400);
        echo "Spam detected.";
        exit;
    }

    // 2. Origin / Referer validation (block direct off-site bot POSTs)
    $origin = $_SERVER["HTTP_ORIGIN"] ?? '';
    $referer = $_SERVER["HTTP_REFERER"] ?? '';
    $isLocal = in_array($_SERVER["REMOTE_ADDR"] ?? '', ['127.0.0.1', '::1'], true);
    if (!$isLocal) {
        $validSource = (stripos($origin, 'sreegrandinn.com') !== false) || (stripos($referer, 'sreegrandinn.com') !== false);
        if (!$validSource) {
            @http_response_code(403);
            echo "Invalid request source.";
            exit;
        }
    }

    // 3. JS token & minimum fill-time validation (blocks automated cURL/bot scripts)
    $ts = trim($_POST["_ts"] ?? '');
    $token = trim($_POST["_token"] ?? '');
    $expectedToken = base64_encode($ts . ':sgi_book_2026');
    if (empty($ts) || !ctype_digit($ts) || !hash_equals($expectedToken, $token)) {
        @http_response_code(403);
        echo "Security verification failed. Please refresh the page and try again.";
        exit;
    }

    // 4. IP Rate Limiting (max 3 booking requests per 15 minutes per IP)
    $clientIp = $_SERVER["REMOTE_ADDR"] ?? 'unknown';
    $rateLimitFile = sys_get_temp_dir() . '/sgi_booking_ratelimit.json';
    $now = time();
    $windowSeconds = 900; // 15 minutes
    $maxRequests = 3;

    $rateData = [];
    if (file_exists($rateLimitFile)) {
        $raw = @file_get_contents($rateLimitFile);
        $decoded = $raw ? json_decode($raw, true) : [];
        if (is_array($decoded)) {
            $rateData = $decoded;
        }
    }
    // Prune expired entries
    foreach ($rateData as $ip => $timestamps) {
        $rateData[$ip] = array_values(array_filter($timestamps, function ($t) use ($now, $windowSeconds) {
            return ($now - $t) < $windowSeconds;
        }));
        if (empty($rateData[$ip])) {
            unset($rateData[$ip]);
        }
    }
    if (count($rateData[$clientIp] ?? []) >= $maxRequests) {
        @http_response_code(429);
        echo "Too many booking requests. Please wait 15 minutes or call us directly at 0435-3572550.";
        exit;
    }

    // 5. Retrieve and sanitize form data safely
    $name = htmlspecialchars(trim($_POST["Name"] ?? ''), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST["Email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST["phone"] ?? ''), ENT_QUOTES, 'UTF-8');
    $roomSuite = htmlspecialchars(trim($_POST["room_suite"] ?? ''), ENT_QUOTES, 'UTF-8');
    $checkInDate = htmlspecialchars(trim($_POST["checkin_date"] ?? ''), ENT_QUOTES, 'UTF-8');
    $checkOutDate = htmlspecialchars(trim($_POST["checkout_date"] ?? ''), ENT_QUOTES, 'UTF-8');
    $adults = htmlspecialchars(trim($_POST["adult"] ?? ''), ENT_QUOTES, 'UTF-8');
    $children = htmlspecialchars(trim($_POST["children"] ?? '0'), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($_POST["Message"] ?? ''), ENT_QUOTES, 'UTF-8');

    // Check if required fields are not empty
    if (empty($name) || empty($email) || empty($phone) || empty($roomSuite) || empty($checkInDate) || empty($checkOutDate) || empty($adults) || $children === '') {
        echo "Please fill in all the required fields.";
        exit;
    }

    // 6. Strict whitelist & content validation (prevents spam relay abuse)
    $allowedRooms = ['Premium Room', 'Classic Room', 'Superior Room', 'Executive Suite'];
    if (!in_array($roomSuite, $allowedRooms, true)) {
        echo "Please select a valid room type.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    // Prevent loop if bot submits the hotel's own email address
    if (strtolower($email) === 'booking@sreegrandinn.com' || strtolower($email) === 'sreegrandinn@gmail.com') {
        echo "Please enter your personal email address.";
        exit;
    }

    $normalizedPhone = preg_replace('/[\s\-()]+/', '', $phone);
    if (!preg_match("/^\+?\d{10,15}$/", $normalizedPhone)) {
        echo "Invalid phone number. Please enter a valid 10 to 15 digit phone number.";
        exit;
    }

    $adultsInt = filter_var($adults, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1, "max_range" => 20]]);
    $childrenInt = filter_var($children, FILTER_VALIDATE_INT, ["options" => ["min_range" => 0, "max_range" => 20]]);
    if ($adultsInt === false || $childrenInt === false) {
        echo "Invalid number of guests.";
        exit;
    }

    // Block URLs / links or Cyrillic spam in Name or Message (stops spam bots using confirmation email as a relay)
    if (preg_match('/(https?:\/\/|www\.|<a\s|\[url=)/i', $name . ' ' . $message) || preg_match('/\p{Cyrillic}/u', $name . ' ' . $message)) {
        echo "Links or invalid characters are not allowed in the booking form.";
        exit;
    }

    if (strlen($name) < 2 || strlen($name) > 80 || strlen($message) > 500) {
        echo "Input length exceeded allowed limits.";
        exit;
    }

    if (strtotime($checkOutDate) <= strtotime($checkInDate)) {
        echo "Check-out date must be after the check-in date.";
        exit;
    }

    // Record this request in rate-limit store
    $rateData[$clientIp][] = $now;
    @file_put_contents($rateLimitFile, json_encode($rateData), LOCK_EX);

    // Email settings
    $adminEmail = "booking@sreegrandinn.com"; // Admin email
    $subject = "New Booking Request";

    // Admin email content
    $adminBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { background-color: #c19d68; color: #ffffff; padding: 20px; text-align: center; }
            .header h2 { margin: 0; font-size: 24px; }
            .content { padding: 20px; }
            .content h3 { color: #c19d68; font-size: 20px; margin-top: 0; }
            .info { background-color: #f7f7f7; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
            .info p { margin: 5px 0; }
            .label { font-weight: bold; color: #555; }
            .divider { border-bottom: 1px solid #ddd; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Booking Request</h2>
            </div>
            <div class='content'>
                <h3>Booking Details</h3>
                <div class='info'>
                    <p><span class='label'>Name:</span> $name</p>
                    <p><span class='label'>Email:</span> $email</p>
                    <p><span class='label'>Phone:</span> $phone</p>
                    <p><span class='label'>Room Suite:</span> $roomSuite</p>
                    <p><span class='label'>Check-In Date:</span> $checkInDate</p>
                    <p><span class='label'>Check-Out Date:</span> $checkOutDate</p>
                    <p><span class='label'>Number of Adults:</span> $adults</p>
                    <p><span class='label'>Number of Children:</span> $children</p>
                    <p><span class='label'>Message:</span> $message</p>
                </div>
                <div class='divider'></div>
            </div>
        </div>
    </body>
    </html>";

    // Admin email headers
    $adminHeaders = "From: booking@sreegrandinn.com\r\n";
    $adminHeaders .= "Reply-To: $email\r\n";
    $adminHeaders .= "Content-Type: text/html; charset=utf-8\r\n";

    // Send admin email
    if (!mail($adminEmail, $subject, $adminBody, $adminHeaders)) {
        echo "Failed to send admin email.";
        exit;
    }

    // Client confirmation email
    $clientSubject = "Booking Confirmation - $roomSuite";
    $clientBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { background-color: #c19d68; color: #ffffff; padding: 20px; text-align: center; }
            .header h2 { margin: 0; font-size: 24px; }
            .content { padding: 20px; }
            .content h3 { color: #c19d68; font-size: 20px; margin-top: 0; }
            .info { background-color: #f7f7f7; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
            .info p { margin: 5px 0; }
            .label { font-weight: bold; color: #555; }
            .divider { border-bottom: 1px solid #ddd; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div style='text-align: center;'>
                <img src='https://sreegrandinn.com/assets/images/home-1/logo-1.png' alt='Sree Grand Inn'>
            </div>
            <div style='padding: 10px'>
                <h2 style='font-size:30px'>Sree Grand Inn</h2>
            </div>
            <div class='header'>
                <h2>Booking Confirmation</h2>
            </div>
            <div class='content'>
                <h3>Thank you for your booking, $name!</h3>
                <p>We are pleased to confirm your reservation for the following details:</p>
                <div class='info'>
                    <p><span class='label'>Room Suite:</span> $roomSuite</p>
                    <p><span class='label'>Check-In Date:</span> $checkInDate</p>
                    <p><span class='label'>Check-Out Date:</span> $checkOutDate</p>
                    <p><span class='label'>Number of Adults:</span> $adults</p>
                    <p><span class='label'>Number of Children:</span> $children</p>
                    <p><span class='label'>Message:</span> $message</p>
                </div>
                <div class='divider'></div>
                <p>Our team will check the room availability and get back to you.</p>
                <p>For further details, contact us at:</p>
                <p>Phone: <a href='tel:04353572550'>0435-3572550 / 9363022024</a></p>
                <p>Email: <a href='mailto:booking@sreegrandinn.com'>booking@sreegrandinn.com</a></p>
                <p>Email: <a href='mailto:sreegrandinn@gmail.com'>sreegrandinn@gmail.com</a></p>
                <p>Address: NO.25, Gandhiadigal Salai (Near Mahamaham Tank), Kumbakonam 612001, Tamil Nadu</p>
            </div>
        </div>
    </body>
    </html>";

    // Client email headers
    $clientHeaders = "From: booking@sreegrandinn.com\r\n";
    $clientHeaders .= "Reply-To: booking@sreegrandinn.com\r\n";
    $clientHeaders .= "Content-Type: text/html; charset=utf-8\r\n";

    // Send client email
    if (!mail($email, $clientSubject, $clientBody, $clientHeaders)) {
        echo "Failed to send client email.";
        exit;
    }

    // Success message
    echo "Booking request successfully sent! We have sent a confirmation email to your address.";
} else {
    echo "Invalid request.";
}
?>
