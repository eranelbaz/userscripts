// ==UserScript==
// @name         Fetch all in github prs
// @namespace    github
// @version      0.3.6
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/mutations.js
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/init.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/load-all.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/load-all.user.js
// ==/UserScript==

(function () {
    'use strict';

    const runLogic = (interval) => {
        var items = document.getElementsByClassName('ajax-pagination-btn');
        for (let item of items) {
            item.click();
        }
        if (items.length === 0) {
            clearInterval(interval);
        }

    }

    let logicInterval;
    const init = () => {
        setInterval(() => runLogic(logicInterval), 2000);
    }

    bindInit(["ghmo:container","ghmo:comments"], init)
})();