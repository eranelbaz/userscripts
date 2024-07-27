// ==UserScript==
// @name         Binance copy text
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.binance.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=binance.com
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// ==/UserScript==

const setAsCopy = (text) => {
    text.style.userSelect = 'all';
}


onElementReady(`.grid-row-selector > div > [data-bn-type="text"]`, { findOnce: false }, setAsCopy);
