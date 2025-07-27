// models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["credit", "debit", "loan", "transfer"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: [0, "Amount cannot be negative"],
        },
        fromAccount: {
            type: String,
            required: function () {
                return this.type === "debit" || this.type === "transfer";
            },
        },
        toAccount: {
            type: String,
            required: function () {
                return this.type === "credit" || this.type === "transfer" || this.type === "loan";
            },
        },
        description: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["success", "pending", "failed"],
            default: "pending",
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
