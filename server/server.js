import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import connectDB from './dbs/db.js';
import userRoute from '../server/routes/user.route.js'
import porductRoute from '../server/routes/product.route.js'

const app = express()              
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 7000 ;
// connect to MongoDB

connectDB()

app.get("/",(req,res)=>{
    res.send("Welcome to Cartopia API!!")

})

app.use("/api/users",userRoute);

app.use("/api/products",porductRoute)
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})