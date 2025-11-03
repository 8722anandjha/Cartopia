import mongoose from "mongoose";
import dotenve from 'dotenv'
import User from "./models/user.model.js";
import { product } from "./models/product.model.js";
import {products} from "./products.js";
import { Cart } from "./models/cart.model.js";

dotenve.config();

// connect to mongoDB

mongoose.connect(process.env.MONGODB_URI)

// Function to seed data

const seedData = async ()=>{
   try{
     // clear existing data
    await product.deleteMany()
    await User.deleteMany()
    await Cart.deleteMany()

    // create a default admin user
     const createUser = await User.create({
        name: "Anand jha",
        email:"jhaa778245@gmail.com",
        password: "987456321",
        role:"admin"
    })

    // Assign the default User ID to each product
    const UserID = createUser._id

    const sampleProdcuts = products.map((product)=> ({...product,user: UserID})
    )

    // Insert the prodcuts into the database

    await product.insertMany(sampleProdcuts)
    console.log("Product data seeded successfully")
    process.exit()

   }catch(err){
    console.error("Error while seeding the data ",err)
    process.exit(1)
   }
}

seedData()