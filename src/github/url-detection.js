// Fork of https://github.com/fregante/github-url-detection.git after babel

"use strict";

function _toArray(arr) {
    return (
        _arrayWithHoles(arr) ||
        _iterableToArray(arr) ||
        _unsupportedIterableToArray(arr) ||
        _nonIterableRest()
    );
}

function _nonIterableRest() {
    throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _iterableToArray(iter) {
    if (
        (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
        iter["@@iterator"] != null
    )
        return Array.from(iter);
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

var reservedNames = [
    "400",
    "401",
    "402",
    "403",
    "404",
    "405",
    "406",
    "407",
    "408",
    "409",
    "410",
    "411",
    "412",
    "413",
    "414",
    "415",
    "416",
    "417",
    "418",
    "419",
    "420",
    "421",
    "422",
    "423",
    "424",
    "425",
    "426",
    "427",
    "428",
    "429",
    "430",
    "431",
    "500",
    "501",
    "502",
    "503",
    "504",
    "505",
    "506",
    "507",
    "508",
    "509",
    "510",
    "511",
    "about",
    "access",
    "account",
    "admin",
    "advisories",
    "anonymous",
    "any",
    "api",
    "apps",
    "attributes",
    "auth",
    "billing",
    "blob",
    "blog",
    "bounty",
    "branches",
    "business",
    "businesses",
    "c",
    "cache",
    "case-studies",
    "categories",
    "central",
    "certification",
    "changelog",
    "cla",
    "cloud",
    "codereview",
    "collection",
    "collections",
    "comments",
    "commit",
    "commits",
    "community",
    "companies",
    "compare",
    "contact",
    "contributing",
    "cookbook",
    "coupons",
    "customer-stories",
    "customer",
    "customers",
    "dashboard",
    "dashboards",
    "design",
    "develop",
    "developer",
    "diff",
    "discover",
    "discussions",
    "docs",
    "downloads",
    "downtime",
    "editor",
    "editors",
    "edu",
    "enterprise",
    "events",
    "explore",
    "featured",
    "features",
    "files",
    "fixtures",
    "forked",
    "garage",
    "ghost",
    "gist",
    "gists",
    "graphs",
    "guide",
    "guides",
    "help",
    "help-wanted",
    "home",
    "hooks",
    "hosting",
    "hovercards",
    "identity",
    "images",
    "inbox",
    "individual",
    "info",
    "integration",
    "interfaces",
    "introduction",
    "invalid-email-address",
    "investors",
    "issues",
    "jobs",
    "join",
    "journal",
    "journals",
    "lab",
    "labs",
    "languages",
    "launch",
    "layouts",
    "learn",
    "legal",
    "library",
    "linux",
    "listings",
    "lists",
    "login",
    "logos",
    "logout",
    "mac",
    "maintenance",
    "malware",
    "man",
    "marketplace",
    "mention",
    "mentioned",
    "mentioning",
    "mentions",
    "migrating",
    "milestones",
    "mine",
    "mirrors",
    "mobile",
    "navigation",
    "network",
    "new",
    "news",
    "none",
    "nonprofit",
    "nonprofits",
    "notices",
    "notifications",
    "oauth",
    "offer",
    "open-source",
    "organisations",
    "organizations",
    "orgs",
    "pages",
    "partners",
    "payments",
    "personal",
    "plans",
    "plugins",
    "popular",
    "popularity",
    "posts",
    "press",
    "pricing",
    "professional",
    "projects",
    "pulls",
    "raw",
    "readme",
    "recommendations",
    "redeem",
    "releases",
    "render",
    "reply",
    "repositories",
    "resources",
    "restore",
    "revert",
    "save-net-neutrality",
    "saved",
    "scraping",
    "search",
    "security",
    "services",
    "sessions",
    "settings",
    "shareholders",
    "shop",
    "showcases",
    "signin",
    "signup",
    "site",
    "spam",
    "sponsors",
    "ssh",
    "staff",
    "starred",
    "stars",
    "static",
    "status",
    "statuses",
    "storage",
    "store",
    "stories",
    "styleguide",
    "subscriptions",
    "suggest",
    "suggestion",
    "suggestions",
    "support",
    "suspended",
    "talks",
    "teach",
    "teacher",
    "teachers",
    "teaching",
    "team",
    "teams",
    "ten",
    "terms",
    "timeline",
    "topic",
    "topics",
    "tos",
    "tour",
    "train",
    "training",
    "translations",
    "tree",
    "trending",
    "updates",
    "username",
    "users",
    "visualization",
    "w",
    "watching",
    "wiki",
    "windows",
    "works-with",
    "www0",
    "www1",
    "www2",
    "www3",
    "www4",
    "www5",
    "www6",
    "www7",
    "www8",
    "www9"
];

var exists = function exists(e) {
        return Boolean(document.querySelector(e));
    },
    is404 = function is404() {
        return "Page not found · GitHub" === document.title;
    },
    is500 = function is500() {
        return (
            "Server Error · GitHub" === document.title ||
            "Unicorn! · GitHub" === document.title ||
            "504 Gateway Time-out" === document.title
        );
    },
    isPasswordConfirmation = function isPasswordConfirmation() {
        return (
            "Confirm password" === document.title ||
            "Confirm access" === document.title
        );
    },
    isBlame = function isBlame() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("blame/")
        );
    },
    isCommit = function isCommit() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return isSingleCommit(e) || isPRCommit(e);
    },
    isCommitList = function isCommitList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return isRepoCommitList(e) || isPRCommitList(e);
    },
    isRepoCommitList = function isRepoCommitList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("commits")
        );
    },
    isCompare = function isCompare() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("compare")
        );
    },
    isDashboard = function isDashboard() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            !isGist(e) &&
            /^$|^(orgs\/[^/]+\/)?dashboard(\/|$)/.test(getCleanPathname(e))
        );
    },
    isEnterprise = function isEnterprise() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return "github.com" !== e.hostname && "gist.github.com" !== e.hostname;
    },
    isGist = function isGist() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            e.hostname.startsWith("gist.") || "gist" === e.pathname.split("/", 2)[1]
        );
    },
    isGlobalConversationList = function isGlobalConversationList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return ["issues", "pulls"].includes(e.pathname.split("/", 2)[1]);
    },
    isGlobalSearchResults = function isGlobalSearchResults() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            "/search" === e.pathname &&
            null !== new URLSearchParams(e.search).get("q")
        );
    },
    isIssue = function isIssue() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            /^issues\/\d+/.test(
                null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
            ) && "GitHub · Where software is built" !== document.title
        );
    },
    isConversationList = function isConversationList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            isGlobalConversationList(e) || isRepoConversationList(e) || isMilestone(e)
        );
    },
    isConversation = function isConversation() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return isIssue(e) || isPRConversation(e);
    },
    isLabelList = function isLabelList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "labels" === (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isMilestone = function isMilestone() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^milestone\/\d+/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isMilestoneList = function isMilestoneList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "milestones" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isNewFile = function isNewFile() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("new")
        );
    },
    isNewIssue = function isNewIssue() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "issues/new" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isNewRelease = function isNewRelease() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "releases/new" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isNewWikiPage = function isNewWikiPage() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return isRepoWiki(e) && getCleanPathname(e).endsWith("/_new");
    },
    isNotifications = function isNotifications() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return "notifications" === getCleanPathname(e);
    },
    isOrganizationProfile = function isOrganizationProfile() {
        return exists(
            'meta[name="hovercard-subject-tag"][content^="organization"]'
        );
    },
    isOrganizationRepo = function isOrganizationRepo() {
        var e;
        return Boolean(
            null === (e = document.querySelector("[data-owner-scoped-search-url]")) ||
            void 0 === e
                ? void 0
                : e.dataset.ownerScopedSearchUrl.startsWith("/org")
        );
    },
    isOrganizationDiscussion = function isOrganizationDiscussion() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return /^orgs\/[^/]+\/teams\/[^/]+($|\/discussions)/.test(
            getCleanPathname(e)
        );
    },
    isOwnUserProfile = function isOwnUserProfile() {
        return getCleanPathname() === getUsername();
    },
    isOwnOrganizationProfile = function isOwnOrganizationProfile() {
        return (
            isOrganizationProfile() &&
            !exists('[href*="contact/report-abuse?report="]')
        );
    },
    isProject = function isProject() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^projects\/\d+/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isProjects = function isProjects() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "projects" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isDiscussion = function isDiscussion() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^discussions\/\d+/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isDiscussionList = function isDiscussionList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "discussions" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isPR = function isPR() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            /^pull\/\d+/.test(
                null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
            ) && !isPRConflicts(e)
        );
    },
    isPRConflicts = function isPRConflicts() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^pull\/\d+\/conflicts/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isPRList = function isPRList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "/pulls" === e.pathname ||
            "pulls" === (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isPRCommit = function isPRCommit() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^pull\/\d+\/commits\/[\da-f]{5,40}/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isPRCommit404 = function isPRCommit404() {
        return (
            isPRCommit() &&
            document.title.startsWith("Commit range not found · Pull Request")
        );
    },
    isPRFile404 = function isPRFile404() {
        return (
            isPRFiles() &&
            document.title.startsWith("Commit range not found · Pull Request")
        );
    },
    isPRConversation = function isPRConversation() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^pull\/\d+$/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isPRCommitList = function isPRCommitList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^pull\/\d+\/commits$/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isPRFiles = function isPRFiles() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^pull\/\d+\/files/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isQuickPR = function isQuickPR() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return isCompare(e) && /[?&]quick_pull=1(&|$)/.test(e.search);
    },
    isDraftPR = function isDraftPR() {
        return exists('#partial-discussion-header [title="Status: Draft"]');
    },
    isOpenPR = function isOpenPR() {
        return exists(
            '#partial-discussion-header [title="Status: Open"], #partial-discussion-header [title="Status: Draft"]'
        );
    },
    isMergedPR = function isMergedPR() {
        return exists('#partial-discussion-header [title="Status: Merged"]');
    },
    isClosedPR = function isClosedPR() {
        return exists(
            '#partial-discussion-header [title="Status: Closed"], #partial-discussion-header [title="Status: Merged"]'
        );
    },
    isReleases = function isReleases() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "releases" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isTags = function isTags() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "tags" === (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isSingleTag = function isSingleTag() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^(releases\/tag)/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isReleasesOrTags = function isReleasesOrTags() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return isReleases(e) || isTags(e) || isSingleTag(e);
    },
    isDeletingFile = function isDeletingFile() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("delete")
        );
    },
    isEditingFile = function isEditingFile() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("edit")
        );
    },
    isEditingRelease = function isEditingRelease() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("releases/edit")
        );
    },
    isEditingWikiPage = function isEditingWikiPage() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return isRepoWiki(e) && getCleanPathname(e).endsWith("/_edit");
    },
    isRepo = function isRepo() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            /^[^/]+\/[^/]+/.test(getCleanPathname(e)) &&
            !reservedNames.includes(e.pathname.split("/", 2)[1]) &&
            !isDashboard(e) &&
            !isGist(e) &&
            !isRepoSearch(e) &&
            !isNewRepoTemplate(e)
        );
    },
    isEmptyRepoRoot = function isEmptyRepoRoot() {
        return isRepoHome() && !exists('link[rel="canonical"]');
    },
    isEmptyRepo = function isEmptyRepo() {
        return exists('[aria-label="Cannot fork because repository is empty."]');
    },
    isRepoTaxonomyConversationList = function isRepoTaxonomyConversationList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^labels\/.+|^milestones\/\d+(?!\/edit)/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isRepoConversationList = function isRepoConversationList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            isRepoPRList(e) || isRepoIssueList(e) || isRepoTaxonomyConversationList(e)
        );
    },
    isRepoPRList = function isRepoPRList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("pulls")
        );
    },
    isRepoIssueList = function isRepoIssueList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^labels\/|^issues(?!\/(\d+|new|templates)($|\/))/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isRepoHome = function isRepoHome() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return "" === (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path);
    },
    isRepoRoot = function isRepoRoot(e) {
        var i = getRepo(null != e ? e : location);
        return (
            !!i &&
            (!i.path ||
                (e
                    ? /^tree\/[^/]+$/.test(i.path)
                    : i.path.startsWith("tree/") &&
                    document.title.startsWith(i.nameWithOwner) &&
                    !document.title.endsWith(i.nameWithOwner)))
        );
    },
    isRepoSearch = function isRepoSearch() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return "search" === e.pathname.split("/")[3];
    },
    isRepoSettings = function isRepoSettings() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("settings")
        );
    },
    isRepoMainSettings = function isRepoMainSettings() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "settings" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isRepliesSettings = function isRepliesSettings() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return e.pathname.startsWith("/settings/replies");
    },
    isUserSettings = function isUserSettings() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return e.pathname.startsWith("/settings/");
    },
    isRepoTree = function isRepoTree() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            isRepoRoot(e) ||
            Boolean(
                null === (i = getRepo(e)) || void 0 === i
                    ? void 0
                    : i.path.startsWith("tree/")
            )
        );
    },
    isRepoWiki = function isRepoWiki() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("wiki")
        );
    },
    isSingleCommit = function isSingleCommit() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^commit\/[\da-f]{5,40}/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isSingleFile = function isSingleFile() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("blob/")
        );
    },
    isFileFinder = function isFileFinder() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("find/")
        );
    },
    isRepoForksList = function isRepoForksList() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "network/members" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isRepoNetworkGraph = function isRepoNetworkGraph() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "network" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isForkedRepo = function isForkedRepo() {
        return exists(
            'meta[name="octolytics-dimension-repository_is_fork"][content="true"]'
        );
    },
    isSingleGist = function isSingleGist() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return isGist(e) && /^\/(gist\/)?[^/]+\/[\da-f]{32}$/.test(e.pathname);
    },
    isTrending = function isTrending() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return "/trending" === e.pathname || e.pathname.startsWith("/trending/");
    },
    isBranches = function isBranches() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("branches")
        );
    },
    isProfile = function isProfile() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i = getCleanPathname(e);
        return i.length > 0 && !i.includes("/") && !reservedNames.includes(i);
    },
    isUserProfile = function isUserProfile() {
        return isProfile() && !isOrganizationProfile();
    },
    isUserProfileMainTab = function isUserProfileMainTab() {
        return isUserProfile() && !new URLSearchParams(location.search).has("tab");
    },
    isUserProfileRepoTab = function isUserProfileRepoTab() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            isProfile(e) &&
            "repositories" === new URLSearchParams(e.search).get("tab")
        );
    },
    isUserProfileStarsTab = function isUserProfileStarsTab() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return isProfile(e) && "stars" === new URLSearchParams(e.search).get("tab");
    },
    isUserProfileFollowersTab = function isUserProfileFollowersTab() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            isProfile(e) && "followers" === new URLSearchParams(e.search).get("tab")
        );
    },
    isUserProfileFollowingTab = function isUserProfileFollowingTab() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            isProfile(e) && "following" === new URLSearchParams(e.search).get("tab")
        );
    },
    hasComments = function hasComments() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            isPR(e) ||
            isIssue(e) ||
            isCommit(e) ||
            isOrganizationDiscussion(e) ||
            isSingleGist(e)
        );
    },
    hasRichTextEditor = function hasRichTextEditor() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            hasComments(e) ||
            isNewIssue(e) ||
            isCompare(e) ||
            isRepliesSettings(e) ||
            isNewRelease(e) ||
            isDiscussion(e)
        );
    },
    hasCode = function hasCode() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            hasComments(e) ||
            isRepoTree(e) ||
            isSingleFile(e) ||
            isGist(e) ||
            isCompare(e) ||
            isBlame(e)
        );
    },
    isMarketplaceAction = function isMarketplaceAction() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return e.pathname.startsWith("/marketplace/actions/");
    },
    isActionJobRun = function isActionJobRun() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return Boolean(
            null === (i = getRepo(e)) || void 0 === i
                ? void 0
                : i.path.startsWith("runs/")
        );
    },
    isActionRun = function isActionRun() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^(actions\/)?runs/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isNewAction = function isNewAction() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return (
            "actions/new" ===
            (null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path)
        );
    },
    isRepositoryActions = function isRepositoryActions() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        var i;
        return /^actions(\/workflows\/.+\.ya?ml)?$/.test(
            null === (i = getRepo(e)) || void 0 === i ? void 0 : i.path
        );
    },
    isUserTheOrganizationOwner = function isUserTheOrganizationOwner() {
        return (
            isOrganizationProfile() &&
            exists(
                '[aria-label="Organization"] [data-tab-item="org-header-settings-tab"]'
            )
        );
    },
    canUserEditOrganization = isUserTheOrganizationOwner,
    canUserEditRepo = function canUserEditRepo() {
        return (
            isRepo() &&
            exists(
                '.reponav-item[href$="/settings"], [data-tab-item$="settings-tab"]'
            )
        );
    },
    isNewRepo = function isNewRepo() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return (
            "/new" === e.pathname ||
            /^organizations\/[^/]+\/repositories\/new$/.test(getCleanPathname(e))
        );
    },
    isNewRepoTemplate = function isNewRepoTemplate() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return Boolean("generate" === e.pathname.split("/")[3]);
    },
    getUsername = function getUsername() {
        var e;
        return null === (e = document.querySelector('meta[name="user-login"]')) ||
        void 0 === e
            ? void 0
            : e.getAttribute("content");
    },
    getCleanPathname = function getCleanPathname() {
        var e =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : location;
        return e.pathname.slice(1, e.pathname.endsWith("/") ? -1 : void 0);
    },
    getRepo = function getRepo(e) {
        if (!e) {
            var _i = document.querySelector('[property="og:url"]');

            if (_i) {
                var _t = new URL(_i.content, location.origin);

                getCleanPathname(_t).toLowerCase() ===
                getCleanPathname(location).toLowerCase() && (e = _t);
            }
        }

        if (("string" == typeof e && (e = new URL(e, location.origin)), !isRepo(e)))
            return;

        var _getCleanPathname$spl = getCleanPathname(e).split("/"),
            _getCleanPathname$spl2 = _toArray(_getCleanPathname$spl),
            i = _getCleanPathname$spl2[0],
            t = _getCleanPathname$spl2[1],
            s = _getCleanPathname$spl2.slice(2);

        return {
            owner: i,
            name: t,
            nameWithOwner: i + "/" + t,
            path: s.join("/")
        };
    },
    utils = {
        getUsername: getUsername,
        getCleanPathname: getCleanPathname,
        getRepositoryInfo: getRepo
    };
