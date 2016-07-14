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




