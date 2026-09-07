import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

// Attaches req.user if a valid token is present, but never blocks the request
// when there isn't one. Use this for routes that should work for guests too
// (e.g. browsing videos) but still want to know who's logged in when possible.
export const verifyJWTOptional = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) return next()

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
        if (user) req.user = user
        next()
    } catch (error) {
        next()
    }
}

export const verifyJWT=asyncHandler(async(req,res, next )=>{
try {
    
     const token =   req.cookies?.accessToken || req.header("Authorization") ?.replace("Bearer ", "")

 if (!token){
    throw new ApiError (401,"Unauthorized request")
 }


const decodeToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)


const user=await User.findById(decodeToken?._id).select("-password -refreshToken")
 if(!user){
    throw new ApiError(401,"Invalid Access Token")
 }

 req.user =user;
 next()
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid access Token")
    
}
}
)