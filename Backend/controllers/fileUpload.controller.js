import { uploadOnCloudinary } from "../utils/cloudinary.js";
import main from "../utils/indexing.js";

export const uploadFile = async (req, res, next) => {
  try {
    // Get the file path from the uploaded file
    if (!req.files || !req.files.source) {
      throw new Error('No file was uploaded or incorrect field name');
    }
    
    const file = req.files.source[0];
    console.log('Uploaded file:', file);
    
    // Index the file
    await main(file.path);
    // Upload to Cloudinary
    // const cloudinaryUrl = await uploadOnCloudinary(file.path);
    res.status(200).json({
      success: true,
      message: 'File uploaded and processed successfully',
      // fileUrl: cloudinaryUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const getUploadStatus = (req, res) => {
  // This is a placeholder for actual upload status checking
  res.status(200).json({
    success: true,
    message: 'Upload status endpoint',
  });
};
