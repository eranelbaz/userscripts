(() => {
    "use strict";
    const targets = {
        classNames: ['js-merge-message-container']
    }


    const bindForElementChange = (query, func) => {
        ["DOMNodeInserted", "DOMNodeRemoved", "DOMAttributeNameChanged"].forEach(eventName => {
            document.addEventListener(eventName, function (e) {

                if (e.target.classList && Array.from(e.target.classList).some(targetClass => targets.classNames.includes(targetClass))) {
                    func();
                }

            }, false);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => bindForElementChange);
    } else {
        bindForElementChange();
    }
})();