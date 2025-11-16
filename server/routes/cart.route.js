import express from 'express'
import { checkoutCart, createCart, deleteCart, getUsersCart, updateCart } from '../controllers/cart.controller.js'
import protect from '../middleware/auth.middleware.js'


const router = express.Router()

// @route post /api/createCart
router.post("/",createCart)
// @route put /api/updateCart
router.put("/",updateCart)

// @route DELETE /api/cart
router.delete("/",deleteCart)

// @route Get /api/cart
router.get("/",getUsersCart)

router.post("/merge",protect,checkoutCart)
export default router