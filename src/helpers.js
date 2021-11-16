"use strict";

const bindOnLoad = (func) => {
    ["pjax:end", "pjax:success", "pjax:error", "page:loaded", "pjax:start", "session:resume", "pjax:popstate"]
        .forEach(eventName => $(document).on(eventName, func));
    func();
}

const bindOnElement = (query, func) => {
    ["DOMNodeInserted", "DOMSubtreeModified", "DOMNodeRemoved", "DOMAttributeNameChanged"].forEach(eventName => {
        document.addEventListener(eventName, function (e) {
            if (e.target.nodeName === query ||
                e.target.id === query ||
                e.target.textContent.includes(query) ||
                e.target.classList && Array.from(e.target.classList).includes(query)
            ) {
                func({element: e.target});
            }

        }, false);
    });
}