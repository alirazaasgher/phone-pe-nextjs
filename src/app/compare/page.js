"use client";
import { useState, useEffect } from "react";
import {
  DollarSign,
  Monitor,
  Cpu,
  MemoryStick,
  HardDrive,
  Battery,
  Camera,
  Sparkles,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  Award,
  X,
} from "lucide-react";

export default function ComparePage() {
  const [devices, setDevices] = useState([
    {
      name: "Xiaomi 15T",
      image:
        "https://api.mobile42.com/storage/colors/7AcKyt6qnoDt0vJ9KtsRfjPIqWzCXUjySuGVte8H.webp",
      price: 500,
      display: "6.1 inch OLED",
      processor: "Snapdragon 888",
      ram: 8,
      storage: 128,
      battery: "4000mAh",
      camera: "12MP",
      features: ["5G", "Fast Charging"],
      link: "#",
    },
    {
      name: "Galaxy A36 5G",
      image:
        "https://api.mobile42.com/storage/colors/79HA28agagwgQtAU2yXUjezH2QsihyOlqKMv9yni.webp",
      price: 550,
      display: "6.5 inch AMOLED",
      processor: "Snapdragon 888",
      ram: 12,
      storage: 256,
      battery: "4500mAh",
      camera: "108MP",
      features: ["5G", "Fast Charging"],
      link: "#",
    },
    {
      name: "Device C",
      image:
        "https://api.mobile42.com/storage/colors/79HA28agagwgQtAU2yXUjezH2QsihyOlqKMv9yni.webp",
      price: 550,
      display: "6.5 inch AMOLED",
      processor: "Snapdragon 888",
      ram: 12,
      storage: 256,
      battery: "4500mAh",
      camera: "108MP",
      features: ["5G", "Fast Charging"],
      link: "#",
    },
    {
      name: "Device D",
      image:
        "https://api.mobile42.com/storage/colors/79HA28agagwgQtAU2yXUjezH2QsihyOlqKMv9yni.webp",
      price: 550,
      display: "6.5 inch AMOLED",
      processor: "Snapdragon 888",
      ram: 12,
      storage: 256,
      battery: "4500mAh",
      camera: "108MP",
      features: ["5G", "Fast Charging"],
      link: "#",
    },
  ]);
  const getComparison = (field, value, index) => {
    const values = devices.map((d) => {
      if (field === "price") return d.price;
      if (field === "ram") return d.ram;
      if (field === "storage") return d.storage;
      if (field === "battery") return parseInt(d.battery);
      return 0;
    });

    const max = Math.max(...values);
    const min = Math.min(...values);

    if (field === "price") {
      if (value === min)
        return {
          status: "best",
          icon: Award,
          color: "text-green-600 bg-green-50",
        };
      if (value === max)
        return {
          status: "worst",
          icon: TrendingUp,
          color: "text-red-600 bg-red-50",
        };
    } else {
      if (value === max)
        return {
          status: "best",
          icon: Award,
          color: "text-green-600 bg-green-50",
        };
      if (value === min)
        return {
          status: "worst",
          icon: TrendingDown,
          color: "text-orange-600 bg-orange-50",
        };
    }

    return {
      status: "neutral",
      icon: Minus,
      color: "text-gray-600 bg-gray-50",
    };
  };

  const removeDevice = (index) => {
    if (devices.length > 2) {
      setDevices(devices.filter((_, i) => i !== index));
    }
  };

  const specs = [
    { label: "Display", icon: Monitor, color: "text-blue-600", key: "display" },
    {
      label: "Processor",
      icon: Cpu,
      color: "text-purple-600",
      key: "processor",
    },
    {
      label: "RAM",
      icon: MemoryStick,
      color: "text-orange-600",
      key: "ram",
      suffix: "GB",
      compare: true,
    },
    {
      label: "Storage",
      icon: HardDrive,
      color: "text-indigo-600",
      key: "storage",
      suffix: "GB",
      compare: true,
    },
    {
      label: "Battery",
      icon: Battery,
      color: "text-green-600",
      key: "battery",
      compare: true,
    },
    { label: "Camera", icon: Camera, color: "text-pink-600", key: "camera" },
  ];
  const getHighlight = (key, value, deviceIndex) => {
    if (devices.length < 2) return "";
    const values = devices.map((d) => d[key]);
    if (key === "price") {
      // lower price is better
      return value === Math.min(...values)
        ? "bg-green-200"
        : value === Math.max(...values)
        ? "bg-red-200"
        : "";
    } else if (["ram", "storage", "battery"].includes(key)) {
      // higher is better
      return value === Math.max(...values)
        ? "bg-green-200"
        : value === Math.min(...values)
        ? "bg-red-200"
        : "";
    }
    return "";
  };
  const comingSoon = true; // toggle when ready
  // const [devices, setDevices] = useState(devicesData);
  if (comingSoon) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="backdrop-blur-lg rounded-3xl shadow-lg p-8 sm:p-12 w-full max-w-md text-center animate-fadeIn bg-white/0">
          {/* Optional: Replace this with a nicer icon or Lottie animation */}
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-gray-800 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m4-2h.01M12 8v.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900">
            Compare Page
          </h1>
          <p className="text-gray-700 mb-8 text-base sm:text-lg">
            This feature is coming soon! 🚀
          </p>
          <a
            href="/mobiles"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transition"
          >
            Go Back to Mobiles
          </a>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search mobiles..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-6">
        {/* Brand Filter */}
        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-2 py-1"
            // value={selectedBrand}
            // onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All</option>
            <option value="Samsung">Samsung</option>
            <option value="Apple">Apple</option>
            <option value="Xiaomi">Xiaomi</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-2 py-1"
            // value={selectedPrice}
            // onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">All</option>
            <option value="0-200">0 - 200</option>
            <option value="201-400">201 - 400</option>
            <option value="401-600">401 - 600</option>
          </select>
        </div>

        {/* RAM Filter */}
        <div>
          <label className="block mb-1 font-medium">RAM</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-2 py-1"
            // value={selectedRam}
            // onChange={(e) => setSelectedRam(e.target.value)}
          >
            <option value="">All</option>
            <option value="4">4GB</option>
            <option value="6">6GB</option>
            <option value="8">8GB</option>
            <option value="12">12GB</option>
          </select>
        </div>

        {/* Storage Filter */}
        <div>
          <label className="block mb-1 font-medium">Storage</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-2 py-1"
            // value={selectedStorage}
            // onChange={(e) => setSelectedStorage(e.target.value)}
          >
            <option value="">All</option>
            <option value="64">64GB</option>
            <option value="128">128GB</option>
            <option value="256">256GB</option>
            <option value="512">512GB</option>
          </select>
        </div>

        {/* Battery Filter */}
        <div>
          <label className="block mb-1 font-medium">Battery</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-2 py-1"
            // value={selectedBattery}
            // onChange={(e) => setSelectedBattery(e.target.value)}
          >
            <option value="">All</option>
            <option value="3000">3000mAh+</option>
            <option value="4000">4000mAh+</option>
            <option value="5000">5000mAh+</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 text-center">
          {/* Table Head */}
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-2 text-left font-semibold">
                Specification
              </th>
              {devices.map((device, index) => (
                <th key={index} className="py-3 px-2">
                  <div className="flex flex-col items-center gap-2">
                    {/* Remove Button */}
                    {devices.length > 2 && (
                      <button
                        onClick={() => removeDevice(index)}
                        className="bg-white rounded-full p-1 shadow hover:bg-red-50 transition-all duration-200"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4 text-gray-400 hover:text-red-600" />
                      </button>
                    )}

                    {/* Device Image */}
                    <img
                      src={device.image}
                      alt={device.name}
                      className="w-24 h-24 object-contain"
                    />
                    <span className="font-semibold text-gray-900">
                      {device.name}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {specs.map((spec) => (
              <tr key={spec.key}>
                <td className="py-1 px-1 font-medium text-left">
                  {spec.label}
                </td>
                {devices.map((device, index) => {
                  const value = device[spec.key];
                  const displayValue = spec.suffix
                    ? `${value}${spec.suffix}`
                    : value;

                  if (spec.compare) {
                    const comparison = getComparison(
                      spec.key,
                      spec.key === "battery" ? parseInt(value) : value,
                      index
                    );
                    const CompIcon = comparison.icon;
                    return (
                      <td key={index} className={`py-3 px-2`}>
                        <div
                          className={`flex items-center justify-center gap-1 p-1 rounded-lg ${
                            comparison.color
                          } border ${
                            comparison.status === "best"
                              ? "border-green-200"
                              : comparison.status === "worst"
                              ? "border-orange-200"
                              : "border-gray-200"
                          }`}
                        >
                          <CompIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {displayValue}
                          </span>
                        </div>
                      </td>
                    );
                  }

                  return (
                    <td key={index} className="py-3 px-2">
                      <span className="text-sm text-gray-700">
                        {displayValue}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Features Row */}
            <tr>
              <td className="py-3 px-2 font-medium text-left">Features</td>
              {devices.map((device, index) => (
                <td key={index} className="py-3 px-2">
                  <div className="flex flex-wrap justify-center gap-1">
                    {device.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* CTA Row */}
            <tr>
              <td></td>
              {devices.map((device, index) => (
                <td key={index} className="py-3 px-2">
                  <a
                    href={device.link}
                    className="block bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-semibold text-center"
                  >
                    View Full Specs
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
