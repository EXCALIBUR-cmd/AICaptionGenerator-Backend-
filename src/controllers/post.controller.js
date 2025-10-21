const postmodel = require("../models/post.model");
const { generateCaption } = require('../service/ai.service');
const uploadFile = require("../service/storage.service");
const { randomUUID } = require("crypto");
async function createPostController(req,res){
    const file = req.file;
    if(!file){
        return res.status(400).json({message:"No file uploaded"});
    }
    console.log("File received:", file);
    const base64ImageFile = Buffer.from(file.buffer).toString("base64");
    const caption = await generateCaption(base64ImageFile);
    const image = await uploadFile(file.buffer, `${randomUUID()}`);
    const post = await postmodel.create({caption:caption,image:image.url, user:req.user._id});
    return res.status(201).json({message:"Post created successfully",post});
    res.json({ caption, image });
     
}
module.exports = {createPostController}
