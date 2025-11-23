"use client";
import React, { useState, useMemo, useEffect } from "react";
import VariantImageGallery from "../../components/VariantImageGallery";
import SpecCard from "../../components/SpecfictionsCard";
import PhoneCard from "../../components/PhoneCard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Camera,
  Cpu,
  Battery,
  Smartphone,
  BatteryCharging,
  ChevronRight,
  ChevronDown,
  Heart,
  Wifi,
  Search,
  Filter,
  Music,
  Fingerprint,
  Calendar,
  MonitorSmartphone,
  Ruler,
  Bot,
  Info,
} from "lucide-react";
import Select from "react-select";
import phones from "@/data/mobiles";
import { useRef } from "react";
export default function Details({ phoneDetails, normalizedSpecs }) {
  const [isLiked, setIsLiked] = useState(false);
  const [expandedSections, setExpandedSections] = useState(new Set([]));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredSpecs, setFilteredSpecs] = useState(normalizedSpecs);
  const sectionRefs = useRef({});
  const toggleSection = (section) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  useEffect(() => {
    const filtered = {};
    const newExpanded = new Set();

    const selectedValues = selectedFilters.map((f) => f.value);

    Object.entries(normalizedSpecs).forEach(([section, details]) => {
      const filteredDetails = {};

      Object.entries(details).forEach(([k, v]) => {
        let searchValue = k.toLowerCase();

        if (Array.isArray(v)) {
          if (typeof v[0] === "object") {
            // Array of objects → include all subkeys
            searchValue +=
              " " + v.map((obj) => Object.keys(obj).join(" ")).join(" ");
          } else {
            // Array of primitives
            searchValue += " " + v.join(" ");
          }
        } else if (typeof v === "object" && v !== null) {
          // Plain object
          searchValue += " " + Object.keys(v).join(" ");
        } else {
          // Primitive value
          searchValue += " " + v;
        }

        // Apply search
        if (
          searchTerm === "" ||
          searchValue.includes(searchTerm.toLowerCase())
        ) {
          filteredDetails[k] = v;
        }
      });

      if (
        (selectedValues.length === 0 || selectedValues.includes(section)) &&
        Object.keys(filteredDetails).length > 0
      ) {
        filtered[section] = filteredDetails;
        newExpanded.add(section);
      }
    });

    setFilteredSpecs(filtered);
    setExpandedSections(newExpanded);
  }, [searchTerm, selectedFilters]);

  const sectionConfig = {
    network: {
      color: "from-purple-500 to-violet-600",
      bg: "bg-purple-50 border-purple-200",
      icon: Wifi,
      priority: ["network_type", "sim", "speed"],
    },
    body: {
      color: "from-orange-500 to-red-600",
      bg: "bg-orange-50 border-orange-200",
      icon: Smartphone,
      priority: ["dimensions", "weight", "material"],
    },
    display: {
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50 border-blue-200",
      icon: Smartphone,
      priority: ["type", "size", "resolution"],
    },
    platform: {
      color: "from-green-500 to-emerald-600",
      bg: "bg-green-50 border-green-200",
      icon: Cpu,
      priority: ["os", "chipset", "gpu"],
    },
    memory: {
      color: "from-teal-500 to-cyan-600",
      bg: "bg-teal-50 border-teal-200",
      icon: Cpu,
      priority: ["ram", "storage", "expandable"],
    },
    main_camera: {
      color: "from-pink-500 to-rose-600",
      bg: "bg-pink-50 border-pink-200",
      icon: Camera,
      priority: ["resolution", "features", "video"],
    },
    selfie_camera: {
      color: "from-fuchsia-500 to-purple-600",
      bg: "bg-fuchsia-50 border-fuchsia-200",
      icon: Camera,
      priority: ["resolution", "features", "video"],
    },
    sound: {
      color: "from-yellow-500 to-amber-600",
      bg: "bg-yellow-50 border-yellow-200",
      icon: Music,
      priority: ["loudspeaker", "jack", "stereo"],
    },
    connectivity: {
      color: "from-indigo-500 to-blue-600",
      bg: "bg-indigo-50 border-indigo-200",
      icon: Wifi,
      priority: ["wifi", "bluetooth", "gps"],
    },
    battery: {
      color: "from-rose-500 to-red-600",
      bg: "bg-rose-50 border-rose-200",
      icon: Battery,
      priority: ["capacity", "charging", "standby"],
    },
    sensors: {
      color: "from-gray-500 to-slate-600",
      bg: "bg-gray-50 border-gray-200",
      icon: Fingerprint,
      priority: ["fingerprint", "proximity", "accelerometer"],
    },
    misc: {
      color: "from-cyan-500 to-blue-600",
      bg: "bg-cyan-50 border-cyan-200",
      icon: Info,
      priority: ["colors", "models", "features"],
    },
  };

  const options = Object.keys(normalizedSpecs).map((section) => ({
    value: section,
    label:
      section.charAt(0).toUpperCase() + section.slice(1).replace(/_/g, " "),
  }));
  const itemsPerPage = 6;
  const [startIndex, setStartIndex] = useState(0);
  const getCurrentItems = () => {
    return phones.slice(startIndex, startIndex + itemsPerPage);
  };

  const colors = phoneDetails.colors || [];

  const [selectedColor, setSelectedColor] = useState(colors[0]?.slug || "");
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedColorData = colors.find((c) => c.slug === selectedColor);
  const images = selectedColorData?.images?.length
    ? selectedColorData.images
    : [];

  // Navigation functions
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  if (!phoneDetails)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Phone not found
          </h2>
          <p className="text-gray-500">
            The requested device could not be found.
          </p>
        </div>
      </div>
    );
  return (
    <>
      <section className="p-2 lg:p-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* --- Left: Image Gallery --- */}
          <div className="lg:col-span-4 flex justify-center items-start">
            <div className="w-full max-w-md">
              <VariantImageGallery phone={phoneDetails} />
            </div>
          </div>

          {/* --- Right: Specifications --- */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* --- Top Highlights Section --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SpecCard
                icon={<Calendar size={18} className="text-blue-600" />}
                label="Release Date"
                value={phoneDetails.release_date || "2025"}
              />
              <SpecCard
                icon={<Ruler size={18} className="text-indigo-600" />}
                label="Dimensions"
                value={
                  phoneDetails?.searchIndex?.dimensions ||
                  "190g, 7.4mm thickness"
                }
              />
              <SpecCard
                icon={<MonitorSmartphone size={18} className="text-teal-600" />}
                label="Display"
                value={`${
                  phoneDetails?.searchIndex?.screen_size_inches || "6.8"
                }" ${phoneDetails?.searchIndex?.display_type || "AMOLED"}, ${
                  phoneDetails?.searchIndex?.refresh_rate_max || "120"
                }Hz`}
                subValue="1256x2760 pixels"
              />
              <SpecCard
                icon={<Cpu size={18} className="text-orange-600" />}
                label="Processor"
                value={
                  phoneDetails?.searchIndex?.chipset || "Snapdragon 8 Gen 3"
                }
              />
              <SpecCard
                icon={<Camera size={18} className="text-indigo-600" />}
                label="Camera"
                value={`${
                  phoneDetails?.searchIndex?.main_camera_mp || "200MP"
                } Triple Camera`}
              />
              <SpecCard
                icon={<Battery size={18} className="text-emerald-600" />}
                label="Battery"
                value={`${
                  phoneDetails?.searchIndex?.battery_capacity_mah || 5000
                }mAh`}
              />
              <SpecCard
                icon={<BatteryCharging size={18} className="text-yellow-600" />}
                label="Charging"
                value={
                  phoneDetails?.searchIndex?.wired_charging ||
                  "45W Fast Charging"
                }
              />
              <SpecCard
                icon={<Bot size={18} className="text-rose-600" />}
                label="OS"
                value={phoneDetails.os || "Android 15"}
                subValue="7 years updates"
              />
            </div>

            {/* --- Variants Section --- */}
            {phoneDetails.variants?.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="h-6 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded" />
                  Available Variants
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {phoneDetails.variants.map((variant, index) => (
                    <motion.div
                      key={variant.id || index}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="flex items-center justify-between p-5 rounded-2xl border border-gray-200
                      bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md
                      hover:border-indigo-400 transition-all duration-200 ease-in-out"
                    >
                      <div>
                        <p className="text-base font-semibold text-gray-900">
                          {variant.ram && variant.storage
                            ? `${variant.ram}GB / ${variant.storage}GB`
                            : "Standard"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Available for purchase
                        </p>
                      </div>
                      <div className="text-right">
                        {variant.price ? (
                          <span className="text-lg font-bold text-indigo-700">
                            ₨ {variant.price.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-1xl shadow-2xl border border-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="p-8 sm:p-8">
          {/* Search and Filter Controls */}
          <div className="flex flex-col items-start gap-2">
            {/* Search Box */}
            <div className="relative w-full flex items-center gap-3">
              {/* Search Icon */}
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10">
                <Search className="text-slate-400 w-5 h-5 transition-colors duration-200" />
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search specifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 pl-14 pr-6 py-4 text-base font-medium placeholder:text-slate-400
                          bg-white/80 backdrop-blur-sm border-2 border-slate-200/60
                          rounded-2xl shadow-sm shadow-slate-900/5
                          focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400
                          focus:bg-white focus:shadow-md focus:shadow-blue-500/10
                          hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/10
                          transition-all duration-300 ease-out"
              />

              {/* Expand/Collapse Button */}
              {Object.keys(filteredSpecs).length > 0 && (
                <button
                  onClick={() => {
                    const allSections = Object.keys(filteredSpecs);
                    if (expandedSections.size === allSections.length) {
                      setExpandedSections(new Set());
                    } else {
                      setExpandedSections(new Set(allSections));
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl
                              hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  {expandedSections.size ===
                  Object.keys(filteredSpecs).length ? (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      Collapse All
                    </>
                  ) : (
                    <>
                      <ChevronRight className="w-5 h-5" />
                      Expand All
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Select Box */}
            <div className="relative w-full">
              <div className="absolute left-5 top-5 z-20 pointer-events-none">
                <Filter className="text-slate-400 w-5 h-5 transition-colors duration-200" />
              </div>
              <Select
                instanceId="my-multi-select"
                options={options}
                isMulti
                value={selectedFilters}
                onChange={setSelectedFilters}
                placeholder="Filter categories..."
                className="w-full text-base font-medium"
                classNamePrefix="react-select"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minHeight: "56px",
                    borderRadius: "1rem",
                    paddingLeft: "3rem",
                    border: "2px solid",
                    borderColor: state.isFocused
                      ? "#60a5fa"
                      : "rgba(226, 232, 240, 0.6)",
                    backgroundColor: state.isFocused
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    boxShadow: state.isFocused
                      ? "0 0 0 4px rgba(59, 130, 246, 0.15), 0 10px 25px -5px rgba(59, 130, 246, 0.1)"
                      : "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
                    "&:hover": {
                      borderColor: "#cbd5e1",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      backgroundColor: "#ffffff",
                    },
                    flexWrap: "wrap",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                    padding: "8px 12px",
                    minHeight: "40px",
                    maxHeight: "none",
                    alignItems: "center",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#1e40af",
                    border: "none",
                    borderRadius: "9999px",
                    margin: "2px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    color: "#ffffff",
                    boxShadow: "0 2px 4px rgba(30, 64, 175, 0.15)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#1d4ed8",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 8px rgba(30, 64, 175, 0.25)",
                    },
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#ffffff",
                    padding: "4px 8px 4px 12px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    letterSpacing: "0.025em",
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "#bfdbfe",
                    borderRadius: "9999px",
                    padding: "2px 6px 2px 2px",
                    marginLeft: "4px",
                    "&:hover": {
                      backgroundColor: "rgba(239, 68, 68, 0.9)",
                      color: "#ffffff",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.15s ease",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#94a3b8",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                  }),
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    color: state.isFocused ? "#60a5fa" : "#94a3b8",
                    transition: "all 0.2s ease",
                    "&:hover": { color: "#3b82f6" },
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    color: "#94a3b8",
                    "&:hover": { color: "#ef4444" },
                    transition: "all 0.2s ease",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: "1rem",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    backgroundColor: "#ffffff",
                    backdropFilter: "blur(12px)",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#3b82f6"
                      : state.isFocused
                      ? "#f1f5f9"
                      : "transparent",
                    color: state.isSelected ? "#ffffff" : "#334155",
                    padding: "12px 16px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    "&:active": {
                      backgroundColor: state.isSelected ? "#2563eb" : "#e2e8f0",
                    },
                    transition: "all 0.15s ease",
                  }),
                }}
              />
            </div>
          </div>

          {/* Specifications Sections */}
          <div className="space-y-4 mt-3">
            {Object.entries(filteredSpecs).map(([section, details]) => {
              const countNonEmptyKeys = (obj) => {
                return Object.keys(obj).filter(
                  (key) => obj[key] !== null && obj[key] !== ""
                ).length;
              };
              const config = sectionConfig[section] || {
                color: "from-gray-500 to-gray-600",
                bg: "bg-gray-50 border-gray-200",
                icon: Info,
              };
              const Icon = config.icon;
              return (
                <div
                  key={section}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Simple Header */}
                  <button
                    onClick={() => toggleSection(section)}
                    ref={(el) => (sectionRefs.current[section] = el)}
                    className="cursor-pointer w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-base font-semibold text-gray-900 capitalize">
                          {section.replace(/_/g, " ")}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {countNonEmptyKeys(details)} items
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm font-medium">
                        {countNonEmptyKeys(details)}
                      </span>
                      {expandedSections.has(section) ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </button>

                  {/* Simple Content */}
                  {expandedSections.has(section) && (
                    <div className="border-t border-gray-100 bg-gray-50/50">
                      <div className="p-4 space-y-3">
                        {Object.entries(details).map(([key, value]) => {
                          const isNumericKey = Number.isInteger(Number(key));
                          const isArrayOfObjects =
                            Array.isArray(value) &&
                            value.length > 0 &&
                            typeof value[0] === "object";
                          const isArray = Array.isArray(value);
                          // Shared classes
                          const containerClass =
                            "flex flex-col gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200";
                          const labelClass =
                            "text-sm font-medium text-gray-700 capitalize";
                          const tableClass =
                            "min-w-full text-sm text-left border border-gray-200 rounded-md";
                          const cellClass =
                            "px-3 py-2 text-gray-800 border-b border-gray-200";
                          const headerClass =
                            "px-3 py-2 font-medium text-gray-700 capitalize border-b border-gray-200";

                          const formatLabel = (str) => str.replace(/_/g, " ");

                          if (isArrayOfObjects) {
                            const headers = Object.keys(value[0]);
                            return (
                              <div key={key} className={containerClass}>
                                <div className="w-full mb-2">
                                  <span className={labelClass}>
                                    {formatLabel(key)}
                                  </span>
                                </div>
                                <div className="w-full overflow-x-auto">
                                  <table className={tableClass}>
                                    <thead className="bg-gray-100">
                                      <tr>
                                        {headers.map((header) => (
                                          <th
                                            key={header}
                                            className={headerClass}
                                          >
                                            {formatLabel(header)}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {value.map((item, index) => (
                                        <tr
                                          key={index}
                                          className="hover:bg-gray-50"
                                        >
                                          {headers.map((header) => (
                                            <td
                                              key={header}
                                              className={cellClass}
                                            >
                                              {item[header]}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            );
                          }

                          // Regular items (non-array-of-objects)
                          const flexDirection =
                            !isArray && !isNumericKey ? "sm:flex-row" : "";
                          const labelWidth = isArray
                            ? "w-full mb-2"
                            : "sm:w-1/3";
                          const contentWidth =
                            isArray || isNumericKey
                              ? "w-full overflow-x-auto"
                              : "sm:w-2/3";
                          if (value !== null) {
                            return (
                              <div
                                key={key}
                                className={`${containerClass} ${flexDirection}`}
                              >
                                <div className={labelWidth}>
                                  <span className={labelClass}>
                                    {!isNumericKey && formatLabel(key)}
                                  </span>
                                </div>
                                <div className={contentWidth}>
                                  {isArray ? (
                                    <table className={tableClass}>
                                      <tbody>
                                        {Array.from(
                                          {
                                            length: Math.ceil(value.length / 2),
                                          },
                                          (_, rowIndex) => (
                                            <tr
                                              key={rowIndex}
                                              className="hover:bg-gray-50 transition-colors duration-150"
                                            >
                                              <td className={cellClass}>
                                                {value[rowIndex * 2]}
                                              </td>
                                              <td className={cellClass}>
                                                {value[rowIndex * 2 + 1] || ""}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  ) : (
                                    <span className="text-sm text-gray-800 font-medium">
                                      {value}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {Object.keys(filteredSpecs).length === 0 && (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">
                No specifications found
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                Try adjusting your search terms or filter selection
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter("all");
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        {/* Section Header */}
        <div className="relative bg-gradient-to-r from-pink-600 via-rose-500 to-pink-400 text-white px-6 py-4 rounded-t-xl shadow-md">
          <h2 className="text-2xl font-extrabold tracking-tight drop-shadow-sm">
            More From Samsung
          </h2>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/30"></div>
        </div>

        {/* Phone Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-6 bg-white rounded-b-xl shadow-sm">
          {getCurrentItems().map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </div>
    </>
  );
}

const QuickSpec = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-200">
    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
    </div>
  </div>
);

const VariantPill = ({ variant }) => (
  <button className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-200">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
      <span className="text-sm font-bold text-gray-900">
        {variant.ram}/{variant.storage}GB
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-base font-bold text-gray-900">
        ₨{(variant.price / 1000).toFixed(0)}k
      </span>
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all duration-200" />
    </div>
  </button>
);
