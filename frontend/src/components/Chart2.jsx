import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Chart2 = () => {
  // Properties to make the Charts Responsive Based on Screen Size
  const [barHeight, setBarHeight] = useState(260);
  const [barThickness, setBarThickness] = useState(24);
  const [containerWidth, setContainerWidth] = useState("48%");
  const [layoutFlex, setLayoutFlex] = useState("flex-row");

  const { last7CreditArray, last7DebitArray } = useSelector(
    (store) => store.tran
  );
  // Reversing the credited and Debited Data array for Graphs
  let reverseCreditArray = [...last7CreditArray].reverse();
  let reverseDebitArray = [...last7DebitArray].reverse();

  // Updating Size of graphs based on Screen Size (Responsiveness)
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;

      if (width < 400) {
        setBarHeight(180);
        setBarThickness(15);
        setContainerWidth("90%");
        setLayoutFlex("flex-col");
      } else if (width < 640) {
        setBarHeight(200);
        setBarThickness(14);
        setContainerWidth("95%");
        setLayoutFlex("flex-col");
      } else if (width < 768) {
        setBarHeight(220);
        setBarThickness(18);
        setContainerWidth("90%");
        setLayoutFlex("flex-col");
      } else {
        setBarHeight(260);
        setBarThickness(34);
        setContainerWidth("48%"); // ✅ make it half-width for side-by-side layout
        setLayoutFlex("flex-row");
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const days = [1, 2, 3, 4, 5, 6, 7];

  // Creating Credit Graphs Based on Last 7 Credit data
  const creditData = {
    labels: days,
    datasets: [
      {
        label: "Credit",
        data: reverseCreditArray,
        backgroundColor: "#10b981",
        borderRadius: 5,
        barThickness: barThickness,
      },
    ],
  };

  // Creating Debit Graphs Based on Last 7 debit data
  const debitData = {
    labels: days,
    datasets: [
      {
        label: "Debit",
        data: reverseDebitArray,
        backgroundColor: "#ef4444",
        borderRadius: 5,
        barThickness: barThickness,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 10,
          color: "#1f2937",
          font: {
            size: 13,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: (ctx) => `₹${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          font: { size: 14 },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6b7280",
          font: { size: 13 },
          callback: (val) => `₹${val}`,
        },
        grid: { color: "#f3f4f6" },
      },
    },
  };

  return (
    <section className="w-full px-2 sm:px-4 py-4 flex justify-center">
      <div
        className={`flex ${layoutFlex} gap-4 w-full justify-center flex-wrap`}
      >
        {/* Credit Chart */}
        <div
          className="bg-white rounded-xl shadow p-4 sm:p-6"
          style={{ width: containerWidth, maxWidth: "600px" }}
        >
          <h2 className="text-sm sm:text-xl font-semibold text-gray-800 mb-6">
            Last Seven Credits
          </h2>
          <div style={{ height: `${barHeight}px` }}>
            <Bar data={creditData} options={options} />
          </div>
        </div>

        {/* ❌ Debit Chart */}
        <div
          className="bg-white rounded-xl shadow p-4 sm:p-6"
          style={{ width: containerWidth, maxWidth: "600px" }}
        >
          <h2 className="text-sm sm:text-xl font-semibold text-gray-800 mb-6">
           Last Seven Debits
          </h2>
          <div style={{ height: `${barHeight}px` }}>
            <Bar data={debitData} options={options} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chart2;
