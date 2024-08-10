const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const app = express()
app.use(cors())
app.use(express.json())

