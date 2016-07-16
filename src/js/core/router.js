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

    page('/demo/list', function() {
        Ani.pub('dom.page.render', {
            tpl: 'home-page-tpl',
            partial: ['footer-tpl'],
            data: {
                name: 'this is list page'
            }
        });
    });

    page('/demo/profile', function() {
        Ani.pub('dom.page.render', {
            tpl: 'home-page-tpl',
            partial: ['footer-tpl'],
            data: {
                name: 'this is profile page'
            }
        });
    });

    page('/demo');

    Ani.sub('page.show', function(event, el) {
        var gotoPage = el.getAttribute('page');
        if(gotoPage) {
            page.show(gotoPage);
        }
    });

    Ani.sub('page.redirect', function(event, el) {
        var gotoPage = el.getAttribute('page');
        if(gotoPage) {
            page.redirect(gotoPage);
        }

    });

})( window );