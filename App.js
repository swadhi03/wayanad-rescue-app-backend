const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const LoginModel = require("./models/Admin")

mongoose.connect("mongodb+srv://swathi:swathi2609@cluster0.em0miqo.mongodb.net/wayanad_rescuedb?retryWrites=true&w=majority&appName=Cluster0")

const app = express()
app.use(cors())
app.use(express.json())


app.post("/AdminSignUp",(req,res)=>{
    let input=req.body
    let hashedPassword = bcrypt.hashSync(input.password,10)
    input.password=hashedPassword
    console.log(input)
    let result = new LoginModel
    result.save()
    res.json({"status":"success"})

})

app.listen(8081,()=>{
    console.log("server started")
})
