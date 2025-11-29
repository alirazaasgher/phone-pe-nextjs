"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  HardDrive,
  MemoryStick,
  Tag,
  Smartphone,
  Battery,
  ChevronDown,
} from "lucide-react";
import SideBarCard from "./sidebar/SideBarCard";
import PriceRangeFilter from "./PriceRangeFilter";
import { useRouter, usePathname } from "next/navigation";
import SideBarData from "@/data/SideBarData";

export default function FilterSidebar({ isOpen, setIsOpen, onApply }) {
  const [expandedSections, setExpandedSections] = useState([]);
  const [selected, setSelected] = useState({});
  const toggleSection = (key) => {
    setExpandedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Whenever filters change, auto-open sections that have active filters
  useEffect(() => {
    const activeSections = Object.keys(selected).filter(
      (key) => selected[key]?.length > 0
    );
    setExpandedSections((prev) =>
      Array.from(new Set([...prev, ...activeSections]))
    );
  }, [selected]);
  const pathname = usePathname();
  const filterSections = [
    { key: "ram", title: "RAM", icon: MemoryStick, grid: "grid-cols-2" },
    { key: "storage", title: "Storage", icon: HardDrive, grid: "grid-cols-2" },
    {
      key: "batteryCapacity",
      title: "Battery Capacity",
      icon: Battery,
      grid: "grid-cols-1",
    },
    {
      key: "screenSize",
      title: "Screen Size",
      icon: Smartphone,
      grid: "grid-cols-1",
    },
    // { key: "refreshRate", title: "Refresh Rate", icon: Gauge, grid: "grid-cols-2" },
    // { key: "batteryCapacity", title: "Battery Capacity", icon: Battery, grid: "grid-cols-1" },
    // { key: "chargingSpeed", title: "Charging Speed", icon: BatteryCharging, grid: "grid-cols-1" },
    // {
    //   key: "networkConnectivity",
    //   title: "Network Connectivity",
    //   icon: Wifi,
    //   grid: "grid-cols-1",
    // },
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
      const parts = pathname.split("/").filter(Boolean); // remove empty strings
      const brandsPart = parts.find((p) => p.includes("mobile-phones"));
      const pricePart = parts.find((p) => p.startsWith("price-"));
      const ramPart = parts.find((p) => p.includes("gb") && p.includes("ram"));
      const storagePart = parts.find(
        (p) => p.includes("gb") && p.includes("storage")
      );
      const refreshRatePart = parts.find((p) => p.includes("display"));
      const batteryPart = parts.find((p) => p.includes("battery"));
      const chargingPart = parts.find((p) => p.includes("charging"));
      const networkPart = parts.find((p) => p.includes("network"));
      setSelected({
        brands: brandsPart
          ? brandsPart.replace("-mobile-phones", "").split("-")
          : [],
        priceRange: pricePart
          ? pricePart.replace("price-", "").split("-to-")
          : [],
        ram: ramPart ? ramPart.replace("-ram", "").split("-to-") : [],
        storage: storagePart
          ? storagePart.replace("-storage", "").split("-to-")
          : [],
        refreshRate: refreshRatePart
          ? refreshRatePart.replace("-display", "").split("-to-")
          : [],
        batteryCapacity: batteryPart
          ? batteryPart.replace("-battery", "").split("-to-")
          : [],
        chargingSpeed: chargingPart
          ? chargingPart.replace("-charging", "").split("-to-")
          : [],
        networkConnectivity: networkPart
          ? networkPart.replace("-network", "").split("-to-")
          : [],
      });
    }
  }, [pathname]);
  const multiSelectFilters = ["brands"]; // only these allow multi-select
  // Toggle multi-select filter options

  const toggle = (key, value) => {
    setSelected((prev) => {
      const arr = Array.isArray(prev[key]) ? prev[key] : [];

      let next;
      if (multiSelectFilters.includes(key)) {
        // Multi-select: toggle
        next = arr.includes(value)
          ? arr.filter((v) => v !== value) // deselect
          : [...arr, value]; // select
      } else {
        // Single-select: toggle
        next = arr[0] === value ? [] : [value];
      }

      return { ...prev, [key]: next };
    });
    // handleApply();
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
      return [...new Set(values)].sort(
        (a, b) => extractNumericValue(a) - extractNumericValue(b)
      );
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
      sortedBrands = sortedBrands.filter(
        (b) => b !== "mobile" && b !== "mobiles"
      );

      if (sortedBrands.length) {
        // Filter out any empty strings just in case
        const cleanedBrands = sortedBrands.filter(Boolean);
        if (cleanedBrands.length) {
          pathSegments.push(`${cleanedBrands.join("-")}-mobile-phones`);
        }
      }
    }

    // Price range building
    if (selected.priceRange) {
      let min = Number(selected.priceRange.min);
      let max = Number(selected.priceRange.max);

      // Case: Only Min provided
      if (!isNaN(min) && min >= 0 && (isNaN(max) || max === 0)) {
        pathSegments.push(`price-from-${min}`);
      }

      // Case: Only Max provided
      if (!isNaN(max) && max > 0 && (isNaN(min) || min === 0)) {
        if (max <= 15000) pathSegments.push("budget-smartphones");
        else if (max <= 30000) pathSegments.push("mid-range-phones");
        else if (max <= 50000) pathSegments.push("premium-mobiles");
        else pathSegments.push("flagship-phones");

        pathSegments.push(`price-up-to-${max}`);
      }

      // Case: both provided
      if (!isNaN(min) && min >= 0 && !isNaN(max) && max > 0 && min <= max) {
        if (max <= 15000) pathSegments.push("budget-smartphones");
        else if (max <= 30000) pathSegments.push("mid-range-phones");
        else if (max <= 50000) pathSegments.push("premium-mobiles");
        else pathSegments.push("flagship-phones");

        pathSegments.push(`${min}-to-${max}`);
      }
    }
    // ✅ Other filters
    const filterConfig = {
      ram: { order: 1, isNumeric: true, suffix: "ram" },
      storage: { order: 2, isNumeric: true, suffix: "storage" },
      refreshRate: { order: 3, isNumeric: true, suffix: "refresh-rate" },
      camera: { order: 4, isNumeric: true, suffix: "camera" },
      batteryCapacity: { order: 5, isNumeric: true, suffix: "battery" },
      screenSize: { order: 6, isNumeric: true, suffix: "screen-size" },
      processor: { order: 7, isNumeric: false, suffix: "processor" },
    };
    const sortedFilters = Object.entries(filterConfig).sort(
      ([, a], [, b]) => a.order - b.order
    );

    sortedFilters.forEach(([key, config]) => {
      const value = selected[key];

      if (Array.isArray(value) && value.length) {
        // Filter numeric values if applicable
        const filtered = value.filter((v) => {
          if (config.isNumeric) {
            const num = parseInt(v, 10);
            return !isNaN(num) && num > 0;
          }
          return !!v;
        });

        if (filtered.length) {
          const formattedValue = formatRange(filtered, key);
          if (formattedValue)
            pathSegments.push(`${formattedValue}-${config.suffix}`);
        }
      }
    });

    // ✅ Build final path
    pathSegments = pathSegments.filter(Boolean);
    const path = `/${pathSegments.join("/")}/`;
    if (path.length > 200) {
      console.warn(
        "URL is too long, consider using query params for extra filters"
      );
    }
    onApply?.(path);
    setIsOpen?.(false);
  }, [selected]);

  const handlePriceChange = useCallback((range) => {
    setSelected((prev) => ({ ...prev, priceRange: range }));
  });

  const isSelected = Object.values(selected).some((v) => {
    if (Array.isArray(v)) return v.length > 0; // check arrays
    if (v && typeof v === "object") {
      // check if object has any value (number/string) set
      return Object.values(v).some(
        (val) => val !== null && val !== undefined && val !== ""
      );
    }
    return false;
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Get the scroll position before unlocking
      const scrollY = document.body.style.top;

      // Unlock body scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
    fixed top-14 bottom-0 left-0 z-40 w-65 bg-white shadow-xl
    transform transition-transform duration-300 overflow-y-auto
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:shadow-none md:pt-0
    lg:static lg:flex lg:flex-col lg:h-[calc(95vh-3.5rem)]
  `}
      >
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <input
            type="text"
            placeholder="Search mobiles..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <details className="border-t pt-4 group" open>
            <summary className="flex items-center justify-between cursor-pointer select-none text-sm font-semibold text-gray-800 hover:text-orange-600 transition-colors">
              <span className="flex items-center gap-2">
                <Tag size={16} /> Brands
                {selected["brands"]?.length > 0 && (
                  <span className="ml-1 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    {selected["brands"].length}
                  </span>
                )}
              </span>
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <SideBarCard
              sideBarContent={filtersArray.brands}
              selectedValues={selected["brands"]}
              onSelect={(v) => toggle("brands", v)} // only toggle state
              addContent={true}
              className="grid-cols-2"
            />
          </details>

          {/* Price Range */}
          <details className="border-t pt-4 group" open>
            <summary className="flex items-center justify-between cursor-pointer select-none text-sm font-semibold text-gray-800 hover:text-orange-600 transition-colors">
              <span className="flex items-center gap-2">💰 Price Range</span>
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3">
              <PriceRangeFilter
                value={selected}
                handlePriceChange={handlePriceChange}
              />
            </div>
          </details>

          {/* Dynamic Filter Sections */}
          {filterSections.map(({ key, title, icon, grid }) => (
            <details
              key={key}
              className="border-t pt-4 group"
              open={true}
              onClick={(e) => {
                if (e.target.tagName.toLowerCase() === "summary")
                  toggleSection(key);
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
            disabled={!isSelected}
            className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200
              ${
                isSelected
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
