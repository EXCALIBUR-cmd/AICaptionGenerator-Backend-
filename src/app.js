const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.routes");
const predictionRoutes = require("./routes/prediction.routes");
const cors = require("cors");

const app = express();

// Add CORS support
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/predict", predictionRoutes);

// Add a test endpoint to verify backend is working
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

module.exports = app;