// ==UserScript==
// @name         GH PR whitespcae filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.png
// @grant        none
// @require     https://raw.githubusercontent.com/eranelbaz/userscripts/main/helpers.js
// @updateURL   https://raw.githubusercontent.com/eranelbaz/userscripts/main/github/whitespcae-filter.user.js
// @downloadURL https://raw.githubusercontent.com/eranelbaz/userscripts/main/github/whitespcae-filter.user.js
// ==/UserScript==

(function() {
    'use strict';
    const init = () => {
        if(location.href.includes('pull')) {
            let element = Array.from(document.querySelectorAll('.tabnav > nav > a')).find(el => el.textContent.includes('Files changed'))
            if(!element.href.includes('?w=1')) {
                element.href = element.href + '?w=1';
            }
        }
    }
    bindOnLoad(init);

})();