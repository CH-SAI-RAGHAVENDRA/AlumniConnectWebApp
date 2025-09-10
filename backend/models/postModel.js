import mongoose from 'mongoose';

const postSchema=new mongoose.Schema({
    post:{
        type:String,
        required:true,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image:{
        id:String,
        url:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User" 
            },
            comment:{
                type:String,
                required:true
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ],
    mentions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},{
    timestamps:true
});

export const Post=mongoose.model("Post",postSchema);