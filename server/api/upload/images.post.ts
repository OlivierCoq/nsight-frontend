import { defineEventHandler } from 'h3';
import { v2 as cloudinary } from 'cloudinary';
import multiparty from 'multiparty';
import fs from 'fs';

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

  let cloudinary_links = [];

// Function to upload a file to Cloudinary
const uploadToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, { folder: 'uploads' }, (error, result) => {
      if (error) {
        console.error('Cloudinary Upload Error:', error);
        return reject(error);
      }
      cloudinary_links.push(result);
      resolve(result);
    });
  });
};

export default defineEventHandler(async (event) => {

// console.log('Incoming headers:', event.node.req.headers);


  try {
    const form = new multiparty.Form();

    // Parse the incoming request for form-data
    const data = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    if (!data.files.files || data.files.files.length === 0) {
      console.warn('No files received in formData');
      return { statusCode: 400, message: 'No files received' };
    }

    console.log('Received files:', data.files.files.map((f) => f.originalFilename));

    // Upload to Cloudinary
    const uploadResults = await Promise.all(
      data.files.files.map((file) => uploadToCloudinary(file.path))
    );

    // Cleanup temporary files
    data.files.files.forEach((file) => fs.unlinkSync(file.path));

    return { statusCode: 200, message: 'Images uploaded successfully', data: uploadResults };
  } catch (error) {
    console.error('Upload failed:', error);
    return { statusCode: 500, message: 'Upload failed', error: error.message };
  }
});
