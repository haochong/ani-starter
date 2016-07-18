;(function( win ) {

    'use strict';

    var AniMockData = [
        {
            pattern: /api\/test\/.+/,
            data: {
                err_code: 0,
                data: {
                    test: 'cool'
                }
            }
        },
        {
            pattern: /api\/blazytest/,
            data: {
                err_code: 0,
                data: {
                    list: [
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear1.jpg'
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear2.jpg'
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear3.jpg'
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear4.jpg'
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear5.jpg'
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear6.jpg'
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear7.jpg'
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear3.jpg'
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear4.jpg'
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear5.jpg'
                        }
                    ]
                }
            }
        }
    ];

    Ani.sub("ajax.mock.test", function(evt, data) {

        Ani.pub("ajax", {
            url: '/api/badtest/1',
            type: 'GET',
            callback: function(resp) {
                AniLog('ajax mock test bad resp', resp);
            }

        });

        Ani.pub("ajax", {
            url: '/api/test/1',
            type: 'GET',
            callback: function(resp) {
                AniLog('ajax mock test good resp', resp);
            }

        });
    });

    win.AniMockData = AniMockData;

})( window );




