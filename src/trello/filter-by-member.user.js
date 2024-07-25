// ==UserScript==
// @name         Add filter by member
// @namespace    trello
// @version      0.0.1
// @author       You
// @include      https://trello.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=trello.com
// @grant        none
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// @updateURL    https://github.com/eranelbaz/userscripts/raw/main/src/trello/filter-by-member.user.js
// @downloadURL  https://github.com/eranelbaz/userscripts/raw/main/src/trello/filter-by-member.user.js
// ==/UserScript==

const addFilter = (element) => {
  if (element.querySelectorAll('ul').length < 3) {
    const cssClass = element.querySelector('ul > li').className;
    const hrElement = document.createElement('hr');
    hrElement.style.margin = '8px 0px';
    element.appendChild(hrElement);
    const ulElement = document.createElement('ul');
    const liElement = document.createElement('li');
    liElement.innerHTML = 'Filter by member';
    if(cssClass != null) liElement.classList.add(cssClass);
    ulElement.appendChild(liElement);
    element.appendChild(ulElement);
    ulElement.onclick = () => {
      const member = element.querySelector('div:nth-child(2) > div:nth-child(2) > div:nth-child(2)').title;
      const currentUrl = new URL(window.location);
      currentUrl.searchParams.set('filter', `member:${member}`);
      window.location.replace(currentUrl.href);
    }
  }

};

onElementReady(`.atlaskit-portal > section > div > div`, { findOnce: false }, addFilter);
