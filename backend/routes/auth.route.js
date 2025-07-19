import express from "express"
import { createAccount, loginAccount, logoutAccount } from "../controllers/accountController.js"
import { upload } from "../middleware/multer.js"
import { validateCreateAccount } from "../utils/validateCreateAccount.js"
import { detailsValidate } from "../middleware/detailsValidate.js"
let authRouter = express.Router()

authRouter.post("/createaccount", upload.single("image"), validateCreateAccount, detailsValidate, createAccount)
authRouter.post("/login", loginAccount);
authRouter.post("/logout", logoutAccount);

export default authRouter;