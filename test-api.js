require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAPI() {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      console.error("❌ GEMINI_API_KEY not found in .env file");
      return;
    }
    
    console.log("✅ API Key found");
    console.log("Testing with gemini-pro-vision...");
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    // Simple text test first
    const result = await model.generateContent("Say hello");
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ API is working!");
    console.log("Response:", text);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    
    if (error.message.includes('401')) {
      console.error("This usually means your API key is invalid or expired.");
      console.error("Get a new one from: https://aistudio.google.com/app/apikey");
    } else if (error.message.includes('404')) {
      console.error("Model not found. Try a different model name.");
    }
  }
}

testAPI();