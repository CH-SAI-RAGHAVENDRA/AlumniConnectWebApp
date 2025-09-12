import { Post } from "../models/postModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from 'cloudinary';

export const createPost=TryCatch(async(req,res)=>{
    const {post}=req.body;
    const file=req.file;
    const fileUrl=getDataUrl(file);
    const cloud=await cloudinary.v2.uploader.upload(fileUrl.content);
    await Post.create({
        post,
        image:{
            id:cloud.public_id,
            url:cloud.secure_url
        },
        owner:req.user._id,
    });
    res.json({
        message:"Post Created"
    });
});

export const getAllPosts=TryCatch(async(req,res)=>{
    const posts=await Post.find().sort({createdAt:-1});
    res.json(posts);
});

export const getSinglePost=TryCatch(async(req,res)=>{
    const post=await Post.findById(req.params.id).populate("owner","-password");
    res.json(post);
});

export const deletePost=TryCatch(async(req,res)=>{
    const post=await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(404).json({
            message:"No pin with this id"
        });
    }
    if(post.owner.toString()!==req.user._id.toString())
    {
        return res.status(403).json({
            message:"Unauthorised User",
        });
    }
    await cloudinary.v2.uploader.destroy(post.image.id);
    await post.deleteOne();
    res.json({
        message:"Post Deleted",
    });
});

export const commentOnPost=TryCatch(async(req,res)=>{
    const post=await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(400).json({
            message:"Post cannot be found"
        });
    }
    const {comment}=req.body;
    post.comments.push({
        user:req.user._id,
        comment
    });
    await post.save();
    res.json({
       message:"Commented Successfully"}
    );
});

export const deleteCommentOnPost=TryCatch(async(req,res)=>{
    const post=await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(404).json({
            message:"Post cannot be found"
        });
    }
    if(!req.query.commentId)
    {
        return res.status(400).json({
            message:'Please enter a commentId'
        });
    }
    const commentIndex=post.comments.findIndex((item)=>item._id.toString()===req.query.commentId.toString());
    if(commentIndex===-1)
    {
        return res.status(404).json({
            message:"Comment cannot be found"
        });
    }
    const comment=post.comments[commentIndex];
    if(comment.user.toString()===req.user._id.toString())
    {
        post.comments.splice(commentIndex,1);
        await post.save();
        return res.json({
            message:"Comment deleted Successfully"
        });
    }
    else
    {
        return res.status(403).json({
            message:"You are not the owner of this comment"
        });
    }
});

export const updatePost=TryCatch(async(req,res)=>{
    const post=await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(400).json({
            message:"No post with this id"
        });
    }
    if(post.owner.toString()!==req.user._id.toString())
    {
        return res.status(403).json({
            message:"Unauthorised"
        });
    }
    post.post=req.body.post;
    await post.save();
    res.json({
        message:"Post Updated"
    });
});



