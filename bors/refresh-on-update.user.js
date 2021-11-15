// ==UserScript==
// @name         Refresh bors on update
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://bors-env0.herokuapp.com/*
// @icon         https://bors-env0.herokuapp.com/images/favicon-32x32.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => {
        if(location.href.includes('batches') || location.href.includes('repositories/4')) {
            const isHidden = document.getElementsByClassName('alert js--closable')[0].hidden;
            if(!isHidden) {
                location.reload();
            }
        }
    }, 500);
    // Your code here...
})();