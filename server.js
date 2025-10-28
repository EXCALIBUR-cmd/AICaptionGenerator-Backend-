require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = process.env.PORT || 3000;

// Connect to DB with timeout
connectDB().catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  // Don't exit - server can still run
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});