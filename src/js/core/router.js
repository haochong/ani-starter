;(function( win ) {

    'use strict';

    page('/testpage', function(){
        Ani.pub('dom.page.render', {
           tpl: 'test-page-tpl',
            data: {
                name: 'test me'
            }
        });

    });

    Ani.sub('page.redirect', function(event, el) {
        var gotoPage = el.getAttribute('page');
        if(gotoPage) {
            page.redirect(gotoPage);
        }

    });

})( window );