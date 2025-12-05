import crypto from 'crypto'

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

export function formatDateToYMD(isoDateString) {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months start at 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function formatReadableDate(dateInput) {
    const date = new Date(dateInput);
    if (isNaN(date)) return ""; // handle invalid dates

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // add suffix: st, nd, rd, th
    const suffix =
        day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
                ? "nd"
                : day % 10 === 3 && day !== 13
                    ? "rd"
                    : "th";

    return `${day}${suffix} ${month} ${year}`;
}



export function timeAgo(isoDateString) {
    const inputDate = new Date(isoDateString);
    const now = new Date();

    // Difference in seconds
    const diffInSeconds = Math.floor((now - inputDate) / 1000);

    if (diffInSeconds < 60) return "just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "a day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) return "a week ago";
    if (diffInWeeks < 5) return `${diffInWeeks} weeks ago`;

    // fallback -> show exact date using your function
    return formatDateToYMD(isoDateString);
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

export function formatTo12HourTime(isoString) {
    const date = new Date(isoString);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 -> 12

    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${hours}:${formattedMinutes} ${ampm}`;
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
