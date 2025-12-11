"use client"; // Important for Next.js 13+ app directory

import { useState, useEffect } from "react";

export default function AdvancedFilter({ data }) {
  const [filters, setFilters] = useState({
    brand: "",
    color: "",
    ram: "",
    storage: "",
    rating: "",
    availability: "",
    minPrice: "",
    maxPrice: "",
  });

  const [filteredData, setFilteredData] = useState(data);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters dynamically
  useEffect(() => {
    if (!Array.isArray(data)) return;
    let tempData = [...data];

    if (filters.brand) tempData = tempData.filter(item => item.brand === filters.brand);
    if (filters.color) tempData = tempData.filter(item => item.color === filters.color);
    if (filters.ram) tempData = tempData.filter(item => item.ram === Number(filters.ram));
    if (filters.storage) tempData = tempData.filter(item => item.storage === Number(filters.storage));
    if (filters.rating) tempData = tempData.filter(item => item.rating >= Number(filters.rating));
    if (filters.availability)
      tempData = tempData.filter(item => item.availability === filters.availability);
    if (filters.minPrice) tempData = tempData.filter(item => item.price >= Number(filters.minPrice));
    if (filters.maxPrice) tempData = tempData.filter(item => item.price <= Number(filters.maxPrice));

    setFilteredData(tempData);
  }, [filters, data]);

  // Clear all filters
  const clearFilters = () => setFilters({
    brand: "",
    color: "",
    ram: "",
    storage: "",
    rating: "",
    availability: "",
    minPrice: "",
    maxPrice: "",
  });

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-800">Product Filters</h1>
            <button 
              onClick={clearFilters} 
              className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-medium flex items-center gap-2"
            >
              <span>Clear All</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Sections */}
        {/* --- Display Section --- */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            Display
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Color */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Color</label>
              <select
                name="color"
                value={filters.color}
                onChange={handleChange}
                className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium cursor-pointer"
              >
                <option value="">All Colors</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Red">Red</option>
              </select>
            </div>

            {/* Screen Size */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Screen Size</label>
              <select
                name="screenSize"
                value={filters.screenSize}
                onChange={handleChange}
                className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium cursor-pointer"
              >
                <option value="">All Sizes</option>
                <option value="5.5">5.5 inch</option>
                <option value="6.1">6.1 inch</option>
                <option value="6.7">6.7 inch</option>
                <option value="7.0">7.0 inch</option>
              </select>
            </div>

            {/* Display Type */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Display Type</label>
              <select
                name="displayType"
                value={filters.displayType}
                onChange={handleChange}
                className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="LCD">LCD</option>
                <option value="AMOLED">AMOLED</option>
                <option value="OLED">OLED</option>
              </select>
            </div>
          </div>
        </div>
        </div>
        </div>
  );
}
