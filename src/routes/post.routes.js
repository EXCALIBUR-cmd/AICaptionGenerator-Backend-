const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth.middleware");
const { createPostController } = require("../controllers/post.controller");
const multer = require("multer");
const router = express.Router();
const upload = multer({
    storage:multer.memoryStorage()
        
})
router.post("/",authMiddleware, 
    upload.single("image"),
    createPostController)

module.exports = router;
