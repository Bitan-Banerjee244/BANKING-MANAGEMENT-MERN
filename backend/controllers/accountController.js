import User from "../models/userAccount.models.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/token.js";
import { uploadImage } from "../utils/cloudinary.js";
import { generateAccountNumber } from "../utils/generateAccountNumber.js";

export const createAccount = async (req, res) => {
    try {
        let { fullName, email, phone, dob, address, gender, initialDeposit, pin } = req.body

        if (!fullName || !email || !phone || !dob || !address || !gender || !initialDeposit || !pin) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // Checking for duplicate Users
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Getting Image URL
        if (!req.file) return res.json({ message: "URL not found" })
        const imageURL = await uploadImage(req.file.path);
        if (!imageURL) {
            return res.status(500).json({ message: "Failed to upload image" });
        }

        // Generating Account Number
        let accountNumber = generateAccountNumber();
        // Hashing the PIN Via BcryptJS
        let hashPIN = await bcrypt.hash(pin, 10);

        // Creating the User 
        let user = await User.create({
            fullName, email, phone, dob, address, gender, initialDeposit, pin: hashPIN, photoUrl: imageURL, accountNumber
        })

        // Returning the response to frontend
        return res.status(201).json({
            success: true,
            message: "User Account Created Successfully !!",
            user: user
        })
    } catch (error) {
        console.log(`Creating new account error`, error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message // Optional, for debug
        });
    }
}


export const loginAccount = async (req, res) => {
    try {
        let { email, pin } = req.body

        // Checking If user Input all fields or not
        if (!email || !pin) {
            return res.status(400).json({
                success: false,
                message: "All fields are required !"
            })
        }

        // Checking if the user exits or not
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exists"
            })
        }

        // Checking their pin validation
        const isMatch = await bcrypt.compare(pin, user.pin);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid PIN"
            });
        }

        // Generating Token for cookies
        let token;
        token = await generateToken({ id: user._id });
        if (!token) {
            return res.status(500).json({ success: false, message: "Token generation failed" });
        }

        // Storing cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            user: {
                _id:user._id,
                fullName: user.fullName,
                email: user.email,
                accountNumber: user.accountNumber,
                photoUrl: user.photoUrl
            }
        });

    } catch (error) {
        console.log(`Login error`, error)
        return res.status(401).json({
            message: "Login error",
            error: error
        })
    }
}

export const logoutAccount = async (req, res) => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({
            message: "Logout Successful!!",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Logout Error",
            success: false
        })
    }
}