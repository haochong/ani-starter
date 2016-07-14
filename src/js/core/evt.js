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
        listenEvt = 'touchstart';
    }

    document.addEventListener(listenEvt, function(e) {
        evtHandler(e);
    }, false);

})( window );




