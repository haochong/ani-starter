;(function( win ) {

    'use strict';

    var listenEvt = 'click';

    var triggerEvt = function(el) {
        var evt = el.getAttribute('evt');
        if(evt) {
            Ani.pub(evt, el);
        }
    };

    var evtHandler = function(e) {
        var el = e.target;
        var evt = '';

        AniLog('evt start', e);

        if (!el.classList.contains('evt')) {
            Ani.pub('dom.closest', {
                el: el,
                selector: '.evt',
                callback: function(_el) {
                    if(_el) {
                        triggerEvt(_el);
                    }
                }
            });

        } else {
            triggerEvt(el);
        }
    }

    if (('addEventListener' in document) && ('querySelectorAll' in document) && (('ontouchstart' in window) || ('onmsgesturechange' in window))) {

        var getPointerEvent = function(event) {
            return event.targetTouches ? event.targetTouches[0] : event;
        };
        var touchStarted = false, // detect if a touch event is sarted
            currX = 0,
            currY = 0,
            cachedX = 0,
            cachedY = 0;

        //setting the events listeners
        ("touchstart mousedown".split(" ")).forEach(function(e){
            window.addEventListener(e,function(e) {
                var pointer = getPointerEvent(e);
                // caching the current x
                cachedX = currX = pointer.pageX;
                // caching the current y
                cachedY = currY = pointer.pageY;
                // a touch event is detected      
                touchStarted = true;
                // detecting if after 200ms the finger is still in the same position
                setTimeout(function (){
                    if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
                        // Here you get the Tap event
                        evtHandler(e);
                    }
                },200);
            },false);
        });

        ("touchend mouseup touchcancel".split(" ")).forEach(function(e){
            window.addEventListener(e,function(e) {
                // here we can consider finished the touch event
                touchStarted = false;
                e.preventDefault();
                // touchended
            },false);
        });

        ("touchmove mousemove".split(" ")).forEach(function(e){
            window.addEventListener(e,function(e) {
                var pointer = getPointerEvent(e);
                currX = pointer.pageX;
                currY = pointer.pageY;
                if(touchStarted) {
                    // here you are swiping
                }
            },false);
        });

    } else {
        document.addEventListener(listenEvt, function(e) {
            evtHandler(e);
        }, false);
    }

    

})( window );




