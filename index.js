const express = require("express");
require("dotenv").config();
const {UserRouter} = require("./Routes/UserRoute")
const {CartRouter} = require("./Routes/CartRouter")
const {ProductRouter} = require("./Routes/ProductRoute")
const {connection} = require("./config/db")

const app = express();

app.use(express.json());
app.use("/users",UserRouter)
app.use("/products",ProductRouter)
app.use("/cart",CartRouter);


app.get("/",(req,res)=>{
    res.send("home page")
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("started the server");
    } catch (error) {
        console.log(error.message)
    }
    
})