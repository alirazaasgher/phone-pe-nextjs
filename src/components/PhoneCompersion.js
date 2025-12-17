"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  Battery,
  Smartphone,
  Camera,
  Cpu,
  Wifi,
  Speaker,
  Shield,
  ChevronDown,
  ChevronUp,
  Zap,
  Search,
  ListChecks,
  Plus,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { searchPhones } from "@/app/services/phones";
import PhoneCard from "./PhoneCard";
const PhoneComparison = ({ phones }) => {
  const [showOnlyDiff, setShowOnlyDiff] = useState(false);
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const [expandAll, setExpandAll] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [firstLoad, setFirstLoad] = useState(true);
  const [visibleSpecs, setVisibleSpecs] = useState(new Set());
  const [maxDevices, setMaxDevices] = useState(4);
  useEffect(() => {
    const updateLimit = () => {
      setMaxDevices(window.innerWidth < 640 ? 2 : 4); // sm breakpoint
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);
  const [expandedSections, setExpandedSections] = useState({
    design: false,
    connectivity: false,
    audio: false,
    sensors: false,
  });

  const getCategoryIcon = (category) => {
    const icons = {
      battery: <Battery className="w-4 h-4" />,
      display: <Smartphone className="w-4 h-4" />,
      camera: <Camera className="w-4 h-4" />,
      performance: <Cpu className="w-4 h-4" />,
      software: <Zap className="w-4 h-4" />,
      design: <Shield className="w-4 h-4" />,
      connectivity: <Wifi className="w-4 h-4" />,
      audio: <Speaker className="w-4 h-4" />,
      sensors: <Shield className="w-4 h-4" />,
    };
    return icons[category] || <Smartphone className="w-4 h-4" />;
  };

  const formatLabel = (key) => {
    return key
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .trim();
  };

  const getBestValue = (category, specKey) => {
    if (phones.length < 2) return null;
    const values = phones
      .map((phone) => {
        const val = phone.specs.key[category]?.[specKey];
        if (!val) return null;
        const num = parseFloat(String(val).match(/[\d.]+/)?.[0]);
        return isNaN(num) ? null : num;
      })
      .filter((v) => v !== null);

    if (values.length === 0) return null;

    // For certain specs, lower is better
    const lowerIsBetter = ["weight"];
    return lowerIsBetter.includes(specKey)
      ? Math.min(...values)
      : Math.max(...values);
  };

  const isDifferent = (category, specKey) => {
    const values = phones.map((phone) =>
      String(
        phone.specs.key[category]?.[specKey] ||
          phone.specs.expandable[category]?.[specKey] ||
          ""
      )
    );
    return new Set(values).size > 1;
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Toggle spec visibility
  const toggleSpec = useCallback((specKey) => {
    setVisibleSpecs((prev) => {
      const newSet = new Set(prev);
      newSet.has(specKey) ? newSet.delete(specKey) : newSet.add(specKey);
      return newSet;
    });
  }, []);
  const renderSpecRow = (category, specKey, isExpandable = false) => {
    if (showOnlyDiff && !isDifferent(category, specKey)) return null;

    const bestValue = getBestValue(category, specKey);

    return (
      <div
        key={specKey}
        className="flex justify-between items-center px-3 border-b border-gray-200 hover:bg-blue-50/20 transition-colors"
      >
        {/* Left: Icon + Label */}
        <div className="flex items-center gap-2 min-w-[100px]">
          <span className="text-gray-800 font-medium text-xs">
            {formatLabel(specKey)}
          </span>
        </div>

        {/* Right: Phone values */}
        <div className="flex flex-1 justify-end">
          {phones.map((phone) => {
            const specs = isExpandable
              ? phone.specs.expandable
              : phone.specs.key;
            const value = specs[category]?.[specKey];
            const displayValue =
              value === true ? "✓" : value === false ? "✗" : value || "N/A";

            const numValue = parseFloat(String(value).match(/[\d.]+/)?.[0]);
            const isBest =
              bestValue !== null && !isNaN(numValue) && numValue === bestValue;

            return (
              <div key={phone.id} className="flex-1">
                <div
                  className={`relative w-full px-2 py-1 rounded text-xs font-sans font-medium transition-all
                    ${
                      isBest
                        ? "bg-gray-50 text-gray-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                >
                  {displayValue}
                  {/* {isBest && (
                    <span className="absolute top-0 right-0 mt-1 mr-1 px-1 text-[10px] font-bold text-green-800 bg-green-200 rounded-full">
                      BEST
                    </span>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!pathname || !phones?.length) return;

    startTransition(() => {
      const phoneSlugString = pathname.split("/")[2] || "";
      if (!phoneSlugString) {
        setSelectedPhones([]);
      } else {
        const slugs = phoneSlugString.split("-vs-");
        setSelectedPhones(phones.filter((p) => slugs.includes(p.slug)));
      }
      setFirstLoad(false);
    });
  }, [pathname, phones]);
  const addPhone = useCallback(
    (phone) => {
      if (
        selectedPhones.length >= maxDevices ||
        selectedPhones.some((p) => p.id === phone.id)
      )
        return;

      startTransition(() => {
        const newSelected = [...selectedPhones, phone];
        setSelectedPhones(newSelected);

        router.replace(
          `/compare/${newSelected.map((p) => p.slug).join("-vs-")}`,
          undefined,
          { shallow: true }
        );
      });
    },
    [selectedPhones, router]
  );

  // Remove phone from comparison
  const removePhone = useCallback(
    (phoneId) => {
      startTransition(() => {
        const newSelected = selectedPhones.filter((p) => p.id !== phoneId);

        if (newSelected.length === 0) {
          // Redirect to home page if no phones left
          router.replace("/mobiles", undefined, { shallow: true });
          setSelectedPhones([]); // clear state just in case
          return;
        }

        setSelectedPhones(newSelected);

        router.replace(
          `/compare/${newSelected.map((p) => p.slug).join("-vs-")}`,
          undefined,
          { shallow: true }
        );
      });
    },
    [selectedPhones, router]
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 1000);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch search results
  useEffect(() => {
    if (!debouncedSearch) return setResults([]);

    let isActive = true;
    searchPhones(debouncedSearch).then((apiPhones) => {
      if (isActive) setResults(apiPhones);
    });

    return () => {
      isActive = false;
    }; // cancel state update if unmounted
  }, [debouncedSearch]);

  const renderCategory = (
    categoryName,
    categoryKey,
    isExpandable = false,
    keyProps,
    expandAll = false
  ) => {
    const specs =
      phones[0].specs[isExpandable ? "expandable" : "key"][categoryKey];
    if (!specs) return null;

    return (
      <div
        key={keyProps}
        className={`bg-white rounded shadow-sm border border-gray-200 overflow-hidden`}
      >
        {/* Category Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-sky-600">
              {getCategoryIcon(categoryKey)}
            </div>
            <h3 className="text-gray-800 font-medium text-xs uppercase tracking-wide">
              {categoryName}
            </h3>
          </div>
          {isExpandable && !expandAll && (
            <button
              onClick={() => toggleSection(categoryKey)}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {expandedSections[categoryKey] ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          )}
        </div>

        {/* Specs Rows */}
        {(!isExpandable || expandAll || expandedSections[categoryKey]) &&
          Object.keys(specs).map((specKey) =>
            renderSpecRow(categoryKey, specKey, isExpandable)
          )}
      </div>
    );
  };
  const keyCategories = Object.keys(phones?.[0]?.specs?.key || {});
  const detailsCategories = Object.keys(phones?.[0]?.specs?.expandable || {});
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };
  return (
    <div className="p-1">
      {/* Search Bar */}
      <div className="relative mb-2">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder={
            selectedPhones.length >= maxDevices
              ? "Maximum devices reached"
              : "Search for phones to compare..."
          }
          value={searchTerm}
          disabled={selectedPhones.length >= maxDevices}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-2 bg-white border-2 border-gray-200 rounded focus:outline-none focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed text-base"
        />

        {/* Suggestions dropdown */}
        {searchTerm &&
          results.length > 0 &&
          selectedPhones.length < maxDevices && (
            <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-96 overflow-y-auto">
              {results.map((phone) => (
                <div
                  key={phone.id}
                  onClick={() => {
                    addPhone(phone);
                    setSearchTerm("");
                    setResults([]);
                  }}
                  className="px-5 py-3.5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 cursor-pointer flex justify-between items-center border-b border-gray-100 last:border-0 transition-colors"
                >
                  {/* Left: Image + Name + Brand */}
                  <div className="flex items-center gap-3">
                    <img
                      src={phone.primary_image} // make sure your API provides the image URL
                      alt={phone.name}
                      className="w-12 h-12 object-contain rounded-md flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {phone.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">
                        {phone.brand.name}
                      </div>
                    </div>
                  </div>

                  {/* Right: Plus Icon */}
                  <Plus size={20} className="text-orange-500 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
      </div>

      {/* Search status indicator */}
      {searchTerm && searchTerm !== debouncedSearch && (
        <p className="text-xs text-gray-500 mt-2">Searching...</p>
      )}
      {/* Phone Cards */}
      <div className={`grid ${gridClasses[maxDevices]} gap-3`}>
        {phones.map((phone, index) => (
          <PhoneCard
            key={phone.id}
            phone={phone}
            isPriority={index < 6}
            fromCompare={true}
            removePhone={removePhone}
          />
        ))}
      </div>
      {/* Show Only Differences Toggle */}
      {selectedPhones.length > 1 && (
        <div className="bg-white rounded p-2 mt-3 mb-3 shadow-sm border border-gray-200">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium font-inter text-gray-800">
              Show only differences
            </span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyDiff}
                onChange={(e) => setShowOnlyDiff(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-full"></div>
            </div>
          </label>
        </div>
      )}

      {/* Key Specs */}
      <h2 className="flex items-center gap-2 text-sm font-medium text-gray-900 mt-3 mb-4 px-1">
        <ListChecks size={16} className="text-gray-600" />
        <span>Key Specifications</span>
      </h2>
      {keyCategories.map((categoryKey) => {
        const categoryName = categoryKey.replace(/_/g, " ");
        return renderCategory(
          categoryName,
          categoryKey,
          false,
          `key-${categoryKey}`
        );
      })}

      {/* Expandable Specs */}
      <div className="flex items-center justify-between mt-3 mb-3">
        <h2 className="flex items-center gap-1 text-sm font-bold text-gray-900">
          <Search size={18} className="text-gray-700" />
          Detailed Specifications
        </h2>

        <button
          onClick={() => setExpandAll((prev) => !prev)}
          className="text-sm text-sky-600 hover:text-sky-700 font-medium"
        >
          {expandAll ? "Collapse All" : "Expand All"}
        </button>
      </div>
      {detailsCategories.map((categoryKey) => {
        const categoryName = categoryKey.replace(/_/g, " ");
        return renderCategory(
          categoryName,
          categoryKey,
          true,
          `details-${categoryName}`,
          expandAll
        );
      })}

      {/* Verdict */}
      {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mt-8 border-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>🎯</span> Our Verdict
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span><strong>Choose {phones[0].name}</strong> if you want better camera quality and premium iOS experience</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span><strong>Choose {phones[1].name}</strong> if you prefer higher resolution display and faster charging</span>
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default PhoneComparison;
