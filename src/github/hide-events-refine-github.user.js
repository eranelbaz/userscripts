// ==UserScript==
// @name         Hide events in github (refine github)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.png
// @grant        none
// @require     https://raw.githubusercontent.com/eranelbaz/userscripts/main/helpers.js
// @updateURL   https://raw.githubusercontent.com/eranelbaz/userscripts/main/github/hide-events-refine-github.user.js
// @downloadURL https://raw.githubusercontent.com/eranelbaz/userscripts/main/github/hide-events-refine-github.user.js
// ==/UserScript==
(function() {
    'use strict';

    const init  = () => {
        if(location.href.includes('pull')) {
            var label = Array.from(document.getElementsByClassName('select-menu-item-text'))
            .find(el => el.textContent === 'Hide events');
            if(label) {
                label.click();
            }
        }
    }

    bindOnLoad(init);
    bindOnElement('TimelineItem-badge', init);
})();