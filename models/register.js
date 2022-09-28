const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    image:{
        type:String
    }
    
})

const Register = mongoose.model("Register",registerSchema)

module.exports = Register;