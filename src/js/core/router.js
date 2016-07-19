;(function( win ) {

    'use strict';

    window.onpopstate = function(e) {
        page.replace(e.state.path)
    }

    Ani.sub('page.show', function(event, el) {
        var lastScrollTop = document.body.scrollTop;
        var gotoPage = el.getAttribute('page');
        if(gotoPage) {
            document.body.setAttribute('lastScrollTop', lastScrollTop);
            Ani.pub('save lastscrollTop ', lastScrollTop);
            document.body.setAttribute('currentScrollTop', 0);
            document.body.scrollTop = 0;
            page.show(gotoPage);
        }
    });

    Ani.sub('page.back', function(event, el) {
        var lastScrollTop = document.body.getAttribute('lastScrollTop');
        Ani.pub('load lastscrollTop ', lastScrollTop);
        if(lastScrollTop) {
            document.body.setAttribute('currentScrollTop', lastScrollTop);
        }
        page.back();
    });

    Ani.sub('page.redirect', function(event, el) {
        var gotoPage = el.getAttribute('page');
        if(gotoPage) {
            page.redirect(gotoPage);
        }

    });

})( window );
