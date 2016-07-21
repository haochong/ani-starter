;(function( win ) {

    'use strict';

    Ani.sub('ui.signal', function(event, el) {

        var msg = el.getAttribute('msg');
        var duration = el.getAttribute('duration') || 3000;
        var customClass = el.getAttribute('customclass');

        smoke.signal(msg, function(e){
            console.log('signal callback = ~~ ', e);
        }, {
            duration: duration,
            classname: customClass
        });
    });

})( window );
