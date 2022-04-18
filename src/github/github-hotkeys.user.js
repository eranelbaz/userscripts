// ==UserScript==
// @name         Set Github hotkeys
// @namespace    github
// @version      0.3.8.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/url-detection.js
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/init.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/github-hotkeys.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/github-hotkeys.user.js
// ==/UserScript==
(function () {
    'use strict';

    const bindPrTabs = () => {
        if (isPR()) {
            Array.from(document.querySelectorAll('.tabnav-tabs > a')).forEach((tab, index) => {
                tab.dataset.hotkey = `g ${index + 1}`
            });
        }
    }

    const bindNotifications = () => {
        if (isNotifications()) {
            Array.from(document.querySelectorAll('.notification-list-item-link')).forEach((line, index) => {
                line.dataset.hotkey = `g ${index}`
                let prLine = line.parentNode;
                const existingSpan = Array.from(prLine.children).find(x => x.matches('.quick-link-span'))
                if (!existingSpan) {
                    const prListNumber = document.createElement('span');
                    prListNumber.textContent = `${index}`;
                    prListNumber.classList.add('quick-link-span')
                    prLine.querySelector('.d-flex > .m-0').appendChild(prListNumber);
                }
            });
        }
    }

    const bindPullRequests = () => {
        if (isPRList()) {
            Array.from(document.querySelectorAll('[data-hovercard-type="pull_request"]')).forEach((line, index) => {
                line.dataset.hotkey = `g ${index}`
                let prLine = line.parentNode;
                const existingSpan = Array.from(prLine.children).find(x => x.matches('.quick-link-span'))
                if (!existingSpan) {
                    const prListNumber = document.createElement('span');
                    prListNumber.textContent = `${index}`;
                    prListNumber.classList.add('quick-link-span')
                    const prStatus = prLine.querySelector('.d-inline-block');
                    prLine.insertBefore(prListNumber, prStatus.nextSibling);
                }
            });
        }
    }

    const bindCopyBranchName = () => {
        document.onkeydown = function (e) {
            e = e || window.event;
            var charCode = e.which || e.keyCode;
            if (charCode === 66) {
                if (isPR(location.href) && document.activeElement.nodeName !== 'TEXTAREA' && document.activeElement.nodeName !== 'INPUT') {
                    document.getElementsByClassName('js-copy-branch')[0].click();
                }
            }
        };
    }

    const init = () => {
        bindPrTabs();
        bindPullRequests();
        bindNotifications();
        bindCopyBranchName();
    }

    bindInit(["ghmo:container"], init)
})
();