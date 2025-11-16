import express from 'express'
import { createCheckout, finilizeCheckout, updateCheckout } from '../controllers/checkout.controller.js'
import protect from '../middleware/auth.middleware.js'


const router = express.Router()

// @route POST /api/checkout
router.post("/",protect,createCheckout)

router.put("/:id/pay",protect,updateCheckout)

router.post("/:id/finalize",protect,finilizeCheckout)
export default router