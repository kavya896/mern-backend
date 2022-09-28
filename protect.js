const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler")
const Register = require("./models/register")

const jwtsecret = "kavyareddy"
const protect = async(req,res,next)=>{
 var token;
 if(
     req.headers.authorization &&
     req.headers.authorization.startsWith("Bearer")
 ){
    try{
        // console.log("token")
        token = req.headers.authorization.split(" ")[1];
        const  decoded = jwt.verify(token,jwtsecret)
        console.log(decoded)
        req.register = await Register.findById(decoded.id).select("-password");
        console.log(req.register)
        next();
    }catch(err){
        console.log(err)
    }
 }if(!token){
     console.log("not authorized, no token")
 }
 
}

module.exports = { protect }