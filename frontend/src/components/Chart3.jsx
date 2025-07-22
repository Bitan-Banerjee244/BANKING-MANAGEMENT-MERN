import  { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart3 = ({ user }) => {
  const totalCredit = 48000;
  const totalDebit = 22000;
  const totalTransaction = totalCredit + totalDebit;

  const [chartWidth, setChartWidth] = useState(360);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 400) setChartWidth(220);
      else if (width < 640) setChartWidth(260);
      else if (width < 768) setChartWidth(300);
      else setChartWidth(260);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const donutData = {
    labels: ["Credited", "Debited"],
    datasets: [
      {
        data: [totalCredit, totalDebit],
        backgroundColor: ["#34d399", "#f87171"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  };

  const donutOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: {
            size: 14,
            weight: "600",
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


  let userData = useSelector(store=>store.user.currentUserData)
  console.log(userData)

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row gap-6 transition-all duration-300">
      
      {/* 📘 Account Summary Section */}
      <div className="flex-1 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-5 sm:p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 tracking-wide  mb-4">
          Account Summary
        </h2>

        <div className="text-gray-700 text-sm sm:text-base space-y-4 leading-relaxed font-medium">
          <p>
            <span className="text-gray-900 font-semibold">Account No:</span>{" "}
            <span className="text-blue-900 tracking-widest">{userData?.accountNumber || "123456789012"}</span>
          </p>
          <p>
            <span className="text-gray-900 font-semibold">Account Type:</span>{" "}
            <span className="text-blue-900">{user?.type || "Savings"}</span>
          </p>
          <p>
            <span className="text-gray-900 font-semibold">Last Updated:</span>{" "}
            <span className="text-blue-900">{user?.updatedAt || "21 July 2025"}</span>
          </p>

          {/* 💰 Prominent Balance */}
          <div className="bg-white/60 border border-emerald-200 rounded-lg p-4 mt-4">
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Balance</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
              ₹{userData?.balance || "26,000"}
            </p>
          </div>
        </div>

        {/* 📊 Progress Bars */}
        <div className="mt-6 space-y-3">
          <p className="text-gray-800 font-semibold text-base">Transaction Overview</p>

          {/* Credit */}
          <div>
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
              <span>Credited (₹{totalCredit})</span>
              <span>{Math.round((totalCredit / totalTransaction) * 100)}%</span>
            </div>
            <progress
              className="progress progress-success w-full h-3"
              value={totalCredit}
              max={totalTransaction}
            ></progress>
          </div>

          {/* Debit */}
          <div>
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
              <span>Debited (₹{totalDebit})</span>
              <span>{Math.round((totalDebit / totalTransaction) * 100)}%</span>
            </div>
            <progress
              className="progress progress-error w-full h-3"
              value={totalDebit}
              max={totalTransaction}
            ></progress>
          </div>
        </div>
      </div>

      {/* 🟢 Donut Chart Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-emerald-50 rounded-xl p-5 sm:p-6">
        <div
          className="transition-all duration-300"
          style={{ width: `${chartWidth}px` }}
        >
          <Doughnut data={donutData} options={donutOptions} />
        </div>
      </div>
    </div>
  );
};

export default Chart3;
