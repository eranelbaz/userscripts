"use strict";

const bindOnLoad = (func) => {
    document.addEventListener('pjax:success', func);
    document.addEventListener('pjax:end', func);
    document.addEventListener('hashchange', func);
    window.addEventListener("DOMContentLoaded", func);
    func();
}

const bindForElementChange = (query, func) => {
    ["DOMNodeInserted", "DOMNodeRemoved", "DOMAttributeNameChanged"].forEach(eventName => {
        document.addEventListener(eventName, function (e) {
            const runFunc = () => func({element: e.target});
            if (e.target.id === query) {
                runFunc();
            } else if (e.target.textContent.includes(query)) {
                runFunc();
            } else if (e.target.classList && Array.from(e.target.classList).includes(query)) {
                runFunc();
            }
        }, false);
    });
}