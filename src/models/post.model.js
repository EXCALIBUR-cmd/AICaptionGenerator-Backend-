const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    image:{type:String},
    caption:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    
    }
);
const postmodel = mongoose.model("Post", PostSchema);
module.exports = postmodel;
