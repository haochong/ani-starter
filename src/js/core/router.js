;(function( win ) {

    'use strict';

    page('/demo', function(){
        Ani.pub('dom.page.render', {
           tpl: 'home-page-tpl',
            partial: ['footer-tpl'],
            data: {
                name: 'test me',
                list: ['list0item', 'list1item', 'list3item']
            }
        });

    });

    page('/demo/list', function() {
        Ani.pub('dom.page.render', {
            tpl: 'list-page-tpl',
            partial: ['footer-tpl'],
            data: {
                list: [
                    'list item 1',
                    'list item 2',
                    'list item 3'
                ]
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

    window.onpopstate = function(e) {
        page.replace(e.state.path)
    }

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
