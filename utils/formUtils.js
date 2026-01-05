import crypto from 'crypto'


const APP_TIMEZONE = "Australia/Brisbane";

export function cleanFormEntries(entries) {
    const forbiddenKeys = ["$ACTION_REF_", "$ACTION_KEY", "$ACTION_"];

    return Object.fromEntries(
        Object.entries(entries).filter(([key]) => {
            // remove any keys that start with those forbidden prefixes
            return !forbiddenKeys.some((prefix) => key.startsWith(prefix));
        })
    );
}

export function camelToNormal(str) {
    return str
        ?.replace(/([a-z])([A-Z])/g, '$1 $2')
        ?.replace(/^./, (s) => s.toUpperCase())
        ?.trim();
}

export function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDateToYMD(isoDateString, timeZone = "Australia/Brisbane") {
    if (!isoDateString) return "";

    var date = new Date(isoDateString);
    if (isNaN(date.getTime())) return "";

    // Default to Australian timezone if nothing provided
    var tz = timeZone ||
        (typeof Intl !== "undefined" && Intl.DateTimeFormat
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "Australia/Brisbane");

    // Get date parts in the specified timezone
    var parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: APP_TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(date);

    var year = parts.find(function (p) { return p.type === "year"; })?.value;
    var month = parts.find(function (p) { return p.type === "month"; })?.value;
    var day = parts.find(function (p) { return p.type === "day"; })?.value;

    if (!year || !month || !day) return "";

    return year + "-" + month + "-" + day;
}


export function formatReadableDate(dateInput, timeZone = "Australia/Brisbane") {
    if (!dateInput) return "";

    var date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";

    // Default to Australia/Sydney if no timezone
    var tz = timeZone ||
        (typeof Intl !== "undefined" && Intl.DateTimeFormat
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "Australia/Brisbane");

    // Extract parts safely
    var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: APP_TIMEZONE,
        day: "numeric",
        month: "long",
        year: "numeric"
    }).formatToParts(date);

    var day = Number(parts.find(function (p) { return p.type === "day"; })?.value);
    var month = parts.find(function (p) { return p.type === "month"; })?.value;
    var year = parts.find(function (p) { return p.type === "year"; })?.value;

    if (!day || !month || !year) return "";

    // Add ordinal suffix
    var suffix =
        day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
                day % 10 === 3 && day !== 13 ? "rd" : "th";

    return day + suffix + " " + month + " " + year;
}




export function timeAgo(isoDateString, timeZone = "Australia/Brisbane") {
    if (!isoDateString) return "";

    var inputDate = new Date(isoDateString);
    var inputTime = inputDate.getTime();
    if (isNaN(inputTime)) return "";

    // Current time in UTC
    var nowTime = Date.now();

    // Difference in seconds
    var diffInSeconds = Math.floor((nowTime - inputTime) / 1000);
    if (diffInSeconds < 0) return "just now"; // future-proof
    if (diffInSeconds < 60) return "just now";

    var diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return diffInMinutes + " minute" + (diffInMinutes !== 1 ? "s" : "") + " ago";

    var diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return diffInHours + " hour" + (diffInHours !== 1 ? "s" : "") + " ago";

    var diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "a day ago";
    if (diffInDays < 7) return diffInDays + " days ago";

    var diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) return "a week ago";
    if (diffInWeeks < 5) return diffInWeeks + " weeks ago";

    // fallback → user-timezone aware date
    return formatDateToYMD(inputDate, timeZone || "Australia/Brisbane");
}



export function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
}


export function createOTP() {
    const buffer = crypto.randomInt(100000, 1000000);
    return buffer.toString();
}

export function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
            if (+match === 0) return ""; // skip spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        })
        .replace(/\s+/g, '');
}

export function getUserTimeZone() {
    if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {

        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return "Australia/Brisbane"; // fallback
}

export function formatTo12HourTime(isoString, timeZone = "Australia/Brisbane") {
    if (!isoString) return "";

    var date = new Date(isoString);
    if (isNaN(date.getTime())) return "";

    // Use user timezone if provided, otherwise default to Australia/Sydney
    var tz = timeZone ||
        (typeof Intl !== "undefined" && Intl.DateTimeFormat
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "Australia/Brisbane");

    return new Intl.DateTimeFormat("en-US", {
        timeZone: APP_TIMEZONE,
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).format(date);
}


export function isoDateToLocal12HourTime(isoDateString) {
    // Extract the ISO string from ISODate('...')
    const match = isoDateString.match(/ISODate\('(.*)'\)/);
    if (!match) throw new Error("Invalid ISODate format");

    const date = new Date(match[1]);

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}



export function validateEntries(cleanedEntries) {
    // Object.values gives all values of the object
    const hasEmpty = Object.values(cleanedEntries).some(
        (val) => val === null || val === undefined
    );

    if (hasEmpty) {
        return false;
    }

    return true;
}

export function getYouTubeEmbedUrl(rawUrl) {

    if (typeof rawUrl !== 'string') {
        return null;
    }

    const url = rawUrl.trim();
    if (!url) {
        return null;
    }

    try {
        let videoId;

        // Match normal YouTube link
        const match1 = url.match(/v=([^&]+)/);
        if (match1) {
            videoId = match1[1];
        }

        // Match short youtu.be link
        const match2 = url.match(/youtu\.be\/([^?]+)/);
        if (!videoId && match2) {
            videoId = match2[1];
        }

        // If it’s already an embed link
        const match3 = url.match(/embed\/([^?]+)/);
        if (!videoId && match3) {
            videoId = match3[1];
        }

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch (e) {
        return e.message;
    }
}

export const unslugify = (slug) => {
    if (!slug || typeof slug !== 'string') return '';
    return slug
        .split('-')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function truncateToSixWords(text) {
    const words = text.split(" "); // split by spaces
    if (words.length <= 6) return text; // if 6 or fewer words, return as is
    return words.slice(0, 6).join(" ") + "..."; // take first 6 words
}


export function toYMD(dateInput, timeZone = "Australia/Brisbane") {
    if (!dateInput) return "";

    var date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";

    // Use provided timezone, otherwise default to Australia/Sydney
    var tz = timeZone ||
        (typeof Intl !== "undefined" && Intl.DateTimeFormat
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "Australia/Brisbane");

    // Extract year/month/day in specified timezone
    var parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: APP_TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(date);

    var y = parts.find(function (p) { return p.type === "year"; })?.value;
    var m = parts.find(function (p) { return p.type === "month"; })?.value;
    var d = parts.find(function (p) { return p.type === "day"; })?.value;

    if (!y || !m || !d) return "";

    return y + "-" + m + "-" + d;
}
