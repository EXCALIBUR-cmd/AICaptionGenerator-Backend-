const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// CORS configuration - Allow requests from frontend
const corsOptions = {
  origin: [
    'http://localhost:3001',           // Local development
    'http://localhost:3000',           // Local testing
    'https://your-frontend-url.vercel.app', // Production frontend URL (update this)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import routes
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const predictionRoutes = require("./routes/prediction.routes");

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/predict", predictionRoutes);

// Health check endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

module.exports = app;