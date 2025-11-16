import mongoose from 'mongoose'
// import { product } from './product.model.js'
// import User from './user.model.js'

const CartItemSchema = new mongoose.Schema({   
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    name: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity:{
        type: Number,
        default: 1,
    }
},{
    _id: false
})

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    guestId:{
        type: String
    },
    products: [CartItemSchema],
    totalPrice:{
        type:Number,
        required: true,
        default:0,
    }
},{
    timestamps:true
})

export const Cart = new mongoose.model("Cart",cartSchema)