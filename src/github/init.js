const bindInit = (eventNames, init) =>{
    eventNames.forEach(eventName => {
        document.addEventListener(eventName, init);
        document.addEventListener(eventName, () => setTimeout(init, 500));
    })

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => init);
    }
    setTimeout(init, 500);
}