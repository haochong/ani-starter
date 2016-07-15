;(function( win ) {

    'use strict';

    page('/demo', function(){
        Ani.pub('dom.page.render', {
           tpl: 'home-page-tpl',
            partial: ['footer-tpl'],
            data: {
                name: 'test me'
            }
        });

    });

    page('/demo');

    Ani.sub('page.redirect', function(event, el) {
        var gotoPage = el.getAttribute('page');
        if(gotoPage) {
            page.redirect(gotoPage);
        }

    });

})( window );