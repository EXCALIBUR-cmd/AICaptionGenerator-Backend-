const postmodel = require("../models/post.model");
const { generateCaption } = require('../service/ai.service');
const { uploadFile } = require('../service/storage.service');
const { v4: randomUUID } = require('uuid');

const createPostController = async (req, res) => {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Processing file:", file.originalname, file.size);
    
    // Upload file to ImageKit
    const image = await uploadFile(file.buffer, `${randomUUID()}`);
    
    console.log("File uploaded:", image.url);
    
    return res.status(200).json({ 
      message: "Post created successfully",
      imageUrl: image.url,
      fileId: image.fileId
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ 
      message: "Failed to create post", 
      error: error.message 
    });
  }
};

module.exports = { createPostController };
