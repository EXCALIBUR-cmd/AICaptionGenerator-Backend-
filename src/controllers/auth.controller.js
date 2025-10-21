const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
async function registerController(req,res){
    const {username,password} = req.body;
    const userAlreadyExists = await usermodel.findOne({username});
    if(userAlreadyExists){
        return res.status(400).json({message:"User already exists"});
    }
    const user = await usermodel.create({username,
        password: await bcrypt.hash(password,10)});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie("token",token);
return res.status(201).json({message:"User registered successfully",token});    
}
async function loginController(req,res){
    const {username,password} = req.body;
    const user = await usermodel.findOne({username});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid password"});
    }    
const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
res.cookie("token",token);
return res.status(200).json({message:"User logged in successfully",user:{username:user.username, id:user._id}});
    
}
module.exports = {
    registerController,
    loginController};
