import express from "express"
import { creditAmount, debitAmount, getLast7DaysTransactionsByUserId, loanAmount, transferMoney } from "../controllers/transactionController.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
let transactionRouter = express.Router()

transactionRouter.post("/credit", isAuthenticated, creditAmount);
transactionRouter.post("/debit", isAuthenticated, debitAmount);
transactionRouter.post("/takeloan", isAuthenticated, loanAmount);
transactionRouter.post("/transfer", isAuthenticated, transferMoney);
transactionRouter.get("/weektransaction/:userId", isAuthenticated, getLast7DaysTransactionsByUserId);

export default transactionRouter;