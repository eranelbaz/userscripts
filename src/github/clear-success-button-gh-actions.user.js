// ==UserScript==
// @name         Add clear successful button on gh actions
// @namespace    github
// @version      0.3.8
// @description  Add clear successful button on gh actions
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/url-detection.js
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/mutations.js
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/init.js
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/helpers.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/clear-success-button-gh-actions.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/clear-success-button-gh-actions.user.js
// ==/UserScript==

(function () {
    'use strict';
    const clear = (className) => {
        let items = document.getElementsByClassName('merge-status-item');
        var removed = false;
        for (let item of items) {
            let icon = item.querySelector(className);
            if (icon) {
                item.remove();
                removed = true;
            }
        }
        return removed;

    }

    const runCode = () => {
        var item = Array.from(document.getElementsByClassName('js-details-target btn-link float-right')).find(el => el.textContent.includes('Hide all checks'));
        var btn = document.createElement('button');

        btn.classList.add('btn-link');
        btn.classList.add('float-right');
        btn.onclick = () => {
            var clearSuccess = false;
            var clearNeutral = false;
            do {
                clearSuccess = clear('.color-fg-success');
                clearNeutral = clear('.neutral-check');
            }
            while (clearSuccess || clearNeutral)
        }
        var text = document.createElement('span');
        text.innerText = 'Clear Success';
        btn.appendChild(text);
        item.parentElement.appendChild(btn);
        const statusDescription = document.querySelector('.mergeability-details > .branch-action-item > div > .status-meta');
        statusDescription.innerText = statusDescription.innerText.length > 75 ? `${statusDescription.innerText.substring(0, 70)}...` : statusDescription.innerText;

    }

    const init = () => {
        if (isPR(location.href)) {
            var item = Array.from(document.getElementsByClassName('js-details-target btn-link float-right')).find(el => el.textContent.includes('Hide all checks'));
            var isBtnExists = Array.from(document.getElementsByClassName('btn-link float-right')).find(el => el.textContent.includes('Clear Success'));
            if (item && !isBtnExists) {
                runCode();
            }
        }
    };
    init();
    bindForElementChange({
        'partial-pull-merging': {
            type: 'id',
            eventName: 'gh:actions'

        }
    })

    bindInit(["ghmo:container","gh:actions"], init)
})();