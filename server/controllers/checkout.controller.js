import { Checkout } from "../models/checkout.model.js";
import {Cart} from '../models/cart.model.js'
import {product} from '../models/product.model.js'
import { Order } from "../models/order.model.js";



// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private

export const createCheckout = async(req , res)=>{

    const {checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body
    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(400).json({message:"No items in checkout"})
    }

    try{
        // Create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"Pending",
            isPaid: false
        })
        console.log(`Checkout create for user: ${req.user._id}`)
        res.status(201).json(newCheckout)
    }catch(err){
        console.error("Error creating during checkout session:",err)
        res.status(500).json({message: "Internal server Error"})
    }
}


// @route PUT/api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private

export const updateCheckout = async(req, res)=>{

    const {paymentStatus,paymentDetails}= req.body    
    try{

        const checkout = await Checkout.findById(req.params.id)
        if(!checkout){
            return res.status(404).json({message: "Checkout not found"})
        }
        if(paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus
            checkout.paymentDetails = paymentDetails
            checkout.paidAt = Date.now()
            await checkout.save()

            res.status(200).json(checkout);
        }else{
            res.status(400).json({messahe:" Invalid payment status"})
        }
    }catch(err){
        console.error(err)
        res.status(500).json({message: "internal server error"})
    }
}

// @route POST /api/checkout/:id/finilize
// @desc Finalize checkout and convert to an order after payment confermation
// @access Private

export const  finilizeCheckout = async (req, res)=>{
    try{
        const checkout = await Checkout.findById(req.params.id)

        if(!checkout){
            return res.status(400).json({message: "Checkout not found"})
        }
        if(checkout.isPaid && !checkout.isfinalize){
            // Create final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStats: "paid",
                paymentDetails: checkout.paymentDetails,

            })
            // Mark the checkout as finalized
            checkout.isfinalize =true
            checkout.finalizeAt= Date.now()
            await checkout.save()

            // Delete the cart associated with the user
            await Cart.findOneAndDelete({user : checkout.user})
            res.status(201).json(finalOrder)
        } else if( checkout.isfinalize){
            res.status(400).json({message: "Checkout already finalized"})
        }else{
            res.status(400).json({message: "Checkout is not paid"})
        }

    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server error"})
    }
}