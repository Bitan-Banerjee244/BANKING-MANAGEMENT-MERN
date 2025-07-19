import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getCurrentUser } from "../controllers/userController.js"
const userRouter = express.Router()

userRouter.get("/getcurrentuser",isAuthenticated,getCurrentUser)

export default userRouter