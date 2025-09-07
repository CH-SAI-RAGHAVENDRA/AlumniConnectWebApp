import express from 'express';
import dotenv from 'dotenv'
import connectDb from './database/db.js';
import cookieParser from 'cookie-parser';
const app=express();

dotenv.config();
connectDb();
app.use(express.json());
app.use(cookieParser());
const port=process.env.PORT;
app.get("/",(req,res)=>{
    res.send("Hello");
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
