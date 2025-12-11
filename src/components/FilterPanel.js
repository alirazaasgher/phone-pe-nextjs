"use client"; // Next.js 13 app directory

import React, { useState } from "react";

export default function FilterPanel({ applyFilters }) {
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  
  const isSelected = selectedBrand.length > 0 || selectedPrice.length > 0;

  const handleApply = () => {
    applyFilters({ brand: selectedBrand, price: selectedPrice });
  };

  const toggleBrand = (brand) => {
    setSelectedBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const togglePrice = (price) => {
    setSelectedPrice((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-end">
      {/* Filter Panel */}
      <div className="bg-white w-80 h-full p-4 flex flex-col justify-between">
        {/* Filter Options */}
        <div className="space-y-4 overflow-y-auto">
          <h2 className="text-lg font-semibold">Filters</h2>

          {/* Brand Filter */}
          <div>
            <h3 className="font-medium mb-2">Brand</h3>
            <div className="flex flex-wrap gap-2">
              {["Apple", "Samsung", "Xiaomi", "OnePlus"].map((brand) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`px-3 py-1 rounded-full border ${
                    selectedBrand.includes(brand)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-700 border-gray-300"
                  } transition-colors duration-200`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-medium mb-2">Price</h3>
            <div className="flex flex-wrap gap-2">
              {["< $300", "$300 - $600", "$600 - $1000", "> $1000"].map((price) => (
                <button
                  key={price}
                  onClick={() => togglePrice(price)}
                  className={`px-3 py-1 rounded-full border ${
                    selectedPrice.includes(price)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-700 border-gray-300"
                  } transition-colors duration-200`}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Advanced + Apply */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-end">
            <a
              href="/filters/advanced"
              className="px-4 py-2 rounded-lg border border-orange-600 text-orange-600 font-medium hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 shadow-sm"
            >
              Advanced Filters
            </a>
          </div>
          <button
            onClick={handleApply}
            disabled={!isSelected}
            className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 ${
              isSelected
                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Close Area */}
      <div className="flex-1" onClick={() => console.log("Close panel")} />
    </div>
  );
}
