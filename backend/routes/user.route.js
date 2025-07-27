import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getCurrentUser, updateProfile } from "../controllers/userController.js"
import { upload } from "../middleware/multer.js"
const userRouter = express.Router()

userRouter.get("/getcurrentuser",isAuthenticated,getCurrentUser)
userRouter.put("/updateuser",isAuthenticated,upload.single("photo"),updateProfile)

export default userRouter