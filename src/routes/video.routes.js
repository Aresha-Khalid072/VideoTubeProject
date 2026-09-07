import { Router } from "express"
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo
} from "../controllers/video.controller.js"
import { verifyJWT, verifyJWTOptional } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

// public (guests can browse and watch) but still detect a logged-in user when present
router.route("/").get(verifyJWTOptional, getAllVideos)
router.route("/:videoId").get(verifyJWTOptional, getVideoById)

// everything below requires login
router.route("/").post(
    verifyJWT,
    upload.fields([
        { name: "videoFile", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    publishAVideo
)

router
    .route("/:videoId")
    .delete(verifyJWT, deleteVideo)
    .patch(verifyJWT, upload.single("thumbnail"), updateVideo)

router.route("/toggle/publish/:videoId").patch(verifyJWT, togglePublishStatus)

export default router
