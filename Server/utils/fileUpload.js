import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary.js";
import fs from "fs";

/**
 * Uploads a file to Cloudinary if configured, otherwise returns local URL path.
 * Deletes the local temp file if Cloudinary upload is successful.
 * @param {Object} file - Multer file object (req.file)
 * @param {string} folder - Folder name on Cloudinary
 * @returns {Promise<string>} - Public URL of the uploaded image
 */
export const uploadImage = async (file, folder = "tourism_platform") => {
  if (!file) return "";

  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folder,
        resource_type: "image",
      });
      // Delete temporary local file
      fs.unlink(file.path, (err) => {
        if (err)
          console.error(`Error deleting temp file ${file.path}:`, err.message);
      });
      return result.secure_url;
    } catch (error) {
      console.error(
        "Cloudinary upload failed, falling back to local file. Error:",
        error.message,
      );
      // Fallback to local if Cloudinary fails
    }
  }

  // Local fallback: return local serving path
  // Expected local path: /uploads/filename.ext
  return `/uploads/${file.filename}`;
};

/**
 * Uploads multiple files (req.files)
 * @param {Array} files - Array of Multer file objects
 * @param {string} folder - Folder name on Cloudinary
 * @returns {Promise<Array<string>>} - Array of image URLs
 */
export const uploadImages = async (files, folder = "tourism_platform") => {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map((file) => uploadImage(file, folder));
  return Promise.all(uploadPromises);
};
