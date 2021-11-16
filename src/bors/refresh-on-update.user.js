// ==UserScript==
// @name         Refresh bors on update
// @namespace    bors
// @version      0.3
// @description  try to take over the world!
// @author       You
// @include      https://bors-env0.herokuapp.com/*
// @icon         https://bors-env0.herokuapp.com/images/favicon-32x32.png
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/eranelbaz/userscripts/main/bors/refresh-on-update.user.js
// @downloadURL  https://raw.githubusercontent.com/eranelbaz/userscripts/main/bors/refresh-on-update.user.js
// ==/UserScript==

(function () {
    'use strict';
    const init = ({element}) => {
        if (location.href.includes('batches') || location.href.includes('repositories/4')) {
            const isHidden = element.hidden;
            if (!isHidden) {
                location.reload();
            }
        }
    }
    $('alert').bind('change', init);
})();