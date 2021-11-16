// ==UserScript==
// @name         Add clear successful button on gh actions
// @namespace    github
// @version      0.2
// @description  Add clear successful button on gh actions
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.png
// @grant        none
// @require     https://raw.githubusercontent.com/eranelbaz/userscripts/main/helpers.js
// @updateURL   https://raw.githubusercontent.com/eranelbaz/userscripts/main/github/clear-success-button-gh-actions.user.js
// @downloadURL https://raw.githubusercontent.com/eranelbaz/userscripts/main/github/clear-success-button-gh-actions.user.js
// ==/UserScript==

(function() {
    'use strict';
    const clear = (className) => {
        let items = document.getElementsByClassName('merge-status-item');
        var removed = false;
        for (let item of items) {
            let icon = item.querySelector(className);
            if(icon) {
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
                clearSuccess = clear('.color-text-success');
                clearNeutral = clear('.neutral-check');
            }
            while(clearSuccess || clearNeutral)
        }
        var text = document.createElement('span');
        text.innerText = 'Clear Success';
        btn.appendChild(text);
        item.parentElement.appendChild(btn);
        const statusDescription = document.querySelector('.mergeability-details > .branch-action-item > div > .status-meta');
        statusDescription.innerText = statusDescription.innerText.length > 75 ? `${statusDescription.innerText.substring(0,70)}...` : statusDescription.innerText;

    }

    const init = () => {
        if(location.href.includes('pull')) {
            var item = Array.from(document.getElementsByClassName('js-details-target btn-link float-right')).find(el => el.textContent.includes('Hide all checks'));
            var isBtnExists = Array.from(document.getElementsByClassName('btn-link float-right')).find(el => el.textContent.includes('Clear Success'));
            if(item && !isBtnExists) {
                runCode();
            }
        }
    };

    bindOnLoad(init);
    bindOnElement('body', init)
    bindOnElement('partial-pull-merging', init);
})();