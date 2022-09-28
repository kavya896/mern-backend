const express = require("express");
const Note = require("../models/notes.js");
const router = express.Router();
const {protect} = require("../protect.js")


router.post("/create",protect,async(req,res)=>{
    console.log("create note")
    console.log(req.register._id,"id")
    const {title, content} = req.body
    const createnote = new Note({title,content,register:req.register.id})
    const note = await createnote.save()
    if(note){
        res.send({"success":{
            title:note.title,
            content:note.content,
            register:note.register
    }})
    }else{
        res.send({"message":"check the entered details"})
    }
})


router.get("/",protect,async(req,res)=>{
    const register = req.register._id
    console.log("register",req.register)
    const notes = await Note.find({register})
    if(notes){
        console.log(notes)
        res.json(notes)
    }
})

router.get("/:id",protect,async(req,res)=>{
    try{
        console.log("get single note")
        const note = await Note.findById(req.params.id)
        console.log(note)
        if(note.register.toString()==req.register.id.toString()){
            
            res.json({note:note})
        }
    }catch(err){
        console.log(err)
    }
})

router.post("/update/:id",protect,async(req,res)=>{
    try{
        const { title, content} = req.body
        const note = await Note.findById(req.params.id)
        if(note.register.toString() == req.register.id.toString()){
        if(note){
            note.title = title
            note.content = content
    
            const result = await note.save()
            res.json({result})
        }
    }

    }catch(err){
        console.log(err)
    }
 
})

router.delete("/delete/:id",protect,async(req,res)=>{
    try{
        const note = await Note.findById(req.params.id)
        console.log(note.register,req.register.id)
        if(note.register.toString()===req.register.id.toString()){
            await note.remove()
            res.json({"message":"note deleted successfully"})
        }else{
            res.json({"message":"authentication failed"})
        }

    }catch(err){
        console.log(err)
    }
    

})

module.exports = router