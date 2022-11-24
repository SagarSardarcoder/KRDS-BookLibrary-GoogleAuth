const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors"); 
const route = require("./Routes/route.js")
require("dotenv").config()
const PORT = process.env.PORT_Number 

const passport = require('passport');
const session = require('express-session')
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.DB_URL)
.then(()=>{ 
    console.log("data base is connected")
})
.catch(error => console.log(error.message)) 


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())


 app.use("/api", route)

app.listen(PORT || 3000,()=>{
    console.log(`server running on ${PORT}`)
})