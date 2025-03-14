// ==UserScript==
// @name         Copy Link with Document Title
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Copy a hyperlink with the document title to the clipboard using Ctrl+Shift+C
// @author       Your Name
// @match        *://*/*  // Match all websites
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createLink() {
        const link = document.createElement('a');
        link.href = window.location.href;
        link.textContent = document.title;
        document.body.appendChild(link);

        const range = document.createRange();
        range.selectNode(link);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        const successful = document.execCommand('copy');

        if (successful) {
            document.body.removeChild(link);
            console.log('Link copied');
        } else {
            console.error('Failed to copy the link');
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.code === 'KeyC') {
            event.preventDefault();
            createLink();
        }
    });
})();
