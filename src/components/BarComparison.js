"use client";

import { Bar } from "react-chartjs-2";
import "../components/lib/chart";
import { useState, useEffect } from "react";

export default function BarComparison({ data, colors }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = data.map((item) => item.category);
  const phones = Object.keys(data[0]).filter((key) => key !== "category");

  const filteredData =
    activeCategory === "all"
      ? data
      : data.filter((item) => item.category === activeCategory);

  const labels = filteredData.map((item) => item.category);

  const datasets = phones.map((phone) => ({
    label: phone,
    data: filteredData.map((item) => item[phone]),
    backgroundColor: colors[phone],
    borderRadius: 6,
    barThickness: 30,
    maxBarThickness: 32,
  }));

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 mb-6 w-full">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
        Category Breakdown
      </h2>

      {/* CHART */}
      <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[350px]">
        <Bar
          data={{ labels, datasets }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: isMobile ? "x" : "y", // 🔥 vertical on mobile, horizontal on desktop

            scales: {
              x: {
                min: 0,
                max: 100,
                grid: { color: "#f3f4f6" },
                ticks: { font: { size: 11 }, color: "#6b7280" },
              },
              y: {
                grid: { display: !isMobile },
                ticks: {
                  font: { size: 12, weight: "600" },
                  color: "#374151",
                },
              },
            },

            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 12,
                  font: { size: 12, weight: "600" },
                  usePointStyle: true,
                },
              },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                padding: 10,
                cornerRadius: 6,
              },
            },
          }}
        />
      </div>

      {/* CATEGORY SELECTOR */}
      <div className="mt-4 flex flex-wrap gap-2">
        <CategoryChip
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          All
        </CategoryChip>

        {categories.map((cat) => (
          <CategoryChip
            key={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </CategoryChip>
        ))}
      </div>
    </div>
  );
}

/* ---------- CATEGORY CHIP ---------- */
function CategoryChip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
        active
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}
