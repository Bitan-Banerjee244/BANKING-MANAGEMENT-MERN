import Transaction from "../models/transaction.model.js";
import User from "../models/userAccount.models.js";
import bcrypt from "bcryptjs"

export const creditAmount = async (req, res) => {
    try {
        let { amount, toAccount, description, timestamp, pin } = req.body;

        if (!amount || !toAccount || !pin) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: "Amount must be greater than 0" });
        }

        const user = await User.findOne({ accountNumber: toAccount });
        if (!user) {
            return res.status(404).json({ error: "Recipient account not found" });
        }

        const isValidPin = await bcrypt.compare(pin, user.pin);
        if (!isValidPin) {
            return res.status(401).json({ error: "Incorrect PIN" });
        }

        const newTransaction = new Transaction({
            type: "credit",
            amount,
            toAccount,
            description,
            timestamp: timestamp || Date.now(),
            status: "success",
        });

        user.balance += amount;
        await user.save()

        const savedTransaction = await newTransaction.save();
        return res.status(201).json({
            message: "Amount credited successfully",
            transaction: savedTransaction,
            updatedBalance: user.balance,
        });
    } catch (error) {
        console.error("Error crediting amount:", error);
        res.status(500).json({ error: "Server error during credit operation" });
    }
}

export const debitAmount = async (req, res) => {
    try {
        let { amount, fromAccount, description, timestamp, pin } = req.body;
        if (!amount || !fromAccount || !pin) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: "Amount must be greater than 0" });
        }

        const user = await User.findOne({ accountNumber: fromAccount });
        if (!user) {
            return res.status(404).json({ error: "Sender account not found" });
        }

        const isValidPin = await bcrypt.compare(pin, user.pin);
        if (!isValidPin) {
            return res.status(401).json({ error: "Incorrect PIN" });
        }
        if ((user.balance - 500) < amount) {
            return res.status(400).json({ error: "Insufficient balance. Minimum ₹500 must be maintained." });
        }
        user.balance -= amount;
        await user.save();
        const newTransaction = new Transaction({
            type: "debit",
            amount,
            fromAccount,
            description,
            timestamp: timestamp || Date.now(),
            status: "success",
        });
        const savedTransaction = await newTransaction.save();

        return res.status(201).json({
            message: "Amount debited successfully",
            transaction: savedTransaction,
            updatedBalance: user.balance,
        });
    } catch (error) {
        console.error("Error debiting amount:", error);
        res.status(500).json({ error: "Server error during debit operation" });
    }
}

export const loanAmount = async (req, res) => {
    try {
        let { amount, toAccount, description, timestamp, pin } = req.body;

        if (!amount || !toAccount || !pin) {
            return res.status(400).json({ error: "Missing required fields" });
        }


        if (amount <= 0) {
            return res.status(400).json({ error: "Loan amount must be greater than 0" });
        }

        const user = await User.findOne({ accountNumber: toAccount });
        if (!user) {
            return res.status(404).json({ error: "User account not found" });
        }



        const isValidPin = await bcrypt.compare(pin, user.pin);
        if (!isValidPin) {
            return res.status(401).json({ error: "Incorrect PIN" });
        }

        user.balance += amount;
        await user.save();

        const newTransaction = new Transaction({
            type: "loan",
            amount,
            toAccount,
            description: description || "Loan credited",
            timestamp: timestamp || Date.now(),
            status: "success",
        });

        const savedTransaction = await newTransaction.save();

        return res.status(201).json({
            message: "Loan amount credited successfully",
            transaction: savedTransaction,
            updatedBalance: user.balance,
        });


    } catch (error) {
        console.error("Error processing loan:", error);
        res.status(500).json({ error: "Server error during loan operation" });
    }
}

export const transferMoney = async (req, res) => {
    try {
        let { amount, toAccount, fromAccount, description, timestamp, pin } = req.body;

        if (!amount || !fromAccount || !toAccount || !pin) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: "Transfer amount must be greater than 0" });
        }

        const sender = await User.findOne({ accountNumber: fromAccount });
        if (!sender) {
            return res.status(404).json({ error: "Sender account not found" });
        }

        const receiver = await User.findOne({ accountNumber: toAccount });
        if (!receiver) {
            return res.status(404).json({ error: "Receiver account not found" });
        }

        const isValidPin = await bcrypt.compare(pin, sender.pin);
        if (!isValidPin) {
            return res.status(401).json({ error: "Incorrect PIN" });
        }

        if ((sender.balance - 500) < amount) {
            return res.status(400).json({
                error: "Insufficient balance. Minimum ₹500 must be maintained.",
            });
        }

        // Perform balance update
        sender.balance -= amount;
        receiver.balance += amount;
        await sender.save();
        await receiver.save();

        // Create transaction
        const newTransaction = new Transaction({
            type: "transfer",
            amount,
            toAccount,
            fromAccount,
            description: description || "Amount transferred",
            timestamp: timestamp || new Date(),
            status: "success",
        });

        const savedTransaction = await newTransaction.save();

        return res.status(201).json({
            message: "Amount transferred successfully",
            transaction: savedTransaction,
            updatedBalance: sender.balance,
        });

    } catch (error) {
        console.error("Error transferring money:", error);
        res.status(500).json({ error: "Server error during transfer operation" });
    }
};


export const getLast7DaysTransactionsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const accountNumber = user.accountNumber;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Step 3: Find transactions where this user is involved
        const transactions = await Transaction.find({
            $or: [
                { fromAccount: accountNumber },
                { toAccount: accountNumber },
            ],
            timestamp: { $gte: sevenDaysAgo },
        }).sort({ timestamp: -1 });

        return res.status(200).json({
            message: "Fetched last 7 days' transactions successfully",
            total: transactions.length,
            transactions,
        });

    } catch (error) {
        console.error("Error fetching 7-day transactions:", error);
        res.status(500).json({ error: "Server error" });
    }
};