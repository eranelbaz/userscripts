(() => {
    "use strict";
    const targets = {
        'partial-pull-merging': {
            type: 'id',
            eventName: 'gh:actions'

        },
        'js--on-project-ping': {
            type: 'id',
            eventName: 'bors:alert'
        },
    };
    const targetList = Object.keys(targets);


    const bindForElementChange = () => {
        ["DOMNodeInserted", "DOMNodeRemoved", "DOMAttributeNameChanged"].forEach(eventName => {
            document.addEventListener(eventName, (e) => {
                if (targetList.includes(e.target.id) && targets[targetList].type === 'id') {
                    const event = new Event(targets[targetList].eventName);
                    document.dispatchEvent(event);
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