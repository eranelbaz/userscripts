// ==UserScript==
// @name         Copy Link with Document Title (Command+Shift+C on Mac)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Copy a hyperlink with the document title to the clipboard using Command+Shift+C on Mac
// @author       Your Name
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/copy-url-name.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/copy-url-name.user.js
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
            showNotification("Copied Link");
        } else {
            console.error('Failed to copy the link');
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px 20px';
        notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        notification.style.color = 'white';
        notification.style.borderRadius = '5px';
        notification.style.fontSize = '14px';
        notification.style.fontFamily = 'Arial, sans-serif';
        notification.style.zIndex = '9999';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(function() {
            notification.style.opacity = '0';
            setTimeout(function() {
                document.body.removeChild(notification);  // Remove it after fade
            }, 500);
        }, 2000);
    }

    document.addEventListener('keydown', function(event) {
        if (event.metaKey && event.shiftKey && event.code === 'KeyC') {
            event.preventDefault();
            createLink();
        }
    });
})();
