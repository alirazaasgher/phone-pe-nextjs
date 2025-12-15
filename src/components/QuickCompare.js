"use client";
import React, { useEffect, useMemo, useState } from "react";
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
const allPhones = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    slug:"iphone-15-pro-max",
    brand: "Apple",
    price: "$1199",
    rating: 4.8,
    specs: {
      display: '6.7" Super Retina XDR OLED',
      resolution: "2796 x 1290 pixels, 460 PPI",
      refreshRate: "120Hz ProMotion",
      processor: "A17 Pro (3nm)",
      ram: "8GB LPDDR5",
      storage: "256GB/512GB/1TB NVMe",
      mainCamera: "48MP f/1.78 Main",
      ultraWide: "12MP f/2.2 Ultra Wide",
      telephoto: "12MP f/2.8 Telephoto (5x)",
      frontCamera: "12MP f/1.9 TrueDepth",
      battery: "4441mAh",
      charging: "27W Wired, 15W MagSafe",
      os: "iOS 17",
      build: "Titanium frame, Glass back",
      waterResistance: "IP68 (6m for 30min)",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
      biometrics: "Face ID",
      weight: "221g",
      thickness: "8.25mm",
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    slug:"samsung-galaxy-s24-ultra",
    brand: "Samsung",
    price: "$1299",
    rating: 4.7,
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      resolution: "3120 x 1440 pixels, 505 PPI",
      refreshRate: "120Hz LTPO",
      processor: "Snapdragon 8 Gen 3 (4nm)",
      ram: "12GB LPDDR5X",
      storage: "256GB/512GB/1TB UFS 4.0",
      mainCamera: "200MP f/1.7 OIS",
      ultraWide: "12MP f/2.2 Ultra Wide",
      telephoto: "50MP f/3.4 Periscope (5x)",
      telephoto2: "10MP f/2.4 Telephoto (3x)",
      frontCamera: "12MP f/2.2",
      battery: "5000mAh",
      charging: "45W Wired, 15W Wireless",
      os: "Android 14, One UI 6.1",
      build: "Aluminum frame, Glass back",
      waterResistance: "IP68",
      connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
      biometrics: "Ultrasonic Fingerprint",
      weight: "232g",
      thickness: "8.6mm",
      extras: "S Pen included",
    },
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    slug:"google-pixel-8-pro",
    brand: "Google",
    price: "$999",
    rating: 4.6,
    specs: {
      display: '6.7" LTPO OLED',
      resolution: "2992 x 1344 pixels, 489 PPI",
      refreshRate: "120Hz LTPO",
      processor: "Google Tensor G3 (4nm)",
      ram: "12GB LPDDR5X",
      storage: "128GB/256GB/512GB UFS 3.1",
      mainCamera: "50MP f/1.68 OIS",
      ultraWide: "48MP f/1.95 Ultra Wide",
      telephoto: "48MP f/2.8 Periscope (5x)",
      frontCamera: "10.5MP f/2.2",
      battery: "5050mAh",
      charging: "30W Wired, 23W Wireless",
      os: "Android 14",
      build: "Aluminum frame, Glass back",
      waterResistance: "IP68",
      connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
      biometrics: "Optical Fingerprint",
      weight: "213g",
      thickness: "8.8mm",
      extras: "Magic Eraser, Live Translate",
    },
  },
  {
    id: 4,
    name: "OnePlus 12",
    slug:"oneplus-12",
    brand: "OnePlus",
    price: "$799",
    rating: 4.5,
    specs: {
      display: '6.82" LTPO AMOLED',
      resolution: "3168 x 1440 pixels, 510 PPI",
      refreshRate: "120Hz LTPO",
      processor: "Snapdragon 8 Gen 3 (4nm)",
      ram: "12GB/16GB LPDDR5X",
      storage: "256GB/512GB UFS 4.0",
      mainCamera: "50MP f/1.6 OIS",
      ultraWide: "48MP f/2.2 Ultra Wide",
      telephoto: "64MP f/2.6 Periscope (3x)",
      frontCamera: "32MP f/2.4",
      battery: "5400mAh",
      charging: "100W Wired, 50W Wireless",
      os: "OxygenOS 14 (Android 14)",
      build: "Aluminum frame, Glass back",
      waterResistance: "IP65",
      connectivity: "5G, Wi-Fi 7, Bluetooth 5.4",
      biometrics: "Optical Fingerprint",
      weight: "220g",
      thickness: "9.15mm",
      extras: "Alert Slider",
    },
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra",
    slug:"Xiaomi-14-ultra",
    brand: "Xiaomi",
    price: "$1099",
    rating: 4.4,
    specs: {
      display: '6.73" LTPO AMOLED',
      resolution: "3200 x 1440 pixels, 522 PPI",
      refreshRate: "120Hz LTPO",
      processor: "Snapdragon 8 Gen 3 (4nm)",
      ram: "16GB LPDDR5X",
      storage: "512GB/1TB UFS 4.0",
      mainCamera: "50MP f/1.63 Variable Aperture",
      ultraWide: "50MP f/1.8 Ultra Wide",
      telephoto: "50MP f/1.8 Telephoto (3.2x)",
      periscope: "50MP f/2.5 Periscope (5x)",
      frontCamera: "32MP f/2.0",
      battery: "5300mAh",
      charging: "90W Wired, 80W Wireless",
      os: "HyperOS (Android 14)",
      build: "Aluminum frame, Eco Leather back",
      waterResistance: "IP68",
      connectivity: "5G, Wi-Fi 7, Bluetooth 5.4",
      biometrics: "Ultrasonic Fingerprint",
      weight: "229g",
      thickness: "9.2mm",
      extras: "Leica cameras",
    },
  },
];
const QuickCompare = () => {
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname(); // current path: /compare/[phones]
    const addPhone = (phone) => {
    if (selectedPhones.length >= 4) return;
    if (!selectedPhones.find(p => p.id === phone.id)) {
      const newSelected = [...selectedPhones, phone];
      setSelectedPhones(newSelected);

      const url = newSelected.map(p => p.slug).join("-vs-");
      router.replace(`/compare/${url}`); // shallow navigation in App Router
    }
  };

  const removePhone = (phoneId) => {
    setSelectedPhones(selectedPhones.filter((p) => p.id !== phoneId));
  };

  const getSpecIcon = (specKey) => {
    const icons = {
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
  const gridCols =
    "200px repeat(auto-fit, minmax(100px, 1fr))";

  // 1. ADD STATE AT TOP OF COMPONENT (with other useState hooks)
  const [visibleSpecs, setVisibleSpecs] = useState(new Set());

  const specsToRender = useMemo(() => {
    const allKeys = Object.keys(selectedPhones[0]?.specs || {});
    return visibleSpecs.size ? allKeys.filter(k => visibleSpecs.has(k)) : allKeys;
  }, [selectedPhones, visibleSpecs]);

  // 3. ADD TOGGLE FUNCTION
  const toggleSpec = (specKey) => {
    setVisibleSpecs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(specKey)) {
        newSet.delete(specKey);
      } else {
        newSet.add(specKey);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter phones based on debounced search
  const filteredPhones = debouncedSearch
    ? allPhones.filter((phone) =>
      phone.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      phone.brand.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    : [];
  return (
    <>
      {/* Header */}
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
          {searchTerm && filteredPhones.length > 0 && (
            <ul className="absolute z-20 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredPhones.map((phone) => (
                <li
                  key={phone.id}
                  onClick={() => addPhone(phone)}
                  className="px-4 py-2 hover:bg-orange-50 cursor-pointer flex justify-between items-center"
                >
                  <span>
                    {phone.name} <span className="text-gray-400 text-xs">({phone.brand})</span>
                  </span>
                  <span className="text-orange-600 font-semibold">{phone.price}</span>
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
              {Object.keys(selectedPhones[0]?.specs || {}).map((specKey) => (
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
              ))}
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
                  <div className="sticky left-0 bg-white z-20 p-3 flex items-center border-r border-gray-200">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Specifications
                    </span>
                  </div>

                  {selectedPhones.map((phone) => (
                    <div
                      key={phone.id}
                      className="p-4 min-w-[220px] border-l border-gray-200"
                    >
                      <div className="space-y-3">
                        {/* Phone Name & Brand */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="text-base font-bold text-gray-800 leading-tight">
                              {phone.name}
                            </h3>
                            <p className="text-xs font-medium text-gray-500 mt-1">
                              {phone.brand}
                            </p>
                          </div>

                          <button
                            onClick={() => removePhone(phone.id)}
                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                            title="Remove phone"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price Badge */}
                        <div className="inline-flex items-center bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg shadow-md">
                          <span className="text-sm font-bold">{phone.price}</span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(phone.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 fill-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-700">
                            {phone.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


                {/* SPEC ROWS */}
                {specsToRender.map((specKey, index) => {
                  const allValues = selectedPhones.map((p) => p.specs[specKey] || "N/A");
                  const numericValues = allValues.map((val) => {
                    const match = val.toString().match(/[\d.]+/);
                    return match ? parseFloat(match[0]) : null;
                  });
                  const maxValue = Math.max(...numericValues.filter((v) => v !== null));

                  return (
                    <div
                      key={specKey}
                      className={`grid transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        } hover:bg-blue-50/50 border-b border-gray-100 last:border-b-0`}
                      style={{ gridTemplateColumns: gridCols }}
                    >
                      {/* KEY COLUMN */}
                      <div className="sticky left-0 z-10 bg-gradient-to-r from-gray-100 to-gray-50 p-3 border-r border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                            {getSpecIcon(specKey)}
                          </div>
                          <span className="text-xs font-semibold text-gray-700 truncate">
                            {specKey
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (s) => s.toUpperCase())}
                          </span>
                        </div>
                      </div>


                      {/* VALUES */}
                      {selectedPhones.map((phone) => {
                        const value = phone.specs[specKey] || "N/A";
                        const num = parseFloat(value.toString().match(/[\d.]+/)?.[0]);

                        // Only consider highest if more than 1 phone
                        const isHighest = selectedPhones.length > 1 && num && num === maxValue;

                        return (
                          <div
                            key={phone.id}
                            className={`px-2 py-2 flex transition-all duration-200 hover:bg-gray-50`}
                          >
                            <div
                              className={`flex items-center gap-2 ${isHighest
                                ? "px-3 py-1.5 rounded-lg border-2 border-orange-400 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm"
                                : "px-3 py-1.5 rounded-lg bg-white"
                                }`}
                            >
                              <span className={`text-xs`}>
                                {value}
                              </span>
                              {isHighest && (
                                <svg
                                  className="w-4 h-4 text-white animate-pulse"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickCompare;
