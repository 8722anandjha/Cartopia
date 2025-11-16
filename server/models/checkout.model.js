import mongoose from 'mongoose'
import User from './user.model.js'
const checkoutItemSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "prodcut",
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        required: true,
    }, 
    quantity:{
        type: Number,
        required: true
    } 
},
{_id: false}
)

const checkoutSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required:true,
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress:{
        address: {type: String, required:true},
        city: {type: String, required:true},
        postalCode: {type: String, required:true},
        country: {type: String, required:true},
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice:{
        type: Number,
        required:true,
    },
    isPaid:{
        type: Boolean,
        default: false,
    },
    paidAt:{
        type:Date,
    },
    paymentStatus:{
        type: String,
        default: "Pending",
    },
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed, //store payment-related details(transation ID, paypal response)
    },
    isfinalize:{
        type:Boolean,
        default: false,
    },
    finalizeAt:{
        type: Date,
    },
},
{timestamps:true}
)

export const Checkout = mongoose.model("Checkout",checkoutSchema)
