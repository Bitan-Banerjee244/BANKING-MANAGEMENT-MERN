import express from "express"
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./db/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import transactionRouter from "./routes/transaction.route.js";

const app = express()
let port = process.env.PORT || 8000;

// Middle Wares
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))


// Routes
app.use("/api/v2", authRouter)
app.use("/api/v2", userRouter)
app.use("/api/v2", transactionRouter)


app.listen(port, () => {
    console.log(`Server started at port ${port}`)
    connectDB();
})