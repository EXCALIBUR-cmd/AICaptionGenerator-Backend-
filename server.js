require("dotenv").config();
console.log("Environment variables loaded:");
console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});