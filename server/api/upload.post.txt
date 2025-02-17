import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';

cloudinary.config({
  secure: true
});

let results = [] as any[];

export default defineEventHandler(async (event) => {
  const form = new IncomingForm({
    keepExtensions: true,
    multiples: true
  });

  return new Promise((resolve) => {
    form.parse(event.req, async (err, fields, files) => {
      // Log the error but continue processing to return Cloudinary results
      if (err) {
        console.error('Form parse error', err);
      }

      console.log('Files:', files);

      // Check if files are present
      const fileArray = files['pics[]'] ? (Array.isArray(files['pics[]']) ? files['pics[]'] : [files['pics[]']]) : [];
      if (!fileArray || fileArray.length === 0 || !fileArray[0]) {
        console.log('No files found in request');
      }

      const uploadPromises = fileArray.map(async (file: any) => {
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: true
        };

        try {
          const result = await cloudinary.uploader.upload(file.filepath, options);
          console.log('Cloudinary upload result', result);
          results.push(result);
          return {
            status: 'success',
            result
          };
        } catch (error) {
          console.error('Cloudinary upload error', error);
          return {
            status: 'error',
            error
          };
        }
      });

      const uploadResults = await Promise.all(uploadPromises);
      resolve({
        status: 'success',
        message: 'Files processed',
        data: uploadResults,
        results
      });
    });
  });
});