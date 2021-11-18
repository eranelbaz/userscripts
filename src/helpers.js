(() => {
    "use strict";

    const bindForElementChange = (targets) => {
        const targetList = Object.keys(targets);
        ["DOMNodeInserted", "DOMNodeRemoved", "DOMAttributeNameChanged"].forEach(eventName => {
            document.addEventListener(eventName, (e) => {
                if (targetList.includes(e.target.id) && targets[targetList].type === 'id') {
                    const event = new Event(targets[targetList].eventName);
                    document.dispatchEvent(event);
                }

            }, false);
        });
    }
})();