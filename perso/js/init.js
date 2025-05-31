$(window).on("load", function() {
    $('body').addClass('loaded');
});

//Mobile height
window.addEventListener('load', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

$(document).ready(function() {
    //SVG
    svg4everybody();

    /* $('.btn_confirm').click(function() {
        $('.main--6').fadeOut(100);
        $('.main--7').fadeIn(1000);
        $('#form').attr('src', '//trackingtraffic.online/?_lp=1&'+window.location.search.substring(1));
        }) */

    //Screen trigger
    $('.screen-trigger--1').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 100);
        $('.main--1').fadeOut(100);

        $('.page').addClass('page--inner');

        setTimeout(
            function() {
                $('.main--2').fadeIn(1000);
            }, 100
        );

        setTimeout(
            function() {
                $('html, body').animate({ scrollTop: 0 }, 100);
                $('.main--2 .spinner').fadeOut(180);
                $('.main--2').addClass('checked');
            }, 3000
        );

        setTimeout(
            function() {
                $('html, body').animate({ scrollTop: 0 }, 100);
                $('.main--2').fadeOut(100);
                $('.main--3').fadeIn(1000);
            }, 4000
        );
    });

    $('.screen-trigger--2').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 100);
        $('.main--3').fadeOut(200);

        setTimeout(
            function() {
                $('.main--4').fadeIn(1000);
            }, 200
        );
    });


    //Questions 
    $('.question--1 label:not([data-error]), .question--2 label').click(function() {
        var currentQ = $(this).parents('.question'),
            nextQ = $(this).parents('.question').next();

        setTimeout(function() {
            currentQ.fadeOut(300);
        }, 500);

        setTimeout(function() {
            nextQ.fadeIn(500);
        }, 800);
    });

    $('[data-error]').click(function() {
        var message = $(this).data('error');

        $(this).append('<span class="question__error">' + message + '</span');
    });

    $('.question--3 label').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 100);

        setTimeout(function() {
            $('.main--4').fadeOut(200);
        }, 300);

        setTimeout(function() {
            $('.main--5').fadeIn(1000);
        }, 500);

        setTimeout(
            function() {
                $('html, body').animate({ scrollTop: 0 }, 100);
                $('.main--5 .spinner').fadeOut(180);
                $('.main--5').addClass('checked');
            }, 3300
        );

        setTimeout(
            function() {
                $('html, body').animate({ scrollTop: 0 }, 100);
                $('.main--5').fadeOut(100);
                $('.main--6').fadeIn(1000).css('display', 'flex');
            }, 4300
        );
    });
});
