;(function( win ) {

    'use strict';

    var AniLoader = {
        loaderCache: {},
        loadJsArray: function(loadScripts, callback) {
            var scripts = loadScripts;
            var loadNextScript = function() {
                if(scripts.length) {
                    Ani.loadJs(scripts.shift(), function() {
                        loadNextScript();
                    });
                } else {
                    callback && callback();
                }
            };
            loadNextScript();
        },
        loadJs: function(src, callback) {
            if(!Ani.loaderCache[src]) {
                Ani.loaderCache[src] = 1;
                var script = document.createElement('script'),
                    loaded;
                script.setAttribute('src', src);
                script.onreadystatechange = script.onload = function() {
                    if (!loaded) {
                        callback && callback();
                    }
                    loaded = true;
                };
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    };

    Ani.sub('script.require', function(evt, conf) {
        var callback = conf && conf.callback;
        var scripts = conf && conf.scripts;
        if(scripts) {
            AniLoader.loadJsArray(scripts, callback);
        }
    });


})( window );




