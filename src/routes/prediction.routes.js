const express = require("express");
const router = express.Router();
const multer = require("multer");
const { generateCaption } = require("../service/ai.service");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /predict - Main endpoint
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("✅ Prediction route hit");
    
    const file = req.file;
    if (!file) {
      console.log("❌ No file received");
      return res.status(400).json({ message: "No image uploaded" });
    }
    
    console.log("Processing image:", file.originalname, file.size);
    
    // Convert to base64
    const base64ImageFile = Buffer.from(file.buffer).toString("base64");
    
    // Generate caption
    const caption = await generateCaption(base64ImageFile);
    
    console.log("✅ Sending caption to frontend:", caption);
    
    return res.status(200).json({ caption });
  } catch (error) {
    console.error("❌ Error processing image:", error.message);
    return res.status(500).json({ 
      message: "Failed to generate caption", 
      error: error.message 
    });
  }
});

module.exports = router;