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
    weeklyCreditArray: Array(7).fill(0), // Sun to Sat
    weeklyDebitArray: Array(7).fill(0),  // Sun to Sat
  },
  reducers: {
    setWeeklyData: (state, action) => {
      const data = action.payload || [];
      state.weeklyData = data;

      // 🔁 Reset all fields
      state.totalCredit = 0;
      state.totalDebit = 0;
      state.onlyCredit = 0;
      state.onlyDebit = 0;
      state.onlyLoan = 0;
      state.onlyTransfer = 0;
      state.totalSum = 0;
      state.weeklyCreditArray = Array(7).fill(0);
      state.weeklyDebitArray = Array(7).fill(0);

      data.forEach((element) => {
        const amount = Number(element.amount || 0);
        const type = element?.type?.toLowerCase();
        const date = new Date(element.timestamp);
        const dayIndex = date.getDay(); 

        if (type === "credit") {
          state.totalCredit += amount;
          state.onlyCredit += amount;
          state.weeklyCreditArray[dayIndex] += amount;
        } else if (type === "loan") {
          state.totalCredit += amount;
          state.onlyLoan += amount;
          state.weeklyCreditArray[dayIndex] += amount;
        } else if (type === "debit") {
          state.totalDebit += amount;
          state.onlyDebit += amount;
          state.weeklyDebitArray[dayIndex] += amount;
        } else if (type === "transfer") {
          state.totalDebit += amount;
          state.onlyTransfer += amount;
          state.weeklyDebitArray[dayIndex] += amount;
        }

        // ✅ Total for valid transaction types
        if (["credit", "debit", "loan", "transfer"].includes(type)) {
          state.totalSum += amount;
        }
      });
    },
  },
});

export const { setWeeklyData } = transactionSlice.actions;
export default transactionSlice.reducer;
