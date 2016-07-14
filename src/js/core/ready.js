;(function( win ) {

    'use strict';

    var ready = function(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    var loadingEnd = function() {
        var pageLoadingEl = document.getElementById("page-loading");
        if(pageLoadingEl) {
            pageLoadingEl.parentNode.removeChild(pageLoadingEl);
        }
    };

    ready(function() {
        Ani.pub("document.ready");
        loadingEnd();
    });

})( window );