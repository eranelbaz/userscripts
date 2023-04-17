// ==UserScript==
// @name         YouTube - Add Watch Later Button
// @description  Bring back the watch later button on youtube homepage
// @version      1.0.0
// @match        https://www.youtube.com*
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/youtube/watch-later-button.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/youtube/watch-later-button.user.js
// ==/UserScript==

const WATCH_LATER_SVG = 'M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z';
const handeled = [];
const addButton = (menu) => {
  const video = menu.parentElement;
  console.log('starting', { video, menu });
  if (!handeled.includes(video)) {
    handeled.push(video);
    const menuRenderer = document.createElement('ytd-menu-renderer');
    menuRenderer.setAttribute('class', 'style-scope ytd-rich-grid-media');

    menuRenderer.onclick = () => {
      video.querySelector('#button > yt-icon').click();
      document.querySelector('#items > ytd-menu-service-item-renderer:nth-child(2) > tp-yt-paper-item').click();
      video.querySelector('#button > yt-icon').click();
    };
    video.appendChild(menuRenderer);
    Array.from(video.querySelectorAll('ytd-menu-renderer')).forEach(menu => menu.style.position = 'static');

    setTimeout(() => menuRenderer.querySelector('#button > yt-icon > svg > g > path').setAttribute('d', WATCH_LATER_SVG), 500);

  }
};

console.log('add watch later button loaded');
onElementReady(`#dismissible > #details > #menu > ytd-menu-renderer`, { findOnce: true }, addButton);
