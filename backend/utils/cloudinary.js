import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

export const uploadImage = async (localFilePath) => {
    // Configure the cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


    try {
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder: "bankProfilePictures",
            resource_type: "image",
        });

        // console.log("✅ Upload success:", uploadResult.secure_url);
        // console.log(localFilePath)
        await fs.unlinkSync(localFilePath);
        return uploadResult.secure_url;
    } catch (error) {
        console.error("❌ Upload failed:", error.message);
        await fs.unlinkSync(localFilePath);
        return null;
    }
}
