const bindOnLoad = (func) => {
    document.addEventListener('pjax:success', func);
    document.addEventListener('pjax:end', func)
    window.addEventListener("DOMContentLoaded", func);
    func();
}

const bindForElementChange = (queryString, func) => {
    ["DOMNodeInserted", "DOMNodeRemoved", "DOMAttributeNameChanged"].forEach(eventName => {
        document.addEventListener(eventName, function (e) {
            if(e.target.matches(queryString))
                func();

        }, false);
    });
}