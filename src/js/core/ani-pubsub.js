;(function( win ) {

    'use strict';

    var Ani = {
        topics: {},
        subUid: -1,
        sub: function(topic, func) {
            if (!Ani.topics[topic]) {
                Ani.topics[topic] = [];
            }
            var token = (++Ani.subUid).toString();
            Ani.topics[topic].push({
                token: token,
                func: func
            });
            return token;
        },
        pub : function(topic, args) {
            if (!Ani.topics[topic]) {
                return false;
            }
            setTimeout(function() {
                var subscribers = Ani.topics[topic],
                    len = subscribers ? subscribers.length : 0;

                while (len--) {
                    subscribers[len].func(topic, args);
                }
            }, 0);
            return true;

        }
    };

    win.Ani = Ani;
    
})( window );




