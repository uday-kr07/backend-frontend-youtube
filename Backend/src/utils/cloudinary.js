import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const removeLocalFile = (localFilePath) => {
    if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
    }
};

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const fixedPath = localFilePath.replace(/\\/g, "/");
        const response = await cloudinary.uploader.upload(fixedPath, {
            resource_type: "auto",
        });

        removeLocalFile(localFilePath);
        return response;
    } catch (error) {
        console.log("CLOUDINARY ERROR:", error.message);
        removeLocalFile(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary };
