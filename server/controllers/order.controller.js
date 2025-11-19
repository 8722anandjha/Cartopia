
import { Order }from '../models/order.model.js'


// @route GET /api/orders/my-orders
// @desc Get logged-in  user's orders
// @access Private

export const myOrders= async (req,res)=>{
    try{
        // Find orders for the authenticated user
        const orders = await Order.find({user:req.user._id}).sort({
            createdAt: -1,
        }) // sort by most recent orders
        res.json(orders)
    }catch(err){
        console.error(err)
        res.status(500).json({message: "Internal server Error "})
    }
}

// @router GET/ api/orders/:id
// @desc Get order details by ID
// @access Private

export const orderId = async(req,res)=>{
    try{
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )
        if(!order){
            return res.status(404).json({message: "Order not found"})
        }
        //Return the full order details
        res.json(order);

    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server Error"})
    }
}