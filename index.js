const express = require("express");
require("dotenv").config();

const app = express();
app.get("/",(req,res)=>{
    res.send("home page")
})

app.listen(process.env.PORT,async()=>{
    try {
        // await connection
        console.log("started the server");
    } catch (error) {
        console.log(error.message)
    }
    
})