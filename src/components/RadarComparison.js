"use client";
import { Radar } from "react-chartjs-2";
import { useState, useMemo } from "react";
import "../components/lib/chart";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function RadarComparison({ data, colors }) {
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredData =
    activeCategory === "all"
      ? data
      : data.filter((item) => item.category === activeCategory);

  const labels = filteredData.map((item) => item.category);
  const categories = data.map((item) => item.category);
  // Memoize expensive computations
  const chartData = useMemo(() => {
    if (!data?.length) return { labels: [], datasets: [] };

    const labels = data.map((item) => item.category);
    const phones = Object.keys(data[0]).filter((key) => key !== "category");

    const datasets = phones.map((phone, index) => ({
      label: phone,
      data: data.map((item) => item[phone]),
      fill: true,
      backgroundColor: `${colors[phone]}30`,
      borderColor: colors[phone],
      borderWidth: selectedPhone === phone ? 4 : 2,
      pointBackgroundColor: colors[phone],
      pointBorderColor: "#ffffff",
      pointBorderWidth: 3,
      pointRadius: selectedPhone === phone ? 6 : 4,
      pointHoverRadius: 8,
      pointHoverBorderWidth: 4,
      tension: 0.2,
      order: index,
    }));

    return { labels, datasets, phones };
  }, [data, colors, selectedPhone]);

  // Memoize chart options
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const datasetIndex = elements[0].datasetIndex;
          const phoneName = chartData.datasets[datasetIndex].label;
          setSelectedPhone(phoneName);
        }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            display: true,
            stepSize: 20,
            backdropColor: "transparent",
            color: "#9ca3af",
            font: {
              size: 10,
              weight: "500",
            },
          },
          grid: {
            color: "#e5e7eb",
            circular: true,
            lineWidth: 1.5,
          },
          angleLines: {
            color: "#d1d5db",
            lineWidth: 1.5,
          },
          pointLabels: {
            font: {
              size: 12,
              weight: "700",
            },
            color: "#1f2937",
            padding: 10,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(17, 24, 39, 0.96)",
          titleFont: { size: 13, weight: "600" },
          bodyFont: { size: 12, weight: "500" },
          padding: 14,
          cornerRadius: 10,
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          displayColors: true,
          boxPadding: 6,
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${context.parsed.r}%`,
          },
        },
      },
      animation: {
        duration: 600,
        easing: "easeInOutQuart",
      },
      interaction: {
        mode: "point",
        intersect: true,
      },
    }),
    [chartData],
  );

  return (
    <div className="">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
          Feature Comparison
        </h2>
      </div>

      <div className="grid lg:grid-cols-[1fr,400px] gap-6">
        {/* LEFT SIDE - Chart + Categories */}
        <div className="space-y-6">
          {/* Chart */}
          <div className="relative w-full h-[350px] sm:h-[400px] bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
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

/* ---------- CATEGORY ROW ---------- */
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
