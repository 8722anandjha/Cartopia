import express from 'express'
import { createCart } from '../controllers/cart.controller.js'


const router = express.Router()

router.post("/",createCart)


export default router