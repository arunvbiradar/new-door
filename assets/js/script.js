// carousel
var $ = jQuery;
let arrow = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4043 9L1.4043 9M1.4043 9L9.4043 17M1.4043 9L9.4043 0.999999" stroke="black"/></svg>`;
$('.hero-carousel, .why-choose-carousel').owlCarousel({
    items: 1,
    margin: 0,
    nav: true,
    loop: true,
    dots: false,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    navText: [`${arrow} Prev`, `Next ${arrow}`],
    responsive: {
        0: {
            items: 1
        }
    }
})
$('.image-carousel, .video-carousel').owlCarousel({
    items: 1,
    margin: 0,
    nav: true,
    loop: true,
    dots: false,
    lazyLoad: true,
    autoplay: false,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    touchDrag: false,
    mouseDrag: false,
    autoplayHoverPause: true,
    navText: [`${arrow} Prev`, `Next ${arrow}`],
    responsive: {
        0: {
            items: 1
        }
    },
    onTranslate: function () {
        $('.owl-item').find('video').each(function () {
            this.pause();
        });
    }
})
$('.testimonial-carousel').owlCarousel({
    items: 1,
    margin: 0,
    nav: false,
    loop: true,
    dots: false,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    navText: [`${arrow} Prev`, `Next ${arrow}`],
    responsive: {
        0: {
            items: 1
        }
    }
})

// tabs
$(document).ready(function () {
    $('.tabs li:first-child').addClass('active');
    $('.tabs li').nextAll('.tab-content').find('.wp-block-query:first-child, .tab-item:first-child').addClass('active');
    $('.projects .tab-content').each(function (i, item) {
        $(item).find('.wp-block-query').map((i, tabItem) => {
            if (!$(tabItem).hasClass('all')) {
                let itemClass = $(tabItem).attr('class').split(' ');
                itemClass = itemClass[itemClass.length - 1].replaceAll('-', ' ');
                $(tabItem).find('li').addClass('item').prepend(`<span class="category">${itemClass}</span>`);
                $(tabItem).find('.wp-block-post-title').before(`<h5>${itemClass}</h5>`);
            }
        });
    })
    $('.tabs').each(function (i, item) {
        if ($(item).find('li').hasClass('active')) {
            let activeItem = $(item).find('li.active a').text().toLowerCase();
            $('.tab-content .' + activeItem).addClass('active');
            $('.tab-content #' + activeItem).addClass('active');
            if (activeItem === 'all') {
                let content = '';
                $(item).nextAll('.tab-content').find('ul').each(function (i, itemContent) {
                    content += $(itemContent).html();
                });
                let contentHtml = `<div class="wp-block-query all active"><ul class="wp-block-post-template carousel">${content}</ul></div>`;
                $('.tabs.wp-block-categories').nextAll('.tab-content').find('.wp-block-group__inner-container').prepend(contentHtml);
            }
        }
    })
    $('.tabs a').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.tabs').find('.active').removeClass('active');
        $(this).parents('.tabs').nextAll('.tab-content').find('.active').removeClass('active');
        $(this).parent().addClass('active');
        let activeItem = $(this).text().toLowerCase().replace(/\s/g, '-');
        console.log(activeItem);
        $('.tab-content .' + activeItem).addClass('active');
        $('.tab-content #' + activeItem).addClass('active');
    });
    $('.projects .tab-content .wp-block-post-template').owlCarousel({
        margin: 32,
        nav: true,
        loop: false,
        dots: false,
        touchDrag: true,
        mouseDrag: true,
        autoplay: false,
        navText: [`${arrow} Prev`, `Next ${arrow}`],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2,
                margin: 16
            },
            1440: {
                items: 3,
                margin: 32
            }
        }
    })
})

// send enquiry popup
$('#primary-menu-list .menu-item:last-of-type, .openSendEnquiryForm').on('click', function (e) {
    e.preventDefault();
    $('.enquiry-popup').addClass('open');
    $('body').addClass('sendEnquiryFormOpened');

});
$('.close-popup').on('click', function (e) {
    $('.enquiry-popup').removeClass('open');
    $('body').removeClass('sendEnquiryFormOpened');
});