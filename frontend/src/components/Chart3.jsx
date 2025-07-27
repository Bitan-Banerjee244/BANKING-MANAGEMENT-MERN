import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart3 = ({ user }) => {
  const totalCredit = useSelector((store) => store.tran.totalCredit);
  const totalDebit = useSelector((store) => store.tran.totalDebit);
  const totalTransaction = totalCredit + totalDebit;
  const [chartWidth, setChartWidth] = useState(360);

  // Handling Chart Sizes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 400) setChartWidth(220);
      else if (width < 640) setChartWidth(260);
      else if (width < 768) setChartWidth(300);
      else setChartWidth(280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handling Donut Data
  const donutData = {
    labels: ["Credited", "Debited"],
    datasets: [
      {
        data: [totalCredit, totalDebit],
        backgroundColor: ["#10b981", "#ef4444"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  };

  // Handling Tooltips and Legend
  const donutOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#1f2937",
          font: {
            size: 14,
            weight: "500",
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹${ctx.parsed}`,
        },
      },
    },
  };

  // Getting User Data
  const userData = useSelector((store) => store.user.currentUserData);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-white via-blue-50 to-emerald-50 rounded-2xl shadow-lg p-4 sm:p-6">

      {/* 📘 Account Summary Section */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-5">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Account Summary</h2>

        <div className="space-y-3 text-gray-700 text-sm sm:text-base">
          <p><span className="font-semibold text-gray-900">Account No:</span> <span className="text-indigo-700 tracking-wider">{userData?.accountNumber || "123456789012"}</span></p>
          <p><span className="font-semibold text-gray-900">Account Type:</span> <span className="text-indigo-700">Savings Account</span></p>
          <p><span className="font-semibold text-gray-900">Last Updated:</span> <span className="text-indigo-700">{user?.updatedAt || "21 July 2025"}</span></p>

          {/* Prominent Balance */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 mt-3">
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Balance</p>
            <p className={`text-3xl sm:text-4xl font-extrabold ${
              totalCredit - totalDebit < 0
                ? "text-red-600"
                : totalCredit - totalDebit === 0
                ? "text-gray-600"
                : "text-emerald-600"
            }`}>
              ₹{(totalCredit - totalDebit).toLocaleString("en-IN")}
            </p>
          </div>

          {/*  Progress Bars */}
          <div className="mt-6 space-y-3">
            <p className="text-gray-800 font-semibold text-base">Transaction Overview</p>

            {/* Credit Progress */}
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Credited (₹{totalCredit.toLocaleString("en-IN")})</span>
                <span>{Math.round((totalCredit / totalTransaction) * 100)}%</span>
              </div>
              <progress className="progress progress-success w-full h-3" value={totalCredit} max={totalTransaction}></progress>
            </div>

            {/* Debit Progress */}
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Debited (₹{totalDebit.toLocaleString("en-IN")})</span>
                <span>{Math.round((totalDebit / totalTransaction) * 100)}%</span>
              </div>
              <progress className="progress progress-error w-full h-3" value={totalDebit} max={totalTransaction}></progress>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 Donut Chart Section */}
      <div className="bg-white shadow-md rounded-xl flex flex-col items-center justify-center p-5 sm:p-6">
        <div className="transition-all duration-300" style={{ width: `${chartWidth}px` }}>
          <Doughnut data={donutData} options={donutOptions} />
        </div>
      </div>
    </div>
  );
};

export default Chart3;
