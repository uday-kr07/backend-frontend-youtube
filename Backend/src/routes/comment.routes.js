import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import {optionalVerifyJWT, verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/:videoId").get(optionalVerifyJWT, getVideoComments).post(verifyJWT, addComment);
router.route("/c/:commentId").delete(verifyJWT, deleteComment).patch(verifyJWT, updateComment);

export default router
