// ==UserScript==
// @name         Trello hide empty lists
// @namespace    trello
// @version      0.1
// @author       You
// @match        https://trello.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=trello.com
// @grant        none
// @updateURL    https://github.com/eranelbaz/userscripts/raw/main/src/trello/hide-empty-lists.user.js
// @downloadURL  https://github.com/eranelbaz/userscripts/raw/main/src/trello/hide-empty-lists.user.js
// ==/UserScript==

(function() {
    'use strict';
    const alwaysShow = ['Doing', 'Focus', 'In Review', 'QA']
    if(!location.pathname.includes('/versions')) {
        alwaysShow.push('Services')
    }

    const update = () => {
        const lists = document.querySelectorAll('[data-testid="list-wrapper"]');
        lists.forEach(list => {
            const hasCards = !!list.querySelector('li:not([hidden])');
            const listName = list.querySelector('h2').innerText;
            const shouldAlwaysShow = alwaysShow.some(name => listName.includes(name));
            if(hasCards || shouldAlwaysShow) {
                list.setAttribute("style","display: block;")
            }else{
                list.setAttribute("style","display: none;")
            }
        })
    };

    update();
    setInterval(update, 1000);
})();
