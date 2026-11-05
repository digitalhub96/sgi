(function ($) {
    'use strict';


    // category List
    $('.hero-slider').owlCarousel({
        loop: true,
        autoplay: true,
        smartSpeed:1500,
        autoplayTimeout: 10000,
        dots: false,
        nav: true,
        navText: ["<i class='bi bi-chevron-left''></i>", "<i class='bi bi-chevron-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1000: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    }) 

    // Home 6
    $('.hero-slider-3').owlCarousel({
        loop: true,
        autoplay: true,
        smartSpeed:1500,
        autoplayTimeout: 10000,
        dots:true,
        nav: false,
        navText: ["<i class='bi bi-chevron-left''></i>", "<i class='bi bi-chevron-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1000: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    })   

     // Hero List 2 Home Three
    $('.hero-slider-2').owlCarousel({
        loop: true,
        autoplay: true,
        smartSpeed:1500,
        autoplayTimeout: 10000,
        dots: true,
        nav: true,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1000: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    })

    // Room Active
    $('.room_list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 9000,
        dots:true,
        nav: false,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1000: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })

    // About Active
    $('.about_list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: true,
        nav: false,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1000: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    })

    // Offers list
    $('.offers-list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: false,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            600:{
                items:1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1000: {
                items: 3
            },
            1920: {
                items: 4
            }
        }
    })  



    // Offers list-2 Home-three
    $('.offers-list-2').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: false,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            600:{
                items:1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1000: {
                items: 2
            },            
            1300: {
                items: 3
            },
            1920: {
                items: 4
            }
        }
    })

    // testimonial Active
    $('.testi-list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: false,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1000: {
                items: 2
            },
            1920: {
                items: 2
            }
        }
    })   

    // testimonial-2 Active
    $('.testi-list-2').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: true,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1000: {
                items:2
            },
            1920: {
                items: 3
            }
        }
    })  

    // testimonial-3 Active
    $('.testi-list-3').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: true,
        nav: false,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1000: {
                items:1
            },
            1920: {
                items: 1
            }
        }
    })     
    // testimonial-5 Home-5
    $('.testi-list-5').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: true,
        nav: false,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1000: {
                items:3
            },
            1920: {
                items: 3
            }
        }
    })     

    // testimonial-6 Home-6
    $('.testi-list-6').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: true,
        nav: false,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1000: {
                items:1
            },
            1920: {
                items: 1
            }
        }
    }) 
    // testimonial-inner
    $('.testi-list-inner').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots:false,
        nav: true,
        smartSpeed: 5000,
        navText: ["<i class='bi bi-chevron-left''></i>", "<i class='bi bi-chevron-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1000: {
                items:3
            },
            1920: {
                items: 3
            }
        }
    }) 

    // brand list
    $('.brand-list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 500,
        dots: false,
        nav: false,
        smartSpeed:500,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:2
            },
            600: {
                items:2
            },
            768: {
                items: 3
            },
            992: {
                items: 3
            },
            1000: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })   

     // Place List
    $('.place-list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: false,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1000: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })

     // Room List-2
    $('.room-list-2').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: false,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1000: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })    

     // Room List-3
    $('.room-list-3').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: true,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1000: {
                items: 2
            },
            1920: {
                items: 2
            }
        }
    })  

     // Room Details
    $('.room-details-list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: true,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1000: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    })    

     // Gallery List Home 5
    $('.gallery-list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav:false,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            },
            1920: {
                items: 5
            }
        }
    })    
     // facilities list inner pages
    $('.facilities-list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav:true,
        smartSpeed:10000,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items:1
            },
            600: {
                items:2
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            },
            1920: {
                items: 2
            }
        }
    })



})(jQuery);