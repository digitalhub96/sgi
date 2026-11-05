<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Honeypot check
    if (!empty($_POST["website_url"])) {
        @http_response_code(400);
        echo "Spam detected.";
        exit;
    }

    // 2. Origin / Referer check
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

    // 3. JS token validation
    $ts = trim($_POST["_ts"] ?? '');
    $token = trim($_POST["_token"] ?? '');
    $expectedToken = base64_encode($ts . ':sgi_contact_2026');
    if (empty($ts) || !ctype_digit($ts) || !hash_equals($expectedToken, $token)) {
        @http_response_code(403);
        echo "Security verification failed. Please refresh the page and try again.";
        exit;
    }

    // 4. IP Rate Limiting (max 3 contact enquiries per 15 minutes per IP)
    $clientIp = $_SERVER["REMOTE_ADDR"] ?? 'unknown';
    $rateLimitFile = sys_get_temp_dir() . '/sgi_contact_ratelimit.json';
    $now = time();
    $windowSeconds = 900;
    $maxRequests = 3;

    $rateData = [];
    if (file_exists($rateLimitFile)) {
        $raw = @file_get_contents($rateLimitFile);
        $decoded = $raw ? json_decode($raw, true) : [];
        if (is_array($decoded)) {
            $rateData = $decoded;
        }
    }
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
        echo "Too many messages sent. Please wait 15 minutes or call us directly at 0435-3572550.";
        exit;
    }

    // 5. Retrieve and sanitize form data safely
    $name = htmlspecialchars(trim($_POST["Name"] ?? ''), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST["Email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST["phone"] ?? ''), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($_POST["Message"] ?? ''), ENT_QUOTES, 'UTF-8');

    // Check if required fields are not empty
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        echo "Please fill in all the required fields.";
        exit;
    }

    // Validate email format and prevent header injection
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    $normalizedPhone = preg_replace('/[\s\-()]+/', '', $phone);
    if (!preg_match("/^\+?\d{10,15}$/", $normalizedPhone)) {
        echo "Invalid phone number. Please enter a valid 10 to 15 digit phone number.";
        exit;
    }

    if (preg_match('/(https?:\/\/|www\.|<a\s|\[url=)/i', $name . ' ' . $message) || preg_match('/\p{Cyrillic}/u', $name . ' ' . $message)) {
        echo "Links or invalid characters are not allowed in the enquiry form.";
        exit;
    }

    // Record request in rate-limit store
    $rateData[$clientIp][] = $now;
    @file_put_contents($rateLimitFile, json_encode($rateData), LOCK_EX);

    // Email settings
    $to = "booking@sreegrandinn.com";
    $subject = "New Enquiry / Reservation Request";

    // Email content with enhanced HTML styling
    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { background-color: #0056b3; color: #ffffff; padding: 20px; text-align: center; }
            .header h2 { margin: 0; font-size: 24px; }
            .content { padding: 20px; }
            .content h3 { color: #0056b3; font-size: 20px; margin-top: 0; }
            .info { background-color: #f7f7f7; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
            .info p { margin: 5px 0; }
            .label { font-weight: bold; color: #555; }
            .divider { border-bottom: 1px solid #ddd; margin: 20px 0; }
            .footer { background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #777; }
            .footer a { color: #0056b3; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Enquiry / Reservation Request</h2>
            </div>
            <div class='content'>
                <h3>Contact Details</h3>
                <div class='info'>
                    <p><span class='label'>Name:</span> $name</p>
                    <p><span class='label'>Email:</span> $email</p>
                    <p><span class='label'>Phone:</span> $phone</p>
                </div>
                <div class='divider'></div>
                <h3>Message</h3>
                <p>$message</p>
                <div class='divider'></div>
            </div>
        </div>
    </body>
    </html>";

    // Email headers
    $headers = "From: booking@sreegrandinn.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=utf-8\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "Failed to send your message. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
