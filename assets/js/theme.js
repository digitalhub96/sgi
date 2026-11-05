(function ($) {
    'use strict';

    // Mobile Menu
    $('.mobile-menu nav').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: ".mobile-menu",
        meanMenuOpen: "<span></span> <span></span> <span></span>",
        onePage: false,
    });

      //curseer animation

        var curser = document.querySelector(".curser");
        var curser2 = document.querySelector(".curser2");
    
        document.addEventListener("mousemove", function(e){
            curser.style.cssText = curser2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
        });


        //======< Accordion Tab >======
            $(".accordion > li:eq(0) a").addClass("active").next().slideDown();

            $(".accordion a").click(function (j) {
                var dropDown = $(this).closest("li").find("p");

                $(this).closest(".accordion").find("p").not(dropDown).slideUp();

                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                } else {
                    $(this).closest(".accordion").find("a.active").removeClass("active");
                    $(this).addClass("active");
                }

                dropDown.stop(false, true).slideToggle();

                j.preventDefault();
            });

//Header Search
    if($('.search-box-outer').length) {
        $('.search-box-outer').on('click', function() {
            $('body').addClass('search-active');
        });
        $('.close-search').on('click', function() {
            $('body').removeClass('search-active');
        });
    }

    // sticky
    var wind = $(window);
    var sticky = $('#sticky-header');
    wind.on('scroll', function () {
        var scroll = wind.scrollTop();
        if (scroll < 100) {
            sticky.removeClass('sticky');
        } else {
            sticky.addClass('sticky');
        }
    });

  // Venubox
    $('.venobox').venobox({
        numeratio: true,
        infinigall: true

    });
    

    // Loder  //
    $(function () {
        $('body').addClass('loaded');
    });
     // Script nav
    $(".team-share").click(function(){
        $(this).siblings(".team-social-icon").toggleClass('active');
    });

    // counterUp
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

     //======< scrollcue js >======
    $(function(){
          scrollCue.init({
          duration : 2500,
          interval : -0.7,
          percentage : 1,
          smartSpeed: 1000
          
        })
    });


    // Dark Js
  
    $(".toggle-switch").on("click", function(event){
      $("body").toggleClass("dark");
    });

 // Feature box Active js
    $(document).ready(function() {
        $('.single-feature-box').on('mouseenter', function () {
            $(this).addClass('active'); // Add the 'active' class to the current element
            $('.single-feature-box').not(this).removeClass('active'); // Remove the 'active' class from other elements
        });
    });


 //======< sign Up >======
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


    // <!--jave script -->

    $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $('.go-top').addClass('active');
        if (scrolled < 300) $('.go-top').removeClass('active');
    });

    $('.go-top').on('click', function () {
        $("html, body").animate({
            scrollTop: "0"
        }, 1200);
    });


    $(".circle_percent").each(function () {
        var $this = $(this),
            $dataV = $this.data("percent"),
            $dataDeg = $dataV * 3.6,
            $round = $this.find(".round_per");
        $round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
        $this.append('<div class="circle_inbox"><span class="percent_text"></span></div>');
        $this.prop('Counter', 0).animate({
            Counter: $dataV
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $this.find(".percent_text").text(Math.ceil(now) + "%");
            }
        });
        if ($dataV >= 51) {
            $round.css("transform", "rotate(" + 360 + "deg)");
            setTimeout(function () {
                $this.addClass("percent_more");
            }, 1000);
            setTimeout(function () {
                $round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
            }, 1000);
        }
    });


  // scroll up
    if($('.prgoress_indicator path').length){
        var progressPath = document.querySelector('.prgoress_indicator path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).on('scroll', updateProgress);
        var offset = 250;
        var duration = 550;
        jQuery(window).on('scroll', function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery('.prgoress_indicator').addClass('active-progress');
          } else {
            jQuery('.prgoress_indicator').removeClass('active-progress');
          }
        });
        jQuery('.prgoress_indicator').on('click', function (event) {
          event.preventDefault();
          jQuery('html, body').animate({ scrollTop: 0 }, duration);
          return false;
        });
    }


    /* Portfolio Isotope  */
    $('.image_load').imagesLoaded(function () {

        if ($.fn.isotope) {

            var $portfolio = $('.image_load');

            $portfolio.isotope({

                itemSelector: '.grid-item',

                filter: '*',

                resizesContainer: true,

                layoutMode: 'masonry',

                transitionDuration: '0.8s'

            });
            $('.menu-filtering li').on('click', function () {

                $('.menu-filtering li').removeClass('current_menu_item');

                $(this).addClass('current_menu_item');

                var selector = $(this).attr('data-filter');

                $portfolio.isotope({

                    filter: selector,

                });

            });

        };

    });


 // Sidebar
    "use strict";
        jQuery(document).ready(function (o) {
            0 < o(".offset-side-bar").length &&
                o(".offset-side-bar").on("click", function (e) {
                    e.preventDefault(), e.stopPropagation(), o(".cart-group").addClass("isActive");
                }),
                0 < o(".close-side-widget").length &&
                    o(".close-side-widget").on("click", function (e) {
                        e.preventDefault(), o(".cart-group").removeClass("isActive");
                    }),
                0 < o(".navSidebar-button").length &&
                    o(".navSidebar-button").on("click", function (e) {
                        e.preventDefault(), e.stopPropagation(), o(".info-group").addClass("isActive");
                    }),
                0 < o(".close-side-widget").length &&
                    o(".close-side-widget").on("click", function (e) {
                        e.preventDefault(), o(".info-group").removeClass("isActive");
                    }),
                o("body").on("click", function (e) {
                    o(".info-group").removeClass("isActive"), o(".cart-group").removeClass("isActive");
                }),
                o(".xs-sidebar-widget").on("click", function (e) {
                    e.stopPropagation();
                }),
                0 < o(".xs-modal-popup").length &&
                    o(".xs-modal-popup").magnificPopup({
                        type: "inline",
                        fixedContentPos: !2,
                        fixedBgPos: !0,
                        overflowY: "auto",
                        closeBtnInside: !2,
                        callbacks: {
                            beforeOpen: function () {
                                this.st.mainClass = "my-mfp-slide-bottom xs-promo-popup";
                            },
                        },
                    });
            });

    // Contact form AJAX handler (your-php-script.php)
    $(document).ready(function () {
        $('form[action="your-php-script.php"]').on('submit', function (e) {
            e.preventDefault();
            var form = this;
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            var $form = $(form);
            var $status = $form.siblings('#status');
            if (!$status.length) {
                $status = $('#status');
            }
            var $submitBtn = $form.find('button[type="submit"]');
            var originalBtnText = $submitBtn.text();
            $submitBtn.prop('disabled', true).text('Sending...');
            $status.html('');

            var formData = new FormData(form);
            var ts = Math.floor(Date.now() / 1000).toString();
            formData.append('_ts', ts);
            formData.append('_token', btoa(ts + ':sgi_contact_2026'));

            fetch(form.action, {
                method: 'POST',
                body: formData
            })
                .then(function (response) {
                    return response.text();
                })
                .then(function (resultText) {
                    var trimmed = (resultText || '').trim();
                    if (trimmed.indexOf('successfully') !== -1) {
                        $status.html('<p style="color: #28a745; margin-top: 12px; font-weight: 600;">' + trimmed + '</p>');
                        form.reset();
                    } else {
                        $status.html('<p style="color: #dc3545; margin-top: 12px; font-weight: 600;">' + (trimmed || 'Failed to send your message. Please try again later.') + '</p>');
                    }
                })
                .catch(function () {
                    $status.html('<p style="color: #dc3545; margin-top: 12px; font-weight: 600;">Failed to send your message. Please try again later.</p>');
                })
                .finally(function () {
                    $submitBtn.prop('disabled', false).text(originalBtnText);
                });
        });
    });

})(jQuery);