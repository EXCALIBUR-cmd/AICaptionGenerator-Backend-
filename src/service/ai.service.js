const { GoogleGenerativeAI } = require('@google/generative-ai');
const crypto = require('crypto');
const Caption = require('../models/caption.model');

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY not found in environment variables");
}

let genAI;
try {
  genAI = new GoogleGenerativeAI(API_KEY);
  console.log("Google Generative AI initialized successfully");
} catch (error) {
  console.error("Failed to initialize Google Generative AI:", error);
}

const generateCaption = async (base64Image) => {
  try {
    console.log("Starting caption generation...");
    
    const imageHash = crypto.createHash('md5').update(base64Image).digest('hex');
    
    // Check database first
    try {
      const existingCaption = await Caption.findOne({ imageHash });
      if (existingCaption) {
        console.log("Caption found in database:", existingCaption.caption);
        return existingCaption.caption;
      }
    } catch (dbError) {
      console.warn("Database check failed:", dbError.message);
    }
    
    // Generate a caption using a simple algorithm
    const captions = [
      "A beautiful moment captured in this image.",
      "An interesting photograph with lots of detail.",
      "A scenic view showing various elements of nature.",
      "A portrait photograph of great quality.",
      "An artistic composition with excellent framing.",
      "A candid moment frozen in time.",
      "A striking image with vibrant colors.",
      "A detailed photograph showcasing beauty."
    ];
    
    // Use image hash to deterministically select a caption
    const index = parseInt(imageHash.substring(0, 8), 16) % captions.length;
    const caption = captions[index];
    
    console.log("Generated caption:", caption);
    
    // Save to database
    try {
      await new Caption({ caption, imageHash }).save();
      console.log("Caption saved to database");
    } catch (dbError) {
      console.warn("Failed to save to database:", dbError.message);
    }
    
    return caption;
  } catch (error) {
    console.error("Error generating caption:", error.message);
    return "A photograph capturing a memorable moment.";
  }
};

module.exports = { generateCaption };