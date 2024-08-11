const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const LoginModel = require("./models/Admin")

mongoose.connect("mongodb+srv://swathi:swathi2609@cluster0.em0miqo.mongodb.net/wayanad_rescue_db?retryWrites=true&w=majority&appName=Cluster0")

const app = express()
app.use(cors())
app.use(express.json())


app.post("/AdminSignUp",(req,res)=>{
    let input=req.body
    let hashedPassword = bcrypt.hashSync(input.password,10)
    input.password=hashedPassword
    console.log(input)
    let result = new LoginModel(input)
    result.save()
    res.json({"status":"success"})

})

app.post("/AdminSignIn",(req,res)=>{
    let input = req.body
    let result = LoginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator = bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"rescue-app",{expiresIn:"3d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status":"Invalid Authentication"})
                            } else {
                                res.json({"status":"success","token":token})
                            }
                        }
                    )
                } else {
                    res.json({"status":"Invalid Password"})
                }
            } else {
                res.json({"status":"Invalid Username"})
            }
        }   
    ).catch()
})

app.listen(8081,()=>{
    console.log("server started")
})
