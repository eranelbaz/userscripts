// ==UserScript==
// @name         Bors Running + Failed Bold
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @include      https://bors-env0.herokuapp.com/*
// @icon         https://bors-env0.herokuapp.com/images/favicon-32x32.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const init = () => {
        if (location.href.includes('batches')) {
            Array.from(document.querySelectorAll('span')).forEach(el => {
                if (el.textContent.includes('Running') || el.textContent.includes('Failed')) {
                    const wrapper = document.createElement('b');
                    el.parentNode.insertBefore(wrapper, el);
                    wrapper.appendChild(el);
                }
            });


            Array.from(document.querySelectorAll('a')).forEach(el => {
                if (el.textContent.includes('Failed') || el.textContent.includes('Running')) {
                    const wrapper = document.createElement('b');
                    el.parentNode.insertBefore(wrapper, el);
                    wrapper.appendChild(el);
                }
            });
        }
    };
    bindOnLoad(init);
})();