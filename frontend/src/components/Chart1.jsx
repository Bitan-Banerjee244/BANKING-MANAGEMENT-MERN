import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
// Helper function for chart data
const donutData = (value, label, color) => ({
  labels: [label, "Remaining"],
  datasets: [
    {
      data: [value, 100 - value],
      backgroundColor: [color, "#e5e7eb"], // tailwind gray-200
      borderWidth: 0,
      cutout: "85%",
    },
  ],
});

// Legend Component
const LegendBox = ({ label, value, color, amount }) => (
  <div className="ml-4 text-left">
    <h4 className="text-sm font-semibold text-gray-600">{label}</h4>
    <p className="text-lg font-bold text-gray-800">
      ₹{amount.toLocaleString()}
    </p>
    <div className="mt-1 flex items-center text-xs text-gray-500 gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <span>{value}% used</span>
    </div>
  </div>
);

const Chart1 = () => {
  const charts = [
    { label: "Credit Amount", value: 25, color: "#22c55e", amount: 5412 },
    { label: "Debit Amount", value: 20, color: "#ef4444", amount: 3784 },
    { label: "Loan Amount", value: 15, color: "#6366f1", amount: 2784 },
    { label: "Transfer Amount", value: 40, color: "#ec4899", amount: 6784 },
  ];

  return (
    <main className="flex-1 px-3 overflow-y-auto">
      <div className="flex flex-wrap justify-between gap-4">
        {charts.map((chart, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 flex items-center w-full sm:w-[48%] lg:w-[23%] min-w-[250px]"
          >
            {/* Doughnut Chart */}
            <div style={{ width: "80px", height: "80px" }}>
              <Doughnut
                data={donutData(chart.value, chart.label, chart.color)}
                options={{
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                }}
              />
            </div>

            {/* Info Box */}
            <LegendBox
              label={chart.label}
              value={chart.value}
              color={chart.color}
              amount={chart.amount}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Chart1;
