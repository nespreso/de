$(document).ready(function() {
    $('#header__menu-icon').click(function() {
        $(this).toggleClass('open');
    });
    // get url params
    const queryString = window.location.search; // grab the query string
    const urlParams = new URLSearchParams(queryString); // parse url params

    // date-delivery 
    let d = new Date();
    d.setDate(d.getDate() + 2);

    let deliverDate = ('0' + (d.getDate())).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
    $(".date-delivery").append(deliverDate);
    console.log(deliverDate);
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').then(function(registration) {
            // Registration was successful
            console.log('Service Worker registration successful with scope: ', registration.scope);

            // console.log('Service Worker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}