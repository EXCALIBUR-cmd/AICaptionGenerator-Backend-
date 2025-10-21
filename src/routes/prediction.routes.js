const express = require("express");
const router = express.Router();
const multer = require("multer");
const { generateCaption } = require("../service/ai.service");
const { uploadImage } = require("../service/storage.service");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    
    console.log("Processing image:", file.originalname, file.size);
    
    // Upload to ImageKit
    const imageData = await uploadImage(file);
    console.log("ImageKit URL:", imageData.url);
    
    // Convert to base64 for caption generation
    const base64ImageFile = Buffer.from(file.buffer).toString("base64");
    
    // Generate caption
    const caption = await generateCaption(base64ImageFile);
    
    return res.status(200).json({ 
      caption,
      imageUrl: imageData.url,  // Return ImageKit URL to frontend
      fileId: imageData.fileId
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return res.status(500).json({ message: "Failed to process image", error: error.message });
  }
});

module.exports = router;