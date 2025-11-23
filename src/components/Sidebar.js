"use client";
import React, { useState, useEffect, useCallback } from "react";
import { X, HardDrive, MemoryStick, Gauge, Tag, Smartphone, Battery, BatteryCharging, Wifi, Server, ChevronDown } from "lucide-react";
import SideBarCard from "./sidebar/SideBarCard";
import PriceRangeFilter from "./PriceRangeFilter";
import { useRouter, usePathname } from "next/navigation";
import SideBarData from "@/data/SideBarData";

export default function FilterSidebar({ isOpen, setIsOpen, onApply }) {
  const [expandedSections, setExpandedSections] = useState(["ram","storage"]);
  const [selected, setSelected] = useState({});
  const toggleSection = (key) => {
    setExpandedSections(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    )
  }

  // Whenever filters change, auto-open sections that have active filters
  useEffect(() => {
    const activeSections = Object.keys(selected).filter(
      (key) => selected[key]?.length > 0
    )
    setExpandedSections((prev) => Array.from(new Set([...prev, ...activeSections])))
  }, [selected])
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const [selectedPoll, setSelectedPoll] = useState(null);
  const pathname = usePathname();
  const filterSections = [
    { key: "ram", title: "RAM", icon: MemoryStick, grid: "grid-cols-2" },
    { key: "storage", title: "Storage", icon: HardDrive, grid: "grid-cols-2" },
    { key: "screenSize", title: "Screen Size", icon: Smartphone, grid: "grid-cols-1" },
    { key: "refreshRate", title: "Refresh Rate", icon: Gauge, grid: "grid-cols-2" },
    { key: "batteryCapacity", title: "Battery Capacity", icon: Battery, grid: "grid-cols-1" },
    { key: "chargingSpeed", title: "Charging Speed", icon: BatteryCharging, grid: "grid-cols-1" },
    { key: "networkConnectivity", title: "Network Connectivity", icon: Wifi, grid: "grid-cols-1" },
  ];
  const sideBarMap = SideBarData.reduce((acc, item) => {
    acc[item.slug] = item.values || [];
    return acc;
  }, {});
  const filtersArray = {
    brands: sideBarMap["brands"],
    ram: sideBarMap["ram"] || [],
    screenSize: sideBarMap["screen-size"] || [],
    refreshRate: sideBarMap["refresh-rate"] || [],
    storage: sideBarMap["storage"] || [],
    batteryCapacity: sideBarMap["battery-capacity"] || [],
    chargingSpeed: sideBarMap["charging-speed"] || [],
    networkConnectivity: sideBarMap["network-connectivity"] || [],
  };


  useEffect(() => {
    if (pathname !== "/") {
      // Your fetch or logic here
      const parts = pathname.split('/').filter(Boolean); // remove empty strings
      const brandsPart = parts.find(p => p.includes('mobile-phones'));
      const pricePart = parts.find(p => p.startsWith('price-'));
      const ramPart = parts.find(p => p.includes('gb') && p.includes('ram'));
      const storagePart = parts.find(p => p.includes('gb') && p.includes('storage'));
      const refreshRatePart = parts.find(p => p.includes('display'));
      const batteryPart = parts.find(p => p.includes('battery'));
      const chargingPart = parts.find(p => p.includes('charging'));
      const networkPart = parts.find(p => p.includes('network'));
      setSelected({
        brands: brandsPart ? brandsPart.replace('-mobile-phones', '').split('-') : [],
        priceRange: pricePart ? pricePart.replace('price-', '').split('-to-') : [],
        ram: ramPart ? ramPart.replace('-ram', '').split('-to-') : [],
        storage: storagePart ? storagePart.replace('-storage', '').split('-to-') : [],
        refreshRate: refreshRatePart ? refreshRatePart.replace('-display', '').split('-to-') : [],
        batteryCapacity: batteryPart ? batteryPart.replace('-battery', '').split('-to-') : [],
        chargingSpeed: chargingPart ? chargingPart.replace('-charging', '').split('-to-') : [],
        networkConnectivity: networkPart ? networkPart.replace('-network', '').split('-to-') : []
      });
    }

  }, [pathname]);
  const multiSelectFilters = ["brands"]; // only these allow multi-select
  // Toggle multi-select filter options



  const toggle = (key, value) => {
    setSelected(prev => {
      const arr = Array.isArray(prev[key]) ? prev[key] : [];

      let next;
      if (multiSelectFilters.includes(key)) {
        // Multi-select: toggle
        next = arr.includes(value)
          ? arr.filter(v => v !== value) // deselect
          : [...arr, value]; // select
      } else {
        // Single-select: toggle
        next = arr[0] === value ? [] : [value];
      }

      return { ...prev, [key]: next };
    });
  };

  // Apply filters to parent
  const handleApply = useCallback(() => {
    const extractNumericValue = (str) => {
      const match = String(str).match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const normalizeString = (str) => {
      return String(str || "")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    };

    const sortValues = (values, isNumeric = true) => {
      if (!values || !values.length) return [];
      if (!isNumeric) {
        return [...new Set(values.map(normalizeString))].sort();
      }
      return [...new Set(values)].sort((a, b) => extractNumericValue(a) - extractNumericValue(b));
    };

    const formatRange = (values, key) => {
      if (!values || !values.length) return "";
      const sorted = sortValues(values, true);

      if (sorted.length >= 2) {
        const min = extractNumericValue(sorted[0]);
        const max = extractNumericValue(sorted[sorted.length - 1]);

        if (isNaN(min) || isNaN(max)) return "";

        if (key === "ram" || key === "storage") return `${min}gb-to-${max}gb`;
        if (key === "refreshRate") return `${min}hz-to-${max}hz`;
        if (key === "camera") return `${min}mp-to-${max}mp`;
        if (key === "battery") return `${min}mah-to-${max}mah`;
        return `${min}-to-${max}`;
      }

      const val = extractNumericValue(sorted[0]);
      if (isNaN(val)) return "";

      if (key === "ram" || key === "storage") return `${val}gb`;
      if (key === "refreshRate") return `${val}hz`;
      if (key === "camera") return `${val}mp`;
      if (key === "battery") return `${val}mah`;

      return String(sorted[0]);
    };

    let pathSegments = ["mobiles"];

    // ✅ Brands
    if (selected.brands?.length) {
      let sortedBrands = sortValues(selected.brands, false);

      // Remove "mobile" or "mobiles"
      sortedBrands = sortedBrands.filter(b => b !== "mobile" && b !== "mobiles");

      if (sortedBrands.length) {
        // Filter out any empty strings just in case
        const cleanedBrands = sortedBrands.filter(Boolean);
        if (cleanedBrands.length) {
          pathSegments.push(`${cleanedBrands.join("-")}-mobile-phones`);
        }
      }
    }


    // ✅ Price range
    if (selected.priceRange?.length === 2) {
      let [min, max] = selected.priceRange;
      min = Number(min);
      max = Number(max);
      if ((!isNaN(min) && min > 0) && !isNaN(max)) {
        if (max <= 15000) pathSegments.push("budget-smartphones");
        else if (max <= 30000) pathSegments.push("mid-range-phones");
        else if (max <= 50000) pathSegments.push("premium-mobiles");
        else pathSegments.push("flagship-phones");

        pathSegments.push(`price-${min}-to-${max}`);
      }
    }

    // ✅ Other filters
    const filterConfig = {
      ram: { order: 1, isNumeric: true, suffix: "ram" },
      storage: { order: 2, isNumeric: true, suffix: "storage" },
      refreshRate: { order: 3, isNumeric: true, suffix: "refresh-rate" },
      camera: { order: 4, isNumeric: true, suffix: "camera" },
      battery: { order: 5, isNumeric: true, suffix: "battery" },
      processor: { order: 6, isNumeric: false, suffix: "processor" },
    };

    const sortedFilters = Object.entries(filterConfig).sort(([, a], [, b]) => a.order - b.order);

    sortedFilters.forEach(([key, config]) => {
      const value = selected[key];

      if (Array.isArray(value) && value.length) {
        // Filter numeric values if applicable
        const filtered = value.filter(v => {
          if (config.isNumeric) {
            const num = parseInt(v, 10);
            return !isNaN(num) && num > 0;
          }
          return !!v;
        });

        if (filtered.length) {
          const formattedValue = formatRange(filtered, key);
          if (formattedValue) pathSegments.push(`${formattedValue}-${config.suffix}`);
        }
      }
    });

    // ✅ Build final path
    pathSegments = pathSegments.filter(Boolean);
    const path = `/${pathSegments.join("/")}/`;

    if (path.length > 200) {
      console.warn("URL is too long, consider using query params for extra filters");
    }

    router.push(path, { scroll: false });
    onApply?.(selected);
    setIsOpen?.(false);
  }, [selected, onApply, setIsOpen, router]);


  const handlePriceChange = useCallback((range) => {
    setSelectedFilters((prev) => ({ ...prev, priceRange: range }));
  }, []);
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
  className={`
    fixed top-0 bottom-0 left-0 z-40
    w-72 bg-white shadow-xl h-full overflow-y-auto
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static md:shadow-none
  `}
>
  <div className="sticky top-0 z-20 relative p-3 sm:p-4 border-none sm:border-b">
    <input
      type="text"
      placeholder="Search mobiles..."
      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={(e) => handleSearch(e.target.value)}
    />
    <svg
      className="absolute left-7 top-6 w-4 h-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Brand Section */}
          <details className="group" open>
            <summary className="flex items-center justify-between cursor-pointer select-none text-sm font-semibold text-gray-800 hover:text-orange-600 transition-colors">
              <span className="flex items-center gap-2">
                <Tag size={16} />
                Brands
                {selected["brands"]?.length > 0 && (
                  <span className="ml-1 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    {selected["brands"].length}
                  </span>
                )}
              </span>
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3">
              <SideBarCard
                sideBarContent={filtersArray.brands}
                selectedValues={selected["brands"]}
                onSelect={(v) => toggle("brands", v)}
                addContent={true}
                className="grid-cols-2"
              />
            </div>
          </details>

          {/* Price Range */}
          <details className="border-t pt-3 group" open>
            <summary className="flex items-center justify-between cursor-pointer select-none text-sm font-semibold text-gray-800 hover:text-orange-600 transition-colors">
              <span className="flex items-center gap-2">
                💰 Price Range
              </span>
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3">
              <PriceRangeFilter value={selected} onChange={handlePriceChange} />
            </div>
          </details>

          {/* Dynamic Filters */}
          {filterSections.map(({ key, title, icon, grid }) => (
            <details
              key={key}
              className="border-t pt-3 group"
              open={expandedSections.includes(key)} // controlled by state
              onClick={(e) => {
                // Prevent closing when clicking inside filter options
                if (e.target.tagName.toLowerCase() === 'summary') toggleSection(key)
              }}
            >
              <summary className="flex items-center justify-between cursor-pointer select-none text-sm font-semibold text-gray-800 hover:text-orange-600 transition-colors">
                <span className="flex items-center gap-2">
                  {icon && React.createElement(icon, { size: 16 })}
                  {title}
                  {selected[key]?.length > 0 && (
                    <span className="ml-1 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                      {selected[key].length}
                    </span>
                  )}
                </span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-3">
                <SideBarCard
                  sideBarContent={filtersArray[key]}
                  selectedValues={selected[key]}
                  onSelect={(v) => toggle(key, v)}
                  className={grid}
                />
              </div>
            </details>
          ))}


        </div>
        {/* Sticky Apply Button */}
        <div className="sticky bottom-0 w-full p-4 bg-white border-t border-gray-200 shadow-lg">
          <button
            onClick={handleApply}
            disabled={!Object.values(selected).some(v => v?.length > 0)}
            className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 ${Object.values(selected).some(v => v?.length > 0)
              ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Apply Filters
          </button>
        </div>
        <div className="border-t mt-4 pt-3 space-y-7 p-3">

          {/* 1️⃣ Top Phones from Same Brand */}
          {/* <div>
            <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></span>
              Top Samsung Picks
            </h4>

            <div className="grid grid-cols-2 gap-6">
              {[
                { id: 1, name: "Galaxy S24 Ultra", image: "" },
                { id: 2, name: "Galaxy Z Fold 6", image: "" },
                { id: 3, name: "Galaxy A55", image: "" },
                { id: 4, name: "Galaxy A35", image: "" },
              ].map((p) => (
                <div key={p.id} className="group flex flex-col items-center text-center cursor-pointer">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-2 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* 2️⃣ Latest News */}
          {/* <div>
            <h4 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></span>
              Latest News
            </h4>

            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {[
                { id: 1, title: "Apple Unveils iPhone 17 with Holographic Display", image: "", category: "Mobile" },
                { id: 2, title: "Elon Musk’s Neuralink Uploads Human Memory", image: "", category: "AI" },
                { id: 3, title: "Samsung Galaxy S25 to Feature Transparent Display", image: "", category: "Tech" },
              ].map((p) => (
                <div key={p.id} className="group flex items-center gap-4 py-4 cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-all duration-200">
                  <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <span className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">{p.category}</span>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">{p.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* 3️⃣ Tech Insights */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">⚡ Tech Insights</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {[
                "Snapdragon 8 Gen 3 is 35% faster than Gen 2.",
                "OLED screens last 25% longer than AMOLED ones.",
                "iPhones retain 70% resale value after 1 year.",
                "5G drains 15% more battery than 4G on average.",
                "AI-powered cameras now improve night shots by 40%."
              ].map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg hover:bg-blue-50 transition">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4️⃣ Upcoming Models */}
          {/* <div>
            <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></span>
              Upcoming Samsung Phones
            </h4>
            <div className="grid grid-cols-2 gap-6">
              {[
                { id: 1, name: "Galaxy S25 Ultra", image: "" },
                { id: 2, name: "Galaxy Z Fold 7", image: "" },
                { id: 3, name: "Galaxy S25 Ultra", image: "" },
                { id: 4, name: "Galaxy Z Fold 7", image: "" },
              ].map((p) => (
                <div key={p.id} className="group flex flex-col items-center text-center cursor-pointer">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-2 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">{p.name}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* 5️⃣ Popular Comparisons */}
          <div>
            <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></span>
              Popular Comparisons
            </h4>
            <div className="space-y-2">
              {[
                "Galaxy S24 Ultra vs iPhone 15 Pro Max",
                "Samsung A55 vs OnePlus 12R",
                "Z Fold 6 vs Pixel Fold 2",
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2 hover:shadow-sm hover:border-blue-400 transition-all duration-200 cursor-pointer">
                  <span className="text-xs font-medium text-gray-700 truncate">{item}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* 6️⃣ Mini Poll */}
          <div className="mt-7">
            <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></span>
              Vote Your Pick
            </h4>
            <p className="text-sm text-gray-700 mb-3">Which flagship phone rules 2025?</p>
            <div className="space-y-2">
              {["iPhone 16 Pro Max", "Galaxy S24 Ultra", "Pixel 9 Pro", "OnePlus 12"].map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPoll(idx)}
                  className={`w-full text-left text-sm border px-3 py-2 rounded-lg transition-all duration-200 ${selectedPoll === idx ? "bg-blue-50 border-blue-400" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedPoll !== null && (
              <div className="mt-3 text-xs text-blue-600">You voted: {["iPhone 16 Pro Max", "Galaxy S24 Ultra", "Pixel 9 Pro", "OnePlus 12"][selectedPoll]}</div>
            )}
          </div>

          {/* 7️⃣ Price Drop Alerts */}
          {/* <div className="mt-8">
            <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-red-500 to-pink-600 rounded-full"></span>
              Price Drop Alerts
            </h4>

            <div className="space-y-4">
              {[
                { id: 1, name: "Samsung Galaxy S24 Ultra", oldPrice: "Rs. 539,999", newPrice: "Rs. 499,999", image: "" },
                { id: 2, name: "iPhone 15 Pro Max", oldPrice: "Rs. 589,999", newPrice: "Rs. 559,999", image: "" },
                { id: 3, name: "OnePlus 12", oldPrice: "Rs. 239,999", newPrice: "Rs. 214,999", image: "" },
              ].map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-2 border border-gray-100 rounded-lg hover:border-red-400 hover:shadow-sm transition-all duration-200 cursor-pointer">
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <span className="text-sm font-medium text-gray-800 line-clamp-1">{p.name}</span>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className="text-gray-400 line-through">{p.oldPrice}</span>
                      <span className="text-red-600 font-semibold">{p.newPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

        </div>
      </div>
    </>
  );
}
