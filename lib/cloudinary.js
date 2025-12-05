import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('CLOUDINARY_CLOUD_NAME is not set');
}

if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error('CLOUDINARY_API_KEY is not set');
}

if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error('CLOUDINARY_API_SECRET is not set');
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image) {
    const imageData = await image.arrayBuffer();
    const mime = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(imageData).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
    const result = await cloudinary.uploader.upload(fileUri, {
        folder: 'straight-up-portal',
    });
    return result.secure_url;
}

export async function uploadFilesToCloudinary(file) {
    try {
        const fileBuffer = await file.arrayBuffer()

        const mimetype = file.type
        const filename = file.name
        const encoding = "base64"
        const dataOfBase64 = Buffer.from(fileBuffer).toString("base64")

        const pdfUrl = "data:" + mimetype + ";" + encoding + "," + dataOfBase64;

        const result = await cloudinary.uploader.upload(
            pdfUrl,
            {
                resource_type: "raw",
                filename_override: filename,
                folder: "resources",
            }
        )

        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw new Error("PDF upload failed");
    }
}