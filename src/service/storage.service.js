const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadFile = async (fileBuffer, fileName) => {
  try {
    if (!fileBuffer) {
      throw new Error('No file buffer provided');
    }

    console.log('Uploading file to ImageKit:', fileName);
    
    const result = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: '/uploads'
    });

    console.log('✅ File uploaded successfully:', result.url);
    
    return {
      url: result.url,
      fileId: result.fileId,
      name: result.name
    };
  } catch (error) {
    console.error('❌ ImageKit upload error:', error.message);
    throw error;
  }
};

module.exports = { 
  imagekit, 
  uploadFile  // Make sure this is exported
};