;(function( win ) {

    'use strict';

    Ani.sub("test.duplicate.page.rendering", function() {
        var el = document.querySelector('.test-duplicate-page-rendering');
        Ani.pub('dom.page.render', {
            tpl: 'test-duplicate-page-render-tpl',
            partial: ['footer-tpl', 'header-tpl'],
            data: {
                msg: 'test success'
            }
        });
        Ani.pub('dom.page.render', {
            tpl: 'test-duplicate-page-render-tpl',
            partial: ['footer-tpl', 'header-tpl'],
            data: {
                msg: 'test fail'
            }
        });
        Ani.pub('dom.page.render', {
            el: el,
            tpl: 'test-duplicate-page-render-tpl',
            partial: ['footer-tpl', 'header-tpl'],
            data: {
                msg: 'test fail'
            }
        });
        Ani.pub('dom.page.render', {
            el: el,
            tpl: 'test-duplicate-page-render-tpl',
            partial: ['footer-tpl', 'header-tpl'],
            data: {
                msg: 'test fail'
            }
        });
    });


})( window );
