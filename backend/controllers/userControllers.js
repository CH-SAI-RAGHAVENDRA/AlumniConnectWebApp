import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';
import TryCatch from '../utils/TryCatch.js'
import bcrypt from 'bcrypt'

export const registerUser=TryCatch(async(req,res)=>{
    const {name,email,rollNumber,role,batch,password,department,currentEmploymentStatus}=req.body;
    let user=await User.findOne({email});
    if(user)
        return res.status(400).json({
        message:"User with the same email exists"
    });
    const hashPassword=await bcrypt.hash(password,10);
    user=await User.create({
        name,email,rollNumber,role,batch,password:hashPassword,department,currentEmploymentStatus
    });
    console.log(!user);
    const token = generateToken(user._id,res);
    res.status(200).json({
        message:"Registered Successfully",
        token : token
    });
    return res;
});

export const loginUser=TryCatch(async(req,res,next)=>{
    const {email,password}=req.body;
    let user=await User.findOne({email});
    console.log(req.body);
    if(!user)
    {
        return res.status(400).json({
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
    const token = generateToken(user._id,res);
    res.status(200).json({
        user:rest,
        message:"Login Successful",
        token : token
    });
    console.log(res.status);
    return res;
});

export const myProfile=TryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id).select("-password").lean();
    res.json(user);
});

export const userProfile=TryCatch(async(req,res)=>{
    const user=await User.findById(req.params.id).select("-password");
    res.json(user);
});

export const followAndUnfollowUser=TryCatch(async(req,res)=>{
    const user=await User.findById(req.params.id).select("-password");
    const loggedUser=await User.findById(req.user._id).select("-password");
    if(!user)
    {
        return res.status(400).json({
            message:"Cannot find the user mentioned"
        });
    }
    if(loggedUser._id.toString()===user._id.toString())
    {
        return res.status(400).json({
            message:"You cannot follow yourself"
        });
    }
    if(user.followers.includes(loggedUser._id))
    {
        let followingIndex=loggedUser.following.indexOf(user._id);
        let followerIndex=user.followers.indexOf(loggedUser._id);
        loggedUser.following.splice(followingIndex,1);
        user.followers.splice(followerIndex,1);
        await loggedUser.save();
        await user.save();
        res.json({
            message:"User Unfollowed"
        });
    }
    else
    {
        loggedUser.following.push(user._id);
        user.followers.push(loggedUser._id);
        await loggedUser.save();
        await user.save();
        res.json({
            message:"User Followed"
        });
    }
});

export const logoutUser=TryCatch(async(req,res)=>{
    res.cookie("token","",{maxAge:0});
    res.json({
        message:"Logged Out Successfully"
    });
});

