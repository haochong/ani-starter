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
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear1.jpg',
                            id: 1
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear2.jpg',
                            id: 2
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear3.jpg',
                            id: 3
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear4.jpg',
                            id: 4
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear5.jpg',
                            id: 5
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear6.jpg',
                            id: 6
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear7.jpg',
                            id: 7
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear3.jpg',
                            id: 8
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear4.jpg',
                            id: 9
                        },
                        {
                            img: 'http://dinbror.dk/blazy/assets/bears/big-bear5.jpg',
                            id: 10
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




