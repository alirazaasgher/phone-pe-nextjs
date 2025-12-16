"use client";
import React, { useEffect, useMemo, useState, useTransition, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Star,
  Camera,
  Battery,
  Smartphone,
  Cpu,
  HardDrive,
  Eye,
  Wifi,
  Plus,
  X,
  Check,
  Monitor,
  Zap,
  Shield,
} from "lucide-react";
import { searchPhones } from "@/app/services/phones";
import Loader from "@/app/loading";
const QuickCompare = ({ phones }) => {
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [visibleSpecs, setVisibleSpecs] = useState(new Set());
  const [firstLoad, setFirstLoad] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Update selected phones on pathname or phones change
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

  // Memoize specs to render
  const specsToRender = useMemo(() => {
    if (!selectedPhones.length) return [];
    const allKeys = Object.keys(selectedPhones[0].specs || {});
    return visibleSpecs.size
      ? allKeys.filter((k) => visibleSpecs.has(k))
      : allKeys;
  }, [selectedPhones, visibleSpecs]);

  // Add phone to comparison
  const addPhone = useCallback((phone) => {
    if (selectedPhones.length >= 4 || selectedPhones.some((p) => p.id === phone.id)) return;

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

  // Toggle spec visibility
  const toggleSpec = useCallback((specKey) => {
    setVisibleSpecs((prev) => {
      const newSet = new Set(prev);
      newSet.has(specKey) ? newSet.delete(specKey) : newSet.add(specKey);
      return newSet;
    });
  }, []);

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

  const getSpecIcon = (specKey) => {
    const icons = {
      dimensions: <Eye className="w-4 h-4" />,
      display: <Monitor className="w-4 h-4" />,
      resolution: <Eye className="w-4 h-4" />,
      refreshRate: <Zap className="w-4 h-4" />,
      processor: <Cpu className="w-4 h-4" />,
      ram: <HardDrive className="w-4 h-4" />,
      storage: <HardDrive className="w-4 h-4" />,
      mainCamera: <Camera className="w-4 h-4" />,
      ultraWide: <Camera className="w-4 h-4" />,
      telephoto: <Camera className="w-4 h-4" />,
      telephoto2: <Camera className="w-4 h-4" />,
      periscope: <Camera className="w-4 h-4" />,
      frontCamera: <Camera className="w-4 h-4" />,
      battery: <Battery className="w-4 h-4" />,
      charging: <Zap className="w-4 h-4" />,
      os: <Smartphone className="w-4 h-4" />,
      build: <Shield className="w-4 h-4" />,
      waterResistance: <Shield className="w-4 h-4" />,
      connectivity: <Wifi className="w-4 h-4" />,
      biometrics: <Shield className="w-4 h-4" />,
      weight: <Shield className="w-4 h-4" />,
      thickness: <Shield className="w-4 h-4" />,
      extras: <Plus className="w-4 h-4" />,
    };
    return icons[specKey] || <Smartphone className="w-4 h-4" />;
  };
  const gridCols = "200px repeat(auto-fit, minmax(100px, 1fr))";
  return (
    <>
      {isPending || firstLoad ? (
        <Loader />
      ) : (
        <div>
          <div className="bg-white shadow-sm border-b">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Compare up to 4 devices side by side"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />

              {/* Suggestions dropdown */}
              {searchTerm && results.length > 0 && (
                <ul className="absolute z-20 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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

          {selectedPhones.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  {selectedPhones.length}/4 selected
                </div>
              </div>

              <div className="mb-4 bg-white rounded-xl shadow-md p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    Filter Specifications
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setVisibleSpecs(
                          new Set(Object.keys(selectedPhones[0]?.specs || {}))
                        )
                      }
                      className="text-xs px-3 py-1 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 font-medium transition-colors"
                    >
                      Select All
                    </button>
                    <button
                      onClick={() => setVisibleSpecs(new Set())}
                      className="text-xs px-3 py-1 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Object.keys(selectedPhones[0]?.specs || {}).map(
                    (specKey) => (
                      <button
                        key={specKey}
                        onClick={() => toggleSpec(specKey)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${visibleSpecs.has(specKey)
                          ? "bg-orange-600 text-white shadow-md hover:bg-orange-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                      >
                        {specKey
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (s) => s.toUpperCase())}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-full border-collapse text-sm">
                    {/* HEADER ROW */}
                    <div
                      className="grid sticky top-0 z-10 bg-white shadow-md"
                      style={{ gridTemplateColumns: gridCols }}
                    >
                      {/* Empty cell for Key column */}
                      <div className="hidden sm:flex sticky left-0 bg-white z-20 p-3 flex items-center border-r border-gray-200">
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Specifications
                        </span>
                      </div>

                      {selectedPhones.map((phone) => (
                        <div
                          key={phone.id}
                          className="p-2 min-w-[220px] border-l border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100"
                        >
                          <div className="space-y-3">
                            {/* Phone Name & Cross Button */}
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-base font-bold text-gray-800 leading-tight mt-1 flex items-center gap-2">
                                {phone.name}
                                <button
                                  onClick={() => removePhone(phone.id)}
                                  className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
                                  title="Remove phone"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </h3>
                            </div>
                            {/* Phone Image - Left Aligned Below Name */}
                            {phone.image && (
                              <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                  src={phone.image}
                                  alt={phone.name}
                                  className="object-contain w-full h-full"
                                />
                              </div>
                            )}

                            {/* Price Badge */}
                            <div className="inline-flex items-center bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg shadow-md">
                              <span className="text-sm font-bold">
                                ${phone.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(phone.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 fill-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-700">
                            {phone.rating}
                          </span>
                        </div> */}
                    {/* SPEC ROWS */}

                    {Object.entries(phones.specs.key || {}).map(([category, specs]) => (
                      <div key={category} className="mb-6">
                        {/* Category Header */}
                        <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-3 border-b-2 border-orange-500">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
                              {getCategoryIcon(category)}
                            </div>
                            <h3 className="text-sm font-bold text-gray-800 uppercase">
                              {category}
                            </h3>
                          </div>
                        </div>

                        {/* Specs in this category */}
                        {Object.entries(specs).map(([specKey, specValue]) => {
                          // Find max value across all phones for this spec
                          const allValues = selectedPhones.map(p =>
                            parseFloat(String(p?.specs?.key?.[category]?.[specKey] ?? '0').match(/[\d.]+/)?.[0])
                          ).filter(Boolean);
                          const maxValue = Math.max(...allValues);

                          return (
                            <div
                              key={specKey}
                              className="grid grid-cols-[200px_repeat(auto-fit,_minmax(100px,_1fr))] hover:bg-blue-50/50 bg-white transition-colors"
                            >
                              {/* KEY COLUMN */}
                              <div className="sticky left-0 z-10 bg-gradient-to-r from-gray-50 to-white p-3 border-r border-gray-200">
                                <span className="text-xs font-medium text-gray-700">
                                  {specKey.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                                </span>
                              </div>

                              {/* VALUES FOR EACH PHONE */}
                              {selectedPhones.map((phone) => {
                                const value = String(phone?.specs?.key?.[category]?.[specKey] ?? 'N/A');
                                const num = parseFloat(value.match(/[\d.]+/)?.[0]);
                                const isHighest = selectedPhones.length > 1 && num && num === maxValue;

                                return (
                                  <div
                                    key={phone.id}
                                    className="px-2 py-2 flex transition-all hover:bg-gray-50"
                                  >
                                    <div
                                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isHighest
                                          ? 'border-2 border-orange-400 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm'
                                          : 'bg-white border border-gray-200'
                                        }`}
                                    >
                                      <span className="text-xs font-medium">{value || 'N/A'}</span>
                                      {isHighest && (
                                        <svg className="w-4 h-4 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};


// {/* Mobile: stacked layout */}
//                           <div className="sm:hidden px-3 py-2">
//                             <div className="text-xs font-semibold text-gray-700 mb-1">
//                               {specKey
//                                 .replace(/([A-Z])/g, " $1")
//                                 .replace(/^./, (s) => s.toUpperCase())}
//                             </div>
//                             <div className="flex items-center gap-2 flex-wrap text-xs">
//                               {selectedPhones.map((phone, idx) => {
//                                 const value = String(
//                                   phone?.specs?.[specKey] ?? "N/A"
//                                 );
//                                 return (
//                                   <span key={phone.id}>
//                                     {value}
//                                     {idx < selectedPhones.length - 1 && " vs "}
//                                   </span>
//                                 );
//                               })}
//                             </div>
//                           </div>
export default QuickCompare;
