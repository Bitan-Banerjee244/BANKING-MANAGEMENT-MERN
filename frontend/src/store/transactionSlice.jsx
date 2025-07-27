import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    weeklyData: [],
    totalCredit: 0,
    totalDebit: 0,
    onlyCredit: 0,
    onlyDebit: 0,
    onlyLoan: 0,
    onlyTransfer: 0,
    totalSum: 0,
    weeklyCreditArray: Array(7).fill(0),
    weeklyDebitArray: Array(7).fill(0),
    last7CreditArray: [],
    last7DebitArray: [],
  },
  reducers: {
    setWeeklyData: (state, action) => {
      const { data = [], accountNumber } = action.payload;

      // Reset state
      state.weeklyData = data;
      state.totalCredit = 0;
      state.totalDebit = 0;
      state.onlyCredit = 0;
      state.onlyDebit = 0;
      state.onlyLoan = 0;
      state.onlyTransfer = 0;
      state.totalSum = 0;
      state.weeklyCreditArray = Array(7).fill(0);
      state.weeklyDebitArray = Array(7).fill(0);
      state.last7CreditArray = [];
      state.last7DebitArray = [];

      const creditTxs = [];
      const debitTxs = [];

      data.forEach((tx) => {
        const amount = Number(tx.amount || 0);
        const type = tx?.type?.toLowerCase();
        const date = new Date(tx.timestamp);
        const dayIndex = date.getDay(); 

        if (type === "credit") {
          state.totalCredit += amount;
          state.onlyCredit += amount;
          state.weeklyCreditArray[dayIndex] += amount;
          creditTxs.push({ amount, timestamp: tx.timestamp });
        } 
        
        else if (type === "loan") {
          state.totalCredit += amount;
          state.onlyLoan += amount;
          state.weeklyCreditArray[dayIndex] += amount;
          creditTxs.push({ amount, timestamp: tx.timestamp });
        } 
        
        else if (type === "debit") {
          state.totalDebit += amount;
          state.onlyDebit += amount;
          state.weeklyDebitArray[dayIndex] += amount;
          debitTxs.push({ amount, timestamp: tx.timestamp });
        } 
        
        else if (type === "transfer") {
          if (tx.fromAccount === accountNumber) {
            // Outgoing transfer (debit)
            state.totalDebit += amount;
            state.onlyTransfer += amount;
            state.weeklyDebitArray[dayIndex] += amount;
            debitTxs.push({ amount, timestamp: tx.timestamp });
          } else {
            // Incoming transfer (credit)
            state.totalCredit += amount;
            state.onlyCredit += amount;
            state.weeklyCreditArray[dayIndex] += amount;
            creditTxs.push({ amount, timestamp: tx.timestamp });
          }
        }

        // Add to totalSum if relevant
        if (
          (type === "transfer" && (tx.fromAccount === accountNumber || tx.toAccount === accountNumber)) ||
          ["credit", "debit", "loan"].includes(type)
        ) {
          state.totalSum += amount;
        }
      });

      // Sort and extract last 7 individual credit entries (latest first)
      state.last7CreditArray = creditTxs
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 7)
        .map((tx) => tx.amount);

      // Same for last 7 debit entries
      state.last7DebitArray = debitTxs
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 7)
        .map((tx) => tx.amount);
    },
  },
});

export const { setWeeklyData } = transactionSlice.actions;
export default transactionSlice.reducer;
