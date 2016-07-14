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
                    triggerEvt(_el);
                }
            });

        } else {
            triggerEvt(el);
        }
    }

    if (('addEventListener' in document) && ('querySelectorAll' in document) && (('ontouchstart' in window) || ('onmsgesturechange' in window))) {

        var getPointerEvent = function(event) {
            return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
        };
        var $touchArea = document,
            touchStarted = false, // detect if a touch event is sarted
            currX = 0,
            currY = 0,
            cachedX = 0,
            cachedY = 0;

        //setting the events listeners
        $touchArea.on('touchstart mousedown',function (e){
            e.preventDefault(); 
            var pointer = getPointerEvent(e);
            // caching the current x
            cachedX = currX = pointer.pageX;
            // caching the current y
            cachedY = currY = pointer.pageY;
            // a touch event is detected      
            touchStarted = true;
            $touchArea.text('Touchstarted');
            // detecting if after 200ms the finger is still in the same position
            setTimeout(function (){
                if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
                    // Here you get the Tap event
                    evtHandler(e);
                }
            },200);
        });
        $touchArea.on('touchend mouseup touchcancel',function (e){
            e.preventDefault();
            // here we can consider finished the touch event
            touchStarted = false;
            // touchended
        });
        $touchArea.on('touchmove mousemove',function (e){
            e.preventDefault();
            var pointer = getPointerEvent(e);
            currX = pointer.pageX;
            currY = pointer.pageY;
            if(touchStarted) {
                 // here you are swiping
            }
           
        });


    } else {
        document.addEventListener(listenEvt, function(e) {
            evtHandler(e);
        }, false);
    }

    

})( window );




