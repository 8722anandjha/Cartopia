import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

const app = express()              
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT ;
app.get("/",(req,res)=>{
    res.send("Welcome to Cartopia API!!")

})
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})