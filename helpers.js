const bindOnLoad = (func) => {
    document.addEventListener('pjax:success', func);
    document.addEventListener('pjax:end', func)
    window.addEventListener("DOMContentLoaded", func);
    func();
}

const bindForElementChange = (query, func) => {
    ["DOMNodeInserted", "DOMNodeRemoved", "DOMAttributeNameChanged"].forEach(eventName => {
        document.addEventListener(eventName, function (e) {
            if(e.target.id === query) {
                func();
            } else if(e.target.textContent.includes(query)) {
                func();
            }
        }, false);
    });
}