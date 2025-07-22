import { createSlice } from "@reduxjs/toolkit";

// 🔁 Format to YYYY-MM-DD
const formatDate = (d) => d.toISOString().split("T")[0];

// ✅ Get LAST 7 DAYS from today (including today), skipping future dates
function getLast7ActualDates() {
  const today = new Date();
  const dates = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const iso = formatDate(date);
    const label = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Sun"
    dates.push({ date: iso, label });
  }

  return dates;
}

// ✅ Generate clean 7-day stats
function getClean7DayStats(transactions = []) {
  const last7Days = getLast7ActualDates();

  // 🔹 Prepare zero-filled map
  const result = {};
  last7Days.forEach(({ date, label }) => {
    result[date] = {
      date,
      label,
      credit: 0,
      debit: 0,
      loan: 0,
      transfer: 0,
    };
  });

  // 🔍 Filter and process valid transactions
  for (let txn of transactions) {
    const rawDate = txn?.createdAt;
    const type = txn?.type?.toLowerCase();
    const amount = Number(txn?.amount || 0);
    if (!rawDate || !type || !["credit", "debit", "loan", "transfer"].includes(type)) continue;

    const txnDate = formatDate(new Date(rawDate));
    if (!result[txnDate]) continue; // ignore if not within last 7 days

    result[txnDate][type] += amount;
  }

  return last7Days.map(({ date }) => result[date]);
}
const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    weeklyData: [], // raw transactions
    last7DaysStats: [], // processed results
  },
  reducers: {
    setWeeklyData: (state, action) => {
      const data = action.payload || [];
      state.weeklyData = data;
      state.last7DaysStats = getClean7DayStats(data);
    },
  },
});

export const { setWeeklyData } = transactionSlice.actions;
export default transactionSlice.reducer;
