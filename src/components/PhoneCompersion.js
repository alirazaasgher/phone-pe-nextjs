"use client"
import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { Battery, Smartphone, Camera, Cpu, Wifi, Speaker, Shield, ChevronDown, ChevronUp, Star, Zap, Search, X } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
import { searchPhones } from '@/app/services/phones';
const PhoneComparison = ({ phones }) => {
  const [showOnlyDiff, setShowOnlyDiff] = useState(false);
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
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
    sensors: false
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
      sensors: <Shield className="w-4 h-4" />
    };
    return icons[category] || <Smartphone className="w-4 h-4" />;
  };

  const formatLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .trim();
  };

  const getBestValue = (category, specKey) => {
    if (phones.length < 2) return null;
    const values = phones.map(phone => {
      const val = phone.specs.key[category]?.[specKey];
      if (!val) return null;
      const num = parseFloat(String(val).match(/[\d.]+/)?.[0]);
      return isNaN(num) ? null : num;
    }).filter(v => v !== null);

    if (values.length === 0) return null;

    // For certain specs, lower is better
    const lowerIsBetter = ['weight'];
    return lowerIsBetter.includes(specKey) ? Math.min(...values) : Math.max(...values);
  };

  const isDifferent = (category, specKey) => {
    const values = phones.map(phone =>
      String(phone.specs.key[category]?.[specKey] || phone.specs.expandable[category]?.[specKey] || '')
    );
    return new Set(values).size > 1;
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
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
        className="flex justify-between items-center py-2 px-3 border-b border-gray-200 hover:bg-blue-50/20 transition-colors"
      >
        {/* Left: Icon + Label */}
        <div className="flex items-center gap-2 min-w-[100px]">
          <span className="text-gray-800 font-medium text-xs">{formatLabel(specKey)}</span>
        </div>

        {/* Right: Phone values */}
        <div className="flex gap-2 flex-1 justify-end">
          {phones.map(phone => {
            const specs = isExpandable ? phone.specs.expandable : phone.specs.key;
            const value = specs[category]?.[specKey];
            const displayValue = value === true ? '✓' : value === false ? '✗' : value || 'N/A';

            const numValue = parseFloat(String(value).match(/[\d.]+/)?.[0]);
            const isBest = bestValue !== null && !isNaN(numValue) && numValue === bestValue;

            return (
              <div key={phone.id} className="flex-1">
                <div className={`relative w-full px-2 py-1 rounded text-xs font-sans font-medium transition-all
                    ${isBest ? 'bg-gray-50 text-gray-700' : 'bg-gray-50 text-gray-700'}`}>
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
  const addPhone = useCallback((phone) => {
    if (selectedPhones.length >= maxDevices || selectedPhones.some((p) => p.id === phone.id)) return;

    startTransition(() => {
      const newSelected = [...selectedPhones, phone];
      setSelectedPhones(newSelected);

      router.replace(
        `/compare/${newSelected.map((p) => p.slug).join("-vs-")}`,
        undefined,
        { shallow: true }
      );
    });
  }, [selectedPhones, router]);

  // Remove phone from comparison
  const removePhone = useCallback((phoneId) => {
    startTransition(() => {
      const newSelected = selectedPhones.filter((p) => p.id !== phoneId);
      setSelectedPhones(newSelected);

      router.replace(
        `/compare/${newSelected.map((p) => p.slug).join("-vs-")}`,
        undefined,
        { shallow: true }
      );
    });
  }, [selectedPhones, router]);
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

    return () => { isActive = false }; // cancel state update if unmounted
  }, [debouncedSearch]);

  const renderCategory = (categoryName, categoryKey, isExpandable = false) => {
    const specs = phones[0].specs[isExpandable ? 'expandable' : 'key'][categoryKey];
    if (!specs) return null;

    return (
      <div className="mb-4 bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        {/* Category Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-sky-600">{getCategoryIcon(categoryKey)}</div>
            <h3 className="text-gray-800 font-medium text-xs uppercase tracking-wide">{categoryName}</h3>
          </div>
          {isExpandable && (
            <button
              onClick={() => toggleSection(categoryKey)}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {expandedSections[categoryKey] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          )}
        </div>

        {/* Specs Rows */}
        {(!isExpandable || expandedSections[categoryKey]) &&
          Object.keys(specs).map(specKey => renderSpecRow(categoryKey, specKey, isExpandable))}
      </div>
    );
  };


  return (

    <>
      <div className="bg-white shadow-sm">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Compare up to 4 devices side by side"
            value={searchTerm}
            disabled={selectedPhones.length >= maxDevices}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />

          {/* Suggestions dropdown */}
          {searchTerm && results.length > 0 && selectedPhones.length < maxDevices && (
            <ul className="absolute sm:z-20 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {results.map((phone) => (
                <li
                  key={phone.id}
                  onClick={() => {
                    addPhone(phone); // Add to selected phones
                    setSearchTerm(""); // Clear input
                    setResults([]); // Close dropdown
                  }}
                  className="px-4 py-2 hover:bg-orange-50 cursor-pointer flex justify-between items-center"
                >
                  <span className="flex flex-col">
                    <span className="font-medium">{phone.name}</span>
                    <span className="text-gray-400 text-xs">
                      {phone.brand.name}
                    </span>
                  </span>
                  <span className="text-orange-600 font-semibold">
                    {/* ${phone.price} */}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search status indicator */}
        {searchTerm && searchTerm !== debouncedSearch && (
          <p className="text-xs text-gray-500 mt-2">Searching...</p>
        )}
      </div>
      {/* Phone Cards */}
      <div className={`grid grid-cols-${maxDevices} gap-4 mb-6`}>
        {phones.map((phone) => (
          <div
            key={phone.id}
            className="relative bg-white rounded-2xl shadow-lg p-4 border border-gray-200"
          >
            {/* Remove button */}
            <button
              onClick={() => removePhone(phone.id)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
              title="Remove phone"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={phone.image}
              alt={phone.name}
              className="w-full h-40 object-contain mb-3"
            />

            <h3 className="font-bold text-sm text-gray-900 mb-1">
              {phone.name}
            </h3>

            <p className="text-xs text-gray-500 mb-2">
              {phone.brand}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-blue-600">
                {phone.price ? `$${phone.price}` : "Price TBA"}
              </span>

              {phone.rating !== "0.00" && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{phone.rating}</span>
                </div>
              )}
            </div>
          </div>
        ))}

      </div>

      {/* Show Only Differences Toggle */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-semibold text-gray-700">Show only differences</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={showOnlyDiff}
              onChange={(e) => setShowOnlyDiff(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </div>
        </label>
      </div>

      {/* Key Specs */}
      <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">📊 Key Specifications</h2>
      {renderCategory('Battery', 'battery')}
      {renderCategory('Display', 'display')}
      {renderCategory('Camera', 'camera')}
      {renderCategory('Performance', 'performance')}
      {renderCategory('Software', 'software')}

      {/* Expandable Specs */}
      <h2 className="text-xl font-bold text-gray-900 mb-4 px-2 mt-8">🔍 Detailed Specifications</h2>
      {renderCategory('Design & Build', 'design', true)}
      {renderCategory('Connectivity', 'connectivity', true)}
      {renderCategory('Audio', 'audio', true)}
      {renderCategory('Sensors', 'sensors', true)}

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
    </>
  );
};

export default PhoneComparison;