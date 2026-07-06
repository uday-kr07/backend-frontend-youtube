import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage,
    getUserChannelProfile, 
    getWatchHistory,
    deleteAccount 
    } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { optionalVerifyJWT, verifyJWT } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/delete-account").delete(verifyJWT, deleteAccount)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/coverImage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)// no patch in chaiorcode but i added!!
router.route("/c/:username").get(optionalVerifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)


export default router ;
