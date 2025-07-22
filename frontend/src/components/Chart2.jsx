import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Chart2 = () => {
  const [barHeight, setBarHeight] = useState(260);
  const [barThickness, setBarThickness] = useState(24);
  const [containerWidth, setContainerWidth] = useState("100%");

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;

      if (width < 400) {
        setBarHeight(180);
        setBarThickness(10);
        setContainerWidth("90%");
      } else if (width < 640) {
        setBarHeight(200);
        setBarThickness(14);
        setContainerWidth("95%");
      } else if (width < 768) {
        setBarHeight(220);
        setBarThickness(18);
        setContainerWidth("90%");
      } else if (width < 1024) {
        setBarHeight(240);
        setBarThickness(20);
        setContainerWidth("75%");
      } else {
        setBarHeight(260);
        setBarThickness(24);
        setContainerWidth("100%");
      }
    };

    updateDimensions(); // run once on load
    window.addEventListener("resize", updateDimensions); // on resize

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const data = {
    labels: days,
    datasets: [
      {
        label: "Credit",
        data: [1200, 1400, 1300, 1500, 1600, 1700, 1650],
        backgroundColor: "#10b981",
        borderRadius: 5,
        barThickness: barThickness,
      },
      {
        label: "Debit",
        data: [900, 850, 1000, 950, 1300, 1900, 1050],
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
            size: 12,
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
          font: { size: 10 },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6b7280",
          font: { size: 10 },
          callback: (val) => `₹${val}`,
        },
        grid: { color: "#f3f4f6" },
      },
    },
  };

  return (
    <section className="w-full px-2 sm:px-4 py-4 flex justify-center">
      <div
        className="bg-white rounded-xl shadow p-4 sm:p-6"
        style={{ width: containerWidth }}
      >
        <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
          📊 Daily Credit & Debit
        </h2>
        <div style={{ height: `${barHeight}px` }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default Chart2;
