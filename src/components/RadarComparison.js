"use client";
import { Radar } from "react-chartjs-2";
import { useMemo } from "react";
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
  // Memoize expensive computations
  const chartData = useMemo(() => {
    if (!data?.length) return { labels: [], datasets: [] };

    const labels = data.map((item) => item.category);
    const phones = Object.keys(data[0]).filter((key) => key !== "category");

    const datasets = phones.map((phone) => ({
      label: phone,
      data: data.map((item) => item[phone]),
      fill: true,
      backgroundColor: `${colors[phone]}55`, // Direct opacity instead of gradient
      borderColor: colors[phone],
      borderWidth: 2,
      pointBackgroundColor: colors[phone],
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 7,
      tension: 0.35,
    }));

    return { labels, datasets };
  }, [data, colors]);

  // Memoize chart options (they don't change)
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            display: false,
            stepSize: 20,
          },
          grid: {
            color: "#e5e7eb",
            circular: true,
          },
          angleLines: {
            color: "#e5e7eb",
          },
          pointLabels: {
            font: {
              size: 11,
              weight: "700",
            },
            color: "#374151",
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 16,
            font: {
              size: 11,
              weight: "600",
            },
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "#111827",
          titleFont: { size: 12 },
          bodyFont: { size: 11 },
          padding: 10,
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.r}`,
          },
        },
      },
      elements: {
        line: {
          borderJoinStyle: "round",
        },
        point: {
          hoverRadius: 7,
          hoverBorderWidth: 3,
        },
      },
      animation: {
        duration: 750,
      },
    }),
    [],
  );

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 w-full">
      <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
        Feature Comparison
      </h2>

      <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[520px]">
        <Radar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
