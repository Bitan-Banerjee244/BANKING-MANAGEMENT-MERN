import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    address: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'], default: "Male" },
    photoUrl: { type: String },
    initialDeposit: { type: Number, required: true },
    pin: { type: String, required: true },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: function () {
            return this.initialDeposit; 
        },
        min: [0, "Balance cannot be negative"],
    },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
export default User;
