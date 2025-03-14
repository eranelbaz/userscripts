// ==UserScript==
// @name         Add filter by label
// @namespace    trello
// @version      0.0.5
// @author       You
// @include      https://trello.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=trello.com
// @grant        none
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// @updateURL    https://github.com/eranelbaz/userscripts/raw/main/src/trello/filter-by-label.user.js
// @downloadURL  https://github.com/eranelbaz/userscripts/raw/main/src/trello/filter-by-label.user.js
// ==/UserScript==

console.log('[Tampermonkey] Script loaded: Add filter by label');

// Function to add "Filter by label" button
const addFilter = (element, text) => {
    console.log('[Tampermonkey] addFilter called for element:', element, 'with text:', text);

    // Check if the button is already mounted
    const existingButton = element.querySelector('#filter-by-label-button');
    if (existingButton) {
        console.log('[Tampermonkey] Button already exists, skipping...');
        return;
    }

    // Get class names from an existing button under the same element
    const referenceButton = element.querySelector('div > button:not(ul button)');
    console.log('[Tapermonkey] this is reference', referenceButton);
    const buttonClassName = referenceButton ? referenceButton.className : '';
    if (!buttonClassName) {
        console.warn('[Tampermonkey] No reference button found. Defaulting to no class name.');
    } else {
        console.log('[Tampermonkey] reference button found.', referenceButton );
    }

    // Create the button element
    const button = document.createElement('button');
    button.id = 'filter-by-label-button'; // Assign a custom id to the button
    button.className = buttonClassName; // Use the dynamically retrieved class names
    button.type = 'button';
    button.textContent = 'Filter by label';

    // Add click event to redirect and log
    button.onclick = () => {
        console.log('[Tampermonkey] Text passed to addFilter:', text);

        // Parse the current URL to extract the base card URL
        const currentUrl = window.location.href;
        const baseCardUrlMatch = currentUrl.match(/https:\/\/trello\.com\/c\/[a-zA-Z0-9]+/);

        if (baseCardUrlMatch) {
            const baseCardUrl = `${baseCardUrlMatch[0]}?filter=label:${encodeURIComponent(text)}`;
            console.log('[Tampermonkey] Redirecting to:', baseCardUrl);
            window.location.href = baseCardUrl; // Redirect to the base card URL with filter
        } else {
            console.error('[Tampermonkey] Failed to parse the base card URL from:', currentUrl);
        }
    };

    console.log('[Tampermonkey] Button created:', button);

    // Append the button to the provided element
    element.querySelector('div').appendChild(button);
    console.log('[Tampermonkey] Button appended to element:', element);
};

// Function to enhance spans with additional onClick logic
const enhanceSpans = (element) => {
    console.log('[Tampermonkey] enhanceSpans called for element:', element);

    // Select all span elements within the container
    const spans = element.querySelectorAll('span');
    spans.forEach((span) => {
        // Preserve the original onClick logic
        const originalOnClick = span.onclick;

        // Assign a new onClick handler that preserves the original logic
        span.onclick = (event) => {
            const spanText = span.textContent;
            console.log('[Tampermonkey] Span clicked, text:', spanText);

            // Invoke onElementReady to handle labels-popover-labels-screen
            onElementReady(`[data-testid="labels-popover-labels-screen"]`, { findOnce: true }, (popoverElement) => {
                console.log('[Tampermonkey] Popover element found, invoking addFilter...');
                addFilter(popoverElement, spanText);
            });

            // Call the original onClick if it exists
            if (typeof originalOnClick === 'function') {
                originalOnClick.call(span, event);
            }
        };

        console.log('[Tampermonkey] Enhanced span:', span);
    });
};

// Listen for elements to be ready and call enhanceSpans
onElementReady(`[data-testid="card-back-labels-container"]`, { findOnce: false }, (element) => {
    console.log('[Tampermonkey] Element with data-testid="card-back-labels-container" ready, invoking enhanceSpans...');
    enhanceSpans(element);
});
