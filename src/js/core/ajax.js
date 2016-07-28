;(function( win ) {

    'use strict';

    var sendRequest = function(conf) {
        var url = conf && conf.url;
        var type = conf && conf.type;
        var callback = conf && conf.callback;

        var request = new XMLHttpRequest();
        request.open(type, url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var resp = JSON.parse(request.responseText);
                callback && callback(resp);
                Ani.pub('ajax.success');
            } else {
                callback && callback({
                    err_code: 1001,
                    data: {}
                });
                Ani.pub('ajax.error');
                // We reached our target server, but it returned an error
            }
        };

        request.onerror = function() {
            callback && callback({
                err_code: 1002,
                data: {}
            });
            // There was a connection error of some sort
        };

        request.responseType = 'json';
        request.send();
    };

    var checkMockData = function(conf) {
        var matched = false;

        AniMockData.forEach(function(mock, index, mockArray) {
            if(mock.pattern) {
                if(mock.pattern.test(conf.url)) {
                    if(conf.callback && mock.data) {
                        conf.callback(mock.data);
                        matched = true;
                    }
                }
            }
        });

        if(!matched) {
            sendRequest(conf);
        }
    };

    Ani.sub('ajax', function(evt, conf) {
        if(AniMockData) {
            checkMockData(conf);
        } else {
            sendRequest(conf);
        }
    });

})( window );




