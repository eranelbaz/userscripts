// ==UserScript==
// @name         Hide events in github (refine github)
// @namespace    github
// @version      0.3.8
// @author       You
// @include      https://github.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant        none
// @require      https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/url-detection.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/hide-events-refine-github.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/src/github/hide-events-refine-github.user.js
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637

// ==/UserScript==

const hideEvents = () => {
  if (isPR()) {
    var label = document.querySelector('[data-value="hideEvents"]');
    if (label) {
      label.click();
    }
  }
};

const hideSeed = (element) => {
    if(element.innerHTML.includes('seed')) {
        element.remove();
    }
}


onElementReady(`#rgh-conversation-activity-filter-select-menu`, { findOnce: true }, hideEvents);
onElementReady(`.js-timeline-item`, { findOnce: true }, hideSeed);
