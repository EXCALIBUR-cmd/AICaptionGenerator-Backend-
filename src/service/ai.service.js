const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;

const initializeAI = async () => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️  GEMINI_API_KEY not set');
      return null;
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅ Gemini AI initialized');
    return genAI;
  } catch (error) {
    console.error('❌ AI initialization error:', error.message);
    return null;
  }
};

// Initialize on first use, not on startup
const getAI = async () => {
  if (!genAI) {
    await initializeAI();
  }
  return genAI;
};

const generateCaption = async (base64Image) => {
  try {
    const ai = await getAI();
    if (!ai) {
      throw new Error('AI not initialized');
    }
    
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: 'image/jpeg'
        }
      },
      'Generate a short, descriptive caption for this image in one sentence.'
    ]);
    
    return result.response.text();
  } catch (error) {
    console.error('❌ Caption generation error:', error.message);
    throw error;
  }
};

module.exports = { generateCaption };