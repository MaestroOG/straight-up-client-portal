const ALLOWED_FILE_TYPES = {
    "application/pdf": ["pdf"],

    "image/jpeg": ["jpg", "jpeg"],
    "image/png": ["png"],
    "image/webp": ["webp"],
    "image/gif": ["gif"],

    "application/zip": ["zip"],
    "application/x-zip-compressed": ["zip"],

    "application/x-rar-compressed": ["rar"],
    "application/vnd.rar": ["rar"],

    "application/octet-stream": ["zip", "rar", "7z"],
};


export function validateFile(fileName, mimeType) {
    const parts = fileName.split(".");
    if (parts.length < 2) {
        throw new Error("Unsupported file type");
    }
    const ext = parts.pop().toLowerCase();
    const allowedExts = ALLOWED_FILE_TYPES[mimeType];

    if (!allowedExts || !allowedExts.includes(ext)) {
        throw new Error("Unsupported file type");
    }
}

export function getFileCategory(mime) {
    if (mime.startsWith("image/")) return "image";
    if (mime === "application/pdf") return "document";
    if (mime.includes("zip") || mime.includes("rar") || mime === "application/octet-stream") return "archive";
    return "other";
}