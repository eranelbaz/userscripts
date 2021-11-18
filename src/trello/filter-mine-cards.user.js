// ==UserScript==
// @name         Filter your tickets
// @namespace    trello
// @version      0.1.0
// @description  When pressing on this card is will add / remove filter for your tickets
// @author       You
// @include      https://trello.com/*
// @icon
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/helpers.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/trello/filter-mine-cards.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/trello/filter-mine-cards.user.js
// ==/UserScript==

(function () {
    'use strict';
    const readCookie = (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    const init = () => {
        const automation = document.querySelector('.board-header-btns > .js-butler-header-btns');
        const newBtn = automation.cloneNode(true);
        newBtn.classList.add('mine-tickets');

        Array.from(newBtn.getElementsByTagName('span')).find(el => el.classList.length === 0).textContent = 'Your Tickets';
        newBtn.onclick = () => {
            const userId = readCookie('mab');
            const boardURI = location.href.match(/b\/(.+?)\//)[1];
            const boardId = JSON.parse(httpGet(`https://trello.com/1/board/${boardURI}`)).id;
            const localStorageKey = `boardCardFilterSettings-${boardId}-${userId}`;
            const filter = JSON.parse(localStorage.getItem(localStorageKey)) ?? {};
            filter.idMembers = [userId]
            localStorage.setItem(localStorageKey, JSON.stringify(filter));
            location.reload();
        }
        automation.parentNode.insertBefore(newBtn, automation);
    }

    init();
    bindForElementChange({
        'board-header-btns': {
            type: 'id',
            eventName: 'trello:board-headers'

        }
    })
    document.addEventListener("trello:board-headers", init);

})();