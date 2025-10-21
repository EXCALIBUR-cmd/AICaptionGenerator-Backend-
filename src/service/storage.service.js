const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadImage = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    const result = await imagekit.upload({
      file: file.buffer, // Multer buffer
      fileName: file.originalname,
      folder: '/captions' // Optional: organize in folder
    });

    console.log('Image uploaded to ImageKit:', result.url);
    
    return {
      url: result.url,
      fileId: result.fileId,
      name: result.name
    };
  } catch (error) {
    console.error('ImageKit upload error:', error);
    throw error;
  }
};

module.exports = { imagekit, uploadImage };