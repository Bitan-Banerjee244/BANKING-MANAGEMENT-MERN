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
    weeklyCreditArray: Array(7).fill(0), // Sunday to Saturday
    weeklyDebitArray: Array(7).fill(0),
  },
  reducers: {
    setWeeklyData: (state, action) => {
      const { data = [], accountNumber } = action.payload;

      // 🔁 Reset all values
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

      data.forEach((tx) => {
        const amount = Number(tx.amount || 0);
        const type = tx?.type?.toLowerCase();
        const date = new Date(tx.timestamp);
        const dayIndex = date.getDay(); // 0: Sunday, ..., 6: Saturday

        if (type === "credit") {
          state.totalCredit += amount;
          state.onlyCredit += amount;
          state.weeklyCreditArray[dayIndex] += amount;
        }

        else if (type === "loan") {
          state.totalCredit += amount;
          state.onlyLoan += amount;
          state.weeklyCreditArray[dayIndex] += amount;
        }

        else if (type === "debit") {
          state.totalDebit += amount;
          state.onlyDebit += amount;
          state.weeklyDebitArray[dayIndex] += amount;
        }

        else if (type === "transfer") {
          if (tx.fromAccount === accountNumber) {
            // 🔻 Outgoing transfer (debit for current user)
            state.totalDebit += amount;
            state.onlyTransfer += amount;
            state.weeklyDebitArray[dayIndex] += amount;
          } else {
            // 🔺 Incoming transfer (credit for current user)
            state.totalCredit += amount;
            state.onlyCredit += amount;
            state.weeklyCreditArray[dayIndex] += amount;
          }
        }

        // 🧮 Count in total sum only if it's for this user
        if (
          (type === "transfer" && (tx.fromAccount === accountNumber || tx.toAccount === accountNumber)) ||
          ["credit", "debit", "loan"].includes(type)
        ) {
          state.totalSum += amount;
        }
      });
    },
  },
});

export const { setWeeklyData } = transactionSlice.actions;
export default transactionSlice.reducer;
