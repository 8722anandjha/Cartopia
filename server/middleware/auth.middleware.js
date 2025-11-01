import jwt from 'jsonwebtoken'
import user from '../../server/models/user.schema.js'

// Middleware to protect routes

const protect = async (req ,res,next)=>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)

            req.user = await user.findById(decoded.user._id).select("-password") //Exclude password
            next()
        }catch(err) {
            console.error("Token verification failed:",err)
            res.status(401).json({message:"Not authorised, token failed"})
        }
    }else{
        res.status(401).json({message:"Not authorised, no token provided"})
    }
}
// Middleware to check if the user is an admin
export const admin = (req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        res.status(403).json({message:"Not authorised as an admin"})
    }
}

export default protect