// Fork of https://github.com/fregante/github-url-detection.git since we are running not in module mode and can't import that

const getRepo = (url) => {
    if (!url) {
        // We use `canonical` here to use the correct capitalization
        // `rel=canonical` doesn't appear on every page
        const canonical = document.querySelector<HTMLMetaElement>('[property="og:url"]');
        if (canonical) {
            const canonicalUrl = new URL(canonical.content, location.origin);
            // Sometimes GitHub sets the canonical to an incomplete URL, so it can't be used
            if (getCleanPathname(canonicalUrl).toLowerCase() === getCleanPathname(location).toLowerCase()) {
                url = canonicalUrl;
            }
        }
    }

    if (typeof url === 'string') {
        url = new URL(url, location.origin);
    }

    if (!isRepo(url)) {
        return;
    }

    const [owner, name, ...path] = getCleanPathname(url).split('/');
    return {
        owner,
        name,
        nameWithOwner: owner + '/' + name,
        path: path.join('/'),
    };
};

const isPR = (url) => /^pull\/\d+/.test(getRepo(url)?.path) && !isPRConflicts(url);
const isPRConflicts = (url) => /^pull\/\d+\/conflicts/.test(getRepo(url)?.path);
const isPRList = (url) => url.pathname === '/pulls' || getRepo(url)?.path === 'pulls';

