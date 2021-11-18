// ==UserScript==
// @name         Trello Quick link
// @namespace    github
// @version      0.3.6
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/mutations.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/trello-quick-link.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/trello-quick-link.user.js
// ==/UserScript==

(function () {
    'use strict';

    const init = () => {
        const trelloLink = document.querySelector('[href*="trello"]');
        const prTitle = document.getElementsByClassName('gh-header-title')[0];
        const isElementAlreadyExists = document.querySelector('#trello-link');
        if (trelloLink && !isElementAlreadyExists) {
            var titleLink = document.createElement('a');
            titleLink.href = trelloLink.href;
            titleLink.id = 'trello-link';
            titleLink.target = '_blank';
            titleLink.text = 'Trello';
            prTitle.appendChild(titleLink);
        }
    }

    init();
    document.addEventListener("ghmo:comments", init);

})();