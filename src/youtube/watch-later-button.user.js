// ==UserScript==
// @name         YouTube - Add Watch Later Button
// @description  Bring back the watch later button on youtube homepage
// @version      2.3.0
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/watch?v=*
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/youtube/watch-later-button.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/youtube/watch-later-button.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// ==/UserScript==

const WATCH_LATER_SVG = 'M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z';
const videoDropDown = '#items > ytd-menu-service-item-renderer:nth-child(2) > tp-yt-paper-item';
const videoPageModal = '.ytd-menu-service-item-renderer';
let isOpen = false;
const addButtonHomePage = (menu) => {
  isOpen = false;
  const video = menu.parentElement;
  const menuRenderer = document.createElement('ytd-menu-renderer');
  menuRenderer.setAttribute('class', 'style-scope ytd-rich-grid-media add-to-watch-later-button');
  menuRenderer.style.position = 'abosulte';
  menuRenderer.style.top = '4em';
  menuRenderer.onclick = () => {
    isOpen = true;
    video.querySelector('#button > yt-icon').click();
  };
  video.appendChild(menuRenderer);

};


const addButtonVideoPage = (menu) => {
  isOpen = false;
  const menuRenderer = document.createElement('ytd-menu-renderer');
  menuRenderer.setAttribute('class', 'style-scope ytd-rich-grid-media add-to-watch-later-button');
  menuRenderer.onclick = () => {
    isOpen = true;
    document.querySelector('[aria-label="Save to playlist"]').click();
  };
  menu.appendChild(menuRenderer);
};

const fixSvg = (svg) => {
  svg.setAttribute('d', WATCH_LATER_SVG);
};

console.log('add watch later button loaded');
onElementReady(`div#menu.style-scope.ytd-rich-grid-media`, { findOnce: true }, addButtonHomePage);
onElementReady('.add-to-watch-later-button > yt-icon-button > button > yt-icon > yt-icon-shape > icon-shape > div > svg > path', { findOnce: true }, fixSvg);
onElementReady('#items > ytd-menu-service-item-renderer:nth-child(2) > tp-yt-paper-item > yt-formatted-string', { findOnce: false }, (addToWatchLater) => {
  if (isOpen) {
    addToWatchLater.click();
    isOpen = false;
  }

});
// Specific video page
onElementReady(`#actions > #actions-inner > #menu`, { findOnce: true }, addButtonVideoPage);
onElementReady('div#header.style-scope.ytd-add-to-playlist-renderer', { findOnce: false }, (modal) => {
  if (isOpen) {
    document.querySelector('[aria-label="Watch later Private"]').click();
    isOpen = false;
  }
});
