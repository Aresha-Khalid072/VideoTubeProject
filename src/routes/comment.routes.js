import { Router } from "express"
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment
} from "../controllers/comment.controller.js"
import { verifyJWT, verifyJWTOptional } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/:videoId").get(verifyJWTOptional, getVideoComments)
router.route("/:videoId").post(verifyJWT, addComment)
router.route("/c/:commentId").patch(verifyJWT, updateComment).delete(verifyJWT, deleteComment)

export default router
