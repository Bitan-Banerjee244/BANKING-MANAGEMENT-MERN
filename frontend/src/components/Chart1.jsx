import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function for chart data
const donutData = (value, label, color) => ({
  labels: [label, "Remaining"],
  datasets: [
    {
      data: [value, 100 - value],
      backgroundColor: [color, "#e5e7eb"], // tailwind gray-200
      borderWidth: 0,
      cutout: "75%",
    },
  ],
});


// Legend Component
const LegendBox = ({ label, value, color, amount }) => (
  <div className="ml-4 text-left">
    <h4 className="text-sm font-semibold text-gray-600">{label}</h4>
    <p className="text-lg font-bold text-gray-800">
      ₹ {amount.toLocaleString()}
    </p>
    <div className="mt-1 flex items-center text-xs text-gray-500 gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <span>{value}% Amount</span>
    </div>
  </div>
);

const Chart1 = () => {
  let { onlyCredit, onlyDebit, onlyLoan, onlyTransfer, totalSum } = useSelector(
    (store) => store.tran
  );

  
  const charts = [
  {
    label: "Credit Amount",
    value: Number(((onlyCredit / totalSum) * 100).toFixed(2)),
    color: "#22c55e",
    amount: onlyCredit,
  },
  {
    label: "Debit Amount",
    value: Number(((onlyDebit / totalSum) * 100).toFixed(2)),
    color: "#ef4444",
    amount: onlyDebit,
  },
  {
    label: "Loan Amount",
    value: Number(((onlyLoan / totalSum) * 100).toFixed(2)),
    color: "#6366f1",
    amount: onlyLoan,
  },
  {
    label: "Transfer Amount",
    value: Number(((onlyTransfer / totalSum) * 100).toFixed(2)),
    color: "#ec4899",
    amount: onlyTransfer,
  },
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
            <div style={{ width: "95px", height: "95px" }}>
              <Doughnut
                data={donutData(chart.value, chart.label, chart.color)}
                options={{
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: true,
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
