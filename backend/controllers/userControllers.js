import {User} from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';
import TryCatch from '../utils/TryCatch.js'
import bcrypt from 'bcrypt'

export const registerUser=TryCatch(async(req,res)=>{
    const {name,email,rollNumber,role,batch,password,department,currentEmploymentStatus}=req.body;
    let user=User.findOne({email});
    if(user)
        res.status(400).json({
        message:"User with the same email exists"
    });
    const hashPassword=await bcrypt.hash(password,10);
    user=await User.create({
        name,email,rollNumber,role,batch,password:hashPassword,department,currentEmploymentStatus
    });
    generateToken(user._id,res);
    res.status(200).json({
        message:"Registered Successfully"
    });
});

export const loginUser=TryCatch(async(req,res,next)=>{
    const {email,password}=req.body;
    let user=User.findOne({email});
    if(!user)
    {
        res.status(400).json({
            message:"No user with this mail"
        });
    }
    const comparePassword=await bcrypt.compare(password,user.password);
    if(!comparePassword)
    {
        res.status(400).json({
            message:"Wrong Password, Please Try Again"
        });
    }
    const {password:pass,...rest}=user._doc;
    generateToken(user._id,res);
    res.status(200).json({
        user:rest,
        message:"Login Successful"
    });
});
