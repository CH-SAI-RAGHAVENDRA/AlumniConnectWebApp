import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';
import { commentOnPost, createPost, deleteCommentOnPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/postControllers.js';

const router=express.Router();

router.post("/create",isAuth,uploadFile,createPost);
router.get("/all",isAuth,getAllPosts);
router.get("/:id",isAuth,getSinglePost);
router.put("/:id",isAuth,updatePost);
router.delete("/:id",isAuth,deletePost);
router.post("/comment/:id",isAuth,commentOnPost);
router.delete("/comment/:id",isAuth,deleteCommentOnPost);
export default router;