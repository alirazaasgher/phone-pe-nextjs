"use client";

import { Bar } from "react-chartjs-2";
import "../components/lib/chart";
import { useState, useEffect } from "react";
import { fetchDisplayScor } from "@/app/services/phones";
import { Star, X } from "lucide-react";

export default function BarComparison({ data, colors }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const loadDisplayScore = fetchDisplayScor(
  //     selectedCategory,
  //     selectedBar.value,
  //   );
  // }, [selectedCategory]);

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
            indexAxis: isMobile ? "x" : "y",

            onClick: async (event, elements) => {
              if (!elements.length) return;

              const element = elements[0];
              const datasetIndex = element.datasetIndex;
              const index = element.index;
              // Get the color from the clicked dataset
              const clickedDataset = datasets[datasetIndex];
              const barColor = clickedDataset.backgroundColor;

              setSelectedBar({
                label: labels[index],
                value: datasets[datasetIndex].data[index],
                color: barColor,
              });
              const category = labels[index];
              setSelectedCategory(category);
              setIsModalOpen(true);
            },

            scales: {
              x: {
                min: 0,
                max: 100,
                datasets,
              },
            },
          }}
        />
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient accent */}
              <div
                className="relative overflow-hidden p-6 rounded-t-2xl"
                style={{
                  background: `linear-gradient(to right, ${selectedBar.color}, ${selectedBar.color}dd)`,
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {selectedBar.label}
                  </h2>
                  <p className="text-orange-100 text-sm font-medium">
                    Performance Details
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-20 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded-full"
                >
                  <X />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Score Display */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Score
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold text-gray-900 animate-countUp">
                        {selectedBar.value}
                      </span>
                      <span className="text-2xl text-gray-500 font-medium">
                        / 100
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out animate-progressBar"
                      style={{
                        width: `${selectedBar.value}%`,
                        background: `linear-gradient(to right, ${selectedBar.color}, ${selectedBar.color}dd)`, // dd adds slight darkening
                      }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mt-4 flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 transition-all duration-300"
                        style={{
                          animationDelay: `${i * 100}ms`,
                          fill:
                            i < Math.round(selectedBar.value / 20)
                              ? selectedBar.color
                              : "#e5e7eb",
                          color:
                            i < Math.round(selectedBar.value / 20)
                              ? selectedBar.color
                              : "#e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Performance Indicator */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                  <span className="text-sm font-semibold text-gray-700">
                    Performance Level
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      selectedBar.value >= 80
                        ? "bg-green-100 text-green-700"
                        : selectedBar.value >= 60
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedBar.value >= 80
                      ? "Excellent"
                      : selectedBar.value >= 60
                        ? "Good"
                        : "Average"}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Close
                  </button>
                  <button
                    style={{ backgroundColor: selectedBar.color }}
                    className="flex-1 px-5 py-3 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
      className={`px-3 py-1.5 rounded text-xs font-semibold border transition ${
        active
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}
