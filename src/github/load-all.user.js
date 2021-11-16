// ==UserScript==
// @name         Fetch all in github prs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.png
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/fix-trello-in-github/helpers.js
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/fix-trello-in-github/src/mutation.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/fix-trello-in-github/github/load-all.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/fix-trello-in-github/github/load-all.user.js
// ==/UserScript==

(function () {
    'use strict';

    const trelloQuickLink = () => {
        const trelloLink = Array.from(document.getElementsByTagName('a')).find(el => el.href.includes('trello'));
        const prTitle = document.getElementsByClassName('gh-header-title')[0];
        if (trelloLink) {
            var titleLink = document.createElement('a');
            titleLink.href = trelloLink.href;
            prTitle.appendChild(titleLink);
            titleLink.text = 'Trello';
        }
    }

    const runLogic = (interval) => {
        var items = document.getElementsByClassName('ajax-pagination-btn');
        for (let item of items) {
            item.click();
        }
        if (items.length === 0) {
            clearInterval(interval);
            trelloQuickLink();
        }

    }

    let logicInterval;
    const init = () => {
        if (location.href.includes('pull')) {
            if (!logicInterval) {
                logicInterval = setInterval(() => runLogic(logicInterval), 2000);
            }
        } else {
            clearInterval(logicInterval);
        }
    }


    init();
    $(document).on('ghmo:comments', init);

})();