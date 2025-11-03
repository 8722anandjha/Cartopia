import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import connectDB from './dbs/db.js';



const app = express()              
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 7000 ;
// connect to MongoDB

connectDB()

app.get("/",(req,res)=>{
    res.send("Welcome to Cartopia API!!")

})

import userRoute from '../server/routes/user.route.js'
app.use("/api/users",userRoute);


import porductRoute from '../server/routes/product.route.js'
app.use("/api/products",porductRoute)

import cartRoute from './routes/cart.route.js';
app.use("/api/cart",cartRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})