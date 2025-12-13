"use client";
import React, { useState } from "react";
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

const MobileComparisonApp = () => {
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Detailed mobile data
  const phones = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
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

  const filteredPhones = phones.filter(
    (phone) =>
      phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPhone = (phone) => {
    if (
      selectedPhones.length < 4 &&
      !selectedPhones.find((p) => p.id === phone.id)
    ) {
      setSelectedPhones([...selectedPhones, phone]);
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

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Mobile Compare
                </h1>
                <p className="text-sm text-gray-600">
                  Detailed specifications comparison
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search phones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Selected Phones Comparison */}
      {selectedPhones.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Phone Comparison
              </h2>
              <p className="text-gray-600 mt-1">
                Compare up to 3 devices side by side
              </p>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
              {selectedPhones.length}/4 selected
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    {selectedPhones.map((phone) => (
                      <th
                        key={phone.id}
                        className="text-left p-4 w-1/3 min-w-[260px]"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="text-xl font-bold text-gray-900 mb-1">
                                {phone.name}
                              </div>
                              <div className="text-sm font-medium text-gray-600 mb-3">
                                {phone.brand}
                              </div>
                              <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-md">
                                {phone.price}
                              </div>
                            </div>
                            <button
                              onClick={() => removePhone(phone.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                              title="Remove from comparison"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(phone.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm font-semibold text-gray-700">
                              {phone.rating} / 5
                            </span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.keys(selectedPhones[0]?.specs || {}).map(
                    (specKey, index) => (
                      <tr
                        key={specKey}
                        className={`transition-all duration-200 hover:bg-blue-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="p-1 w-[22%] text-[11px] text-gray-600 sticky left-0 bg-gray-100 border-r">
                          <div className="flex items-center gap-1">
                            <span className="text-blue-600 shrink-0">
                              {getSpecIcon(specKey)}
                            </span>

                            <span className="truncate leading-tight">
                              {specKey
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </span>
                          </div>
                        </td>

                        {selectedPhones.map((phone) => {
                          const currentValue = phone.specs[specKey] || "N/A";
                          const allValues = selectedPhones.map(
                            (p) => p.specs[specKey] || "N/A"
                          );
                          const allSame = allValues.every(
                            (v) => v === allValues[0]
                          );

                          // Extract numeric values for comparison
                          const numericValues = allValues.map((val) => {
                            const match = val.toString().match(/[\d.]+/);
                            return match ? parseFloat(match[0]) : null;
                          });

                          const currentNumeric = currentValue
                            .toString()
                            .match(/[\d.]+/);
                          const currentNum = currentNumeric
                            ? parseFloat(currentNumeric[0])
                            : null;

                          const hasNumericValues = numericValues.some(
                            (v) => v !== null
                          );
                          const maxValue = hasNumericValues
                            ? Math.max(
                                ...numericValues.filter((v) => v !== null)
                              )
                            : null;
                          const isHighest =
                            hasNumericValues &&
                            currentNum !== null &&
                            currentNum === maxValue;

                          return (
                            <td key={phone.id} className="p-1">
                              <div className="flex items-center space-x-3">
                                {isHighest && !allSame ? (
                                  <div className="flex-shrink-0 bg-green-100 rounded-full p-1">
                                    <Check className="w-2 h-2 text-green-600" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 flex-shrink-0"></div>
                                )}
                                <span
                                  className={`text-xs ${
                                    isHighest && !allSame
                                      ? "text-green-500"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {currentValue}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Available Phones */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Available Phones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhones.map((phone) => {
            const isSelected = selectedPhones.find((p) => p.id === phone.id);
            const canAdd = selectedPhones.length < 4;

            return (
              <div
                key={phone.id}
                className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow ${
                  isSelected ? "ring-2 ring-green-500" : ""
                }`}
              >
                <div className="p-2">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {phone.name}
                    </h3>
                    <p className="text-gray-600">{phone.brand}</p>
                    <div className="text-xl font-bold text-gray-900 mt-2">
                      {phone.price}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(phone.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({phone.rating})
                    </span>
                  </div>

                  <div className="space-y-2 mb-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Display:</span>
                      <span className="text-gray-900 font-medium">
                        {phone.specs.display}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processor:</span>
                      <span className="text-gray-900 font-medium">
                        {phone.specs.processor}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RAM:</span>
                      <span className="text-gray-900 font-medium">
                        {phone.specs.ram}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Storage:</span>
                      <span className="text-gray-900 font-medium">
                        {phone.specs.storage}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addPhone(phone)}
                    disabled={!canAdd || isSelected}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                      isSelected
                        ? "bg-green-500 text-white"
                        : canAdd
                        ? "bg-gray-900 hover:bg-gray-800 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>
                          {canAdd ? "Add to Compare" : "Limit Reached"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileComparisonApp;
