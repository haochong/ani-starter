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
        Ani.sub('page.ready', function(data) {
            console.log(data);
            //Ani.pub('test.duplicate.page.rendering');
        });

    });

    page('/demo/test', function() {

        Ani.pub('dom.page.render', {
            tpl: 'test-page-tpl',
            partial: ['footer-tpl', 'header-tpl'],
            data: {
                testcases: [
                    {
                        msg: 'duplicate.page.rendering success',
                        status: 'success'
                    }
                ]
            }
        });

        Ani.pub('dom.page.render', {
            tpl: 'test-page-tpl',
            partial: ['footer-tpl', 'header-tpl'],
            data: {
                testcases: [
                    {
                        msg: 'duplicate.page.rendering fail',
                        status: 'fail'
                    }
                ]
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

    page(location.pathname);


})( window );
