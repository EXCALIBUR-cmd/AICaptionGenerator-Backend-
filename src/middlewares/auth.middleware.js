const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");
async function authMiddleware(req, res, next){
    const token = req.cookies && req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized, please login"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findOne({ _id: decoded.id });
        if(!user){
            return res.status(401).json({message:"Unauthorized, user not found"});
        }
        req.user = user;
        return next();
    } catch(err){
        return res.status(401).json({message:"Invalid token, please login"});
    }
}
module.exports = authMiddleware;
