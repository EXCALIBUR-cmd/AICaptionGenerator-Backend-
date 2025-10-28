const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ Add this FIRST - before all other middleware
app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://peaceful-semolina-e0d6c3.netlify.app/', 
    'https://aicaptiongenerator-backend-duoy.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ ROOT ROUTE - Must be BEFORE other routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Image Caption Generator API is running!",
    version: "1.0.0",
    status: "✅ Backend is active"
  });
});

// HEALTH CHECK
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Import routes
const predictionRoutes = require("./routes/prediction.routes");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

// Register API routes
app.use("/predict", predictionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// 404 Handler - Must be LAST
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.path });
});

module.exports = app;