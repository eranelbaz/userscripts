// ==UserScript==
// @name         Set Github hotkeys
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// @require     https://raw.githubusercontent.com/eranelbaz/userscripts/main/helpers.js
// @updateURL   https://raw.githubusercontent.com/eranelbaz/userscripts/main/github/github-hotkeys.user.js
// @downloadURL https://raw.githubusercontent.com/eranelbaz/userscripts/main/github/github-hotkeys.user.js
// ==/UserScript==
(function () {
    'use strict';

    const bindPrTabs = () => {
        if (location.href.includes('pull')) {
            Array.from(document.querySelectorAll('.tabnav-tabs > a')).forEach((tab, index) => {
                tab.dataset.hotkey = `g ${index + 1}`
            });
        }
    }

    const bindPullRequests = () => {
        if (location.href.includes('pulls')) {
            Array.from(document.querySelectorAll('[data-hovercard-type="pull_request"]')).forEach((tab, index) => {
                tab.dataset.hotkey = `g ${index}`
            });
        }
    }

    const bindCopyBranchName = () => {
        document.onkeydown = function (e) {
            e = e || window.event;
            var charCode = e.which || e.keyCode;
            if (charCode === 66) {
                if (document.activeElement.nodeName !== 'TEXTAREA' && document.activeElement.nodeName !== 'INPUT') {
                    document.getElementsByClassName('js-copy-branch')[0].click();
                }
            }
        };
    }

    const init = () => {
        bindPrTabs();
        bindPullRequests();
        bindCopyBranchName();
    }
    bindOnLoad(init);
})
();