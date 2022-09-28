var express = require("express");
var app = express();
var router = require("./router/register.js")
var note = require("./router/note.js")
var mongoose = require("mongoose")
var cors = require("cors")


app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use("/",router)
app.use("/note",note)


// mongoose.connect("mongodb+srv://kavyareddy:kavyareddy@cluster0.msabz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(
//     ()=>{console.log("connection succeessfull")}
// )
mongoose.connect("mongodb+srv://kavyareddy:kavyareddy@cluster0.msabz.mongodb.net/FirstDatabase?retryWrites=true&w=majority").then(
    ()=>{
        console.log("connection successful")
    }
)
app.get("/",async(req,res)=>{
    res.send("hello world")
})
app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log("Listening at port 5000")
})
