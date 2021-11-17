// ==UserScript==
// @name         GH PR whitespcae filter
// @namespace    github
// @version      0.3.4
// @description  try to take over the world!
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/mutations.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/whitespcae-filter.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/whitespcae-filter.user.js
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
    document.addEventListener("ghmo:container", init);
})();