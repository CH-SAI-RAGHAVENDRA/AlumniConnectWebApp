import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuth=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token)
        {
            return res.status(400).json({
                message:"Please Login"
            });
        }
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);
        if(!decodedData)
            return res.status(400).json({
            message:"Token expired"
        });
        req.user=await User.findById(decodedData.id).select("-password");
        next();
    }
    catch(err)
    {
        res.status(400).json({
            message:"Please Login"
        });
    }
}
