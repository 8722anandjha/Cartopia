
import express from 'express'
import protect from '../middleware/auth.middleware.js'
import { myOrders, orderId } from '../controllers/order.controller.js';

const router = express.Router();

router.get("/my-orders",protect,myOrders)
router.get("/:id",protect,orderId)

export default router;