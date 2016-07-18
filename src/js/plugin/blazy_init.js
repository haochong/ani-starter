;(function( win ) {

    Ani.sub('page.ready', function() {
        var blazyWrap = document.querySelector('.b-lazy-wrap');
        if(Blazy && blazyWrap) {
            var bLazy = new Blazy({
                offset: blazyWrap.getAttribute('blazy-offset') || 0,
                container: '.b-lazy-wrap',
                success: function(ele){
                    Ani.pub('blazy.success', ele);
                }
                , error: function(ele, msg){
                    Ani.pub('blazy.'+msg, ele);
                }
            });
        }
    });


})( window );