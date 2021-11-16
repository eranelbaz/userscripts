// ==UserScript==
// @name         Trello Quick link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.png
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/fix-trello-in-github/src/mutations.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/fix-trello-in-github/github/trello-quick-link.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/fix-trello-in-github/github/trello-quick-link.user.js
// ==/UserScript==

(function () {
    'use strict';

    const init = () => {
        const trelloLink = Array.from(document.getElementsByTagName('a')).find(el => el.href.includes('trello'));
        const prTitle = document.getElementsByClassName('gh-header-title')[0];
        if (trelloLink) {
            var titleLink = document.createElement('a');
            titleLink.href = trelloLink.href;
            prTitle.appendChild(titleLink);
            titleLink.text = 'Trello';
        }
    }

    init();
    document.addEventListener("ghmo:comments", init);

})();