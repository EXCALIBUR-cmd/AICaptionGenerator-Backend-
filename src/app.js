const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Import routes
const predictionRoutes = require("./routes/prediction.routes");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Image Caption Generator API is running!",
    version: "1.0.0",
    endpoints: {
      health: "/test",
      predict: "POST /predict"
    }
  });
});

// Health check
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Register routes
app.use("/predict", predictionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;