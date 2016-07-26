;(function (win) {

    'use strict';

    Ani.cache = {};

    var getClosest = function (elem, selector) {

        var firstChar = selector.charAt(0);
        var supports = 'classList' in document.documentElement;
        var attribute, value;

        if (firstChar === '[') {
            selector = selector.substr(1, selector.length - 2);
            attribute = selector.split('=');

            if (attribute.length > 1) {
                value = true;
                attribute[1] = attribute[1].replace(/"/g, '').replace(/'/g, '');
            }
        }

        for (; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode) {

            if (firstChar === '.') {
                if (supports) {
                    if (elem.classList.contains(selector.substr(1))) {
                        return elem;
                    }
                } else {
                    if (new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test(elem.className)) {
                        return elem;
                    }
                }
            }

            if (firstChar === '#') {
                if (elem.id === selector.substr(1)) {
                    return elem;
                }
            }

            if (firstChar === '[') {
                if (elem.hasAttribute(attribute[0])) {
                    if (value) {
                        if (elem.getAttribute(attribute[0]) === attribute[1]) {
                            return elem;
                        }
                    } else {
                        return elem;
                    }
                }
            }

            if (elem.tagName.toLowerCase() === selector) {
                return elem;
            }

        }

        return null;

    };

    Ani.sub('dom.closest', function (evt, data) {
        var el = data && data.el;
        var selector = data && data.selector;
        var callback = data && data.callback;
        if (callback) {
            callback(getClosest(el, selector));
        }
    });

    Ani.sub('dom.page.render', function(evt, data) {
        var el = data && data.el;
        var tpl = data && data.tpl;
        var transitionClass = data && data.transitionClass;
        var partialArray = data && data.partial;
        var partialData = {};
        var tplHtml;
        var data = data && data.data;
        var transitionEl = null;
        var transitionTime = 150;
        var renderPage = function() {
            var renderHtml = Ani.cache[tpl];
            el.setAttribute('lastScrollTop', document.body.scrollTop);
            el.innerHTML = Mustache.render(renderHtml.replace(/{{&gt;/g, "{{>"), data, partialData);
        }
        var pageReady = function() {
            var currentScrollTop = document.body.getAttribute('currentScrollTop');
            if(currentScrollTop) {
                document.body.scrollTop = currentScrollTop;
            }
            Ani.pub('page.ready', data);
            el.setAttribute('rendering', 'false');
        }

        var getCacheTpl = function(tpl) {
            var bodyTpl = document.getElementById(tpl);
            if(!Ani.cache[tpl]) {
                if(bodyTpl) {
                    Ani.cache[tpl] = bodyTpl.innerHTML;
                    bodyTpl.parentNode.removeChild(bodyTpl);
                }
            }
            return Ani.cache[tpl];
        };

        if(!el) {
            el = document.getElementById("page-wrap");
        }

        tplHtml = getCacheTpl(tpl);

        if((el.getAttribute('rendering') !== 'true') && tplHtml && data) {
            el.setAttribute('rendering', 'true');
            if(!transitionClass) {
                transitionClass = '.need-page-transition';
            }

            if(partialArray && partialArray.length) {
                partialArray.forEach(function(partialId, index, partials) {
                    partialData[partialId] = getCacheTpl(partialId);
                });
            }

            renderPage();
            transitionEl = el.querySelector(transitionClass);
            if(transitionEl) {
                transitionEl.classList.add('transition');
                setTimeout(function(){
                    transitionEl.classList.remove('transition');
                    setTimeout(function() {
                        pageReady();
                    }, transitionTime);
                }, transitionTime);
            }  else {
                pageReady();
            }

        } else {
            Ani.pub('duplicate page rendering or empty bodyTpl/data');
        }


    });

})(window);
