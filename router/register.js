var express = require("express")
const jwt = require("jsonwebtoken")
var router = express.Router()
var Register = require("../models/register.js")
var gt = require("../genereateToken.js")


router.get("/users",async(req,res)=>{
    try{
        const data = await Register.find({})
        if(data){
            res.json(data)
        }
    }catch(err){
        console.log(err)
    }
})


router.post("/register",async(req,res)=>{
    try{
        const {email, password, cpassword, image } = req.body;
        const exists = await Register.findOne({email})
        if(exists){
            res.send({"message":"email already exists"})
        }else{
        if(req.body.password === req.body.cpassword){
            const user = await Register.create({email, password,cpassword,image})
            if(user){
                res.send({"success":
                {_id: user._id,
                email:user.email,
                image:user.image,
                token:gt(user._id)
                }
    })
                
                }
        }else{
            res.send({"error":"password and confirm password doesnot match"})
        }
        
           }
    }catch(err){
        console.log(err)
    }
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)
    const user = await Register.find({email})

    if(user){
        if(user[0].password==req.body.password){
            res.send({"success":{
                _id: user[0]._id,
                email:user[0].email,
                image:user[0].image,
                token:gt(user[0]._id)}})
      
        }else{
            res.send({"message":"enter valid credentials"})
        }
    }

})



module.exports = router