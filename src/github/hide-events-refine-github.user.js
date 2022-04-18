// ==UserScript==
// @name         Hide events in github (refine github)
// @namespace    github
// @version      0.3.7
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/mutations.js
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/init.js
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/url-detection.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/hide-events-refine-github.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/hide-events-refine-github.user.js
// ==/UserScript==
(function() {
    'use strict';

    const init  = () => {
        if(isPR()) {
            var label = document.querySelector('[data-value="hideEvents"]');
            if(label) {
                label.click();
            }
        }
    }
    bindInit(["ghmo:container","ghmo:comments"], init)
})();