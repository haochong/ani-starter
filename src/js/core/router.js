;(function( win ) {

    'use strict';

    page('/demo', function(){
        Ani.pub('dom.page.render', {
           tpl: 'home-page-tpl',
            partial: ['footer-tpl', 'header-tpl'],
            data: {
                name: 'test me',
                list: ['list0item', 'list1item', 'list3item']
            }
        });

    });

    page('/demo/list', function() {

        Ani.pub("ajax", {
            url: '/api/blazytest',
            type: 'GET',
            callback: function(resp) {
                Ani.pub('dom.page.render', {
                    tpl: 'list-page-tpl',
                    partial: ['footer-tpl', 'header-tpl'],
                    data: resp.data
                });
            }
        });


    });

    page('/demo/show/:id', function(ctx) {

        Ani.pub("demo show id = ", ctx.params.id);

        Ani.pub('dom.page.render', {
            tpl: 'show-page-tpl',
            partial: ['footer-tpl', 'header-tpl'],
            data: {
                hasBack: true,
                id: ctx.params.id
            }
        });

    });

    page('/demo/profile', function() {
        Ani.pub('dom.page.render', {
            tpl: 'home-page-tpl',
            partial: ['footer-tpl', 'header-tpl'],
            data: {
                name: 'this is profile page'
            }
        });
    });

    page('/demo/list');

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
