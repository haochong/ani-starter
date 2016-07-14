;(function( win ) {

    'use strict';

    page('/testpage', function(){
        document.body.innerHTML = 'this is test page';
    });

    Ani.sub('page.redirect', function(event, el) {
        var gotoPage = el.getAttribute('page');
        if(gotoPage) {
            page.redirect(gotoPage);
        }

    });

})( window );