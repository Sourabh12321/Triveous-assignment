const express = require("express");
require("dotenv").config();
const {UserRouter} = require("./Routes/UserRoute")
const {CartRouter} = require("./Routes/CartRouter")
const {ProductRouter} = require("./Routes/ProductRoute")
const {OrderRouter} = require("./Routes/OrderRouter")
const {connection} = require("./config/db")
const swaggerUi = require("swagger-ui-express")

const app = express();

const specs = require("./swagger");


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

app.use("/users",UserRouter)
app.use("/products",ProductRouter)
app.use("/carts",CartRouter);
app.use("/orders",OrderRouter)


app.get("/",(req,res)=>{
    res.send("Triveous home page")
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("started the server");
    } catch (error) {
        console.log(error.message)
    }
    
})