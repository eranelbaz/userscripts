// ==UserScript==
// @name         YouTube - Add Watch Later Button
// @description  Bring back the watch later button on youtube homepage
// @version      2.2.0
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/watch?v=*
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/youtube/watch-later-button.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/youtube/watch-later-button.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// ==/UserScript==

const WATCH_LATER_SVG = 'M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z';
const handeled = [];

const addButtonHomePage = (menu) => {
  const video = menu.parentElement;
  if (!handeled.includes(video)) {
    handeled.push(video);
    const menuRenderer = document.createElement('ytd-menu-renderer');
    menuRenderer.setAttribute('class', 'style-scope ytd-rich-grid-media add-to-watch-later-button');

    menuRenderer.onclick = () => {
      const homePageKebab = '#button > yt-icon';
      video.querySelector(homePageKebab).click();
    };
    video.appendChild(menuRenderer);
    Array.from(video.querySelectorAll('ytd-menu-renderer')).forEach(menu => menu.style.position = 'static');
  }
};




const addButtonVideoPage = (menu) => {
  console.log(menu);
  const menuRenderer = document.createElement('ytd-menu-renderer');
  menuRenderer.setAttribute('class', 'style-scope ytd-rich-grid-media add-to-watch-later-button');

  const waitAndSaveModal = () => {
    onElementReady('tp-yt-paper-checkbox', { findOnce: false }, (cb) => {
      cb.innerHTML.includes('Watch later') && cb.click();
    });
  };

  menuRenderer.onclick = () => {
    const saveButton = document.querySelector('[aria-label="Save to playlist"]')
    console.log({saveButton});
    if (saveButton) {
      saveButton.click();
      waitAndSaveModal();
    } else {
      menu.querySelector('#button-shape > button > yt-touch-feedback-shape').click();

      onElementReady('.ytd-menu-service-item-renderer', { findOnce: true }, (subMenu) => {
          if (subMenu.innerHTML.includes('Save')) {
            subMenu.click();
            waitAndSaveModal();
          }
        }
      );
    }


  };
  menu.appendChild(menuRenderer);
};

const fixSvg = (btn) => {
  btn.setAttribute('d', WATCH_LATER_SVG);
};

console.log('add watch later button loaded');
onElementReady(`#dismissible > #details > #menu > ytd-menu-renderer`, { findOnce: true }, addButtonHomePage);
onElementReady(`#actions > #actions-inner > #menu`, { findOnce: true }, addButtonVideoPage);
onElementReady('.add-to-watch-later-button > yt-icon-button > button > yt-icon > yt-icon-shape > icon-shape > div > svg > path', { findOnce: true }, fixSvg);
onElementReady('#items > ytd-menu-service-item-renderer:nth-child(2) > tp-yt-paper-item', { findOnce: false }, (addToWatchLater) => {
  if (!handeled.includes(addToWatchLater)) {
    addToWatchLater.click();
    handeled.push(addToWatchLater);
  }
});
