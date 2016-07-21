;(function( win ) {

    Ani.sub('page.ready', function() {
        var carouselArray = document.querySelectorAll('.peppermint');

        [].forEach.call(carouselArray, function(carousel) {
            var slideshowInterval = carousel.getAttribute('slideshowInterval') || 5000;
            Peppermint(carousel, {
                slideshowInterval: slideshowInterval,
                dots: true,
                slideshow: true,
                onSetup: function(n) {
                    Ani.pub("carousel initialized ", carousel);
                }
            });
        });
    });



})( window );