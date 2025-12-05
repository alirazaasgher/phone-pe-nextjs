"use client";
import React from "react";
import {
  Shield,
  Smartphone,
  HardDrive,
  Monitor,
  Camera,
  Cpu,
  Battery,
  Zap,
  Heart,
  Share2,
  ChevronRight,
  Star,
  Check,
  Search,
  X,
  Sparkles,
  Info,
  RefreshCw,
  Truck,
  ArrowLeftRight,
  ThumbsUp,
  AlertCircle,
  Minus,
  Award,
  TrendingUp,
  MessageSquare,
  Wifi,
  Cable,
  BatteryCharging,
  MemoryStick,
  Gauge,
  Volume2,
  Fingerprint,
  ShieldCheck,
  RotateCcw,
  Clock,
  TruckIcon,
  Bot,
  Facebook,
  Twitter,
  MessageCircle,
  Package,
  CpuIcon,
  Scale,
  Plus,
  Droplet,
  Calendar,
  Layers,
  Type,
  Weight,
  DollarSign,
  SdCard,
  MonitorSmartphone,
} from "lucide-react";
import VariantImageGallery from "@/components/VariantImageGallery";
import MobileSpeficaion from "@/components/MobileSpecfications";
import Variants from "@/components/common/Variants";
export default function Details({ phoneDetails }) {
  const specs1 = [
    {
      icon: <Camera size={16} className="text-sky-500" />,
      name: "Camera",
      value: (
        <span className="inline-flex items-center gap-1">
          <span className="text-blue-600">200</span> vs{" "}
          <span className="text-red-600">48MP</span>
        </span>
      ),
    },
    {
      icon: <Monitor size={16} className="text-purple-500" />,
      name: "Display",
      value: (
        <span className="inline-flex items-center gap-1">
          <span className="text-blue-600">8.0"</span> vs{" "}
          <span className="text-red-600">6.9"</span>
        </span>
      ),
    },
    {
      icon: <Battery size={16} className="text-green-500" />,
      name: "Battery",
      value: (
        <span className="inline-flex items-center gap-1">
          <span className="text-red-600">4400</span>
          <span className="text-[8px] lg:text-[10px] font-medium opacity-70">
            VS.
          </span>
          <span className="text-blue-600">4832</span>
          {/* <span className="text-[8px] lg:text-[10px] font-medium opacity-70">
            mAh
          </span> */}
        </span>
      ),
    },
    {
      icon: <DollarSign size={16} className="text-orange-500" />,
      name: "Price",
      value: (
        <span className="inline-flex items-center gap-1">
          <span className="text-[8px] lg:text-[10px] font-medium opacity-70"></span>
          <span className="text-blue-600">75,000</span> vs
          <span className="text-red-600">72,000</span>
        </span>
      ),
    },
  ];

  const specs = [
    // 1. Processor & Performance (Most Important - determines overall capability)
    {
      icon: <Cpu className="w-3.5 h-3.5 text-red-500" />,
      label: "Snapdragon 8 Gen 3",
      sub: "Octa-core (3.3GHz) • RAM LPDDR5X",
      color: "red",
    },

    // 2. Display (First thing users see and interact with)
    {
      icon: <Monitor className="w-3.5 h-3.5 text-purple-500" />,
      label: '6.8" AMOLED Display',
      sub: "2800×1260 • 144Hz • HDR10+ • 2000 nits",
      color: "purple",
    },

    // 3. Camera System (Major decision factor)
    {
      icon: <Camera className="w-3.5 h-3.5 text-sky-500" />,
      label: "200MP Main + 8MP Ultra-Wide",
      sub: "OIS • 8K@30fps • Night Mode • f/1.65",
      color: "sky",
    },

    // 4. Battery & Fast Charging (Critical for daily use)
    {
      icon: <BatteryCharging className="w-3.5 h-3.5 text-green-500" />,
      label: "5000mAh Silicon-Carbon Battery",
      sub: (
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex items-center">
            <Cable className="w-3 h-3 mr-0.5 text-orange-600" />
            <span className="font-bold text-orange-700">120W Wired</span>
          </span>
          <span className="inline-flex items-center">
            <Wifi className="w-3 h-3 mr-0.5 text-blue-600" />
            <span className="font-bold text-blue-700">50W Wireless</span>
          </span>
          <span className="inline-flex items-center">
            <RotateCcw className="w-3 h-3 mr-0.5 text-gray-600" />
            <span className="font-bold text-gray-800">10W Reverse</span>
          </span>
        </span>
      ),
      color: "green",
    },

    {
      icon: <Layers className="w-3.5 h-3.5 text-slate-500" />,
      label: "Gorilla Glass Victus 2",
      sub: "Titanium Frame • IP68 Water Resistant",
      color: "slate",
    },

    {
      icon: <Shield className="w-3.5 h-3.5 text-indigo-500" />,
      label: "Android 15 + HyperOS",
      sub: "4 Years OS Updates • 5 Years Security",
      color: "indigo",
    },
  ];

  const iconMap = {
    display: { icon: Monitor, color: "bg-indigo-100", text: "text-indigo-600" },
    main_camera: { icon: Camera, color: "bg-rose-100", text: "text-rose-600" },
    battery: {
      icon: Battery,
      color: "bg-emerald-100",
      text: "text-emerald-600",
    },
    chipset: { icon: Cpu, color: "bg-amber-100", text: "text-amber-600" },
    wired: { icon: Cable, color: "text-orange-500", text: "text-orange-500" },
    wireless: { icon: Wifi, color: "text-blue-600", text: "text-blue-600" },
    reverse: {
      icon: RotateCcw,
      color: "text-orange-600",
      text: "text-orange-600",
    },
  };
  let widthClass = "w-[250px] 2xl:w-[350px]"; // default
  if (phoneDetails.variants.length >= 1 && phoneDetails.variants.length <= 3)
    widthClass = "w-[280px] sm:w-[250px] 2xl:w-[350px]";
  return (
    <>
      <div className="hidden md:flex relative px-5 py-2 bg-white/60 backdrop-blur-xl border-b border-gray-200/60 items-center justify-between shadow-sm">
        {/* Left: Name & Release */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight group transition-all duration-300">
            <span className="group-hover:text-blue-600">
              {phoneDetails.name}
            </span>
          </h1>

          <p className="text-xs text-gray-600 mt-2 flex items-center gap-2">
            {/* <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200 shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              {phoneDetails.release_date || "TBA"}
            </span> */}

            {/* <span className="text-gray-400 font-medium">•</span> */}

            {/* <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 shadow-sm font-medium">
              <Smartphone className="w-3.5 h-3.5" />
              Flagship Android
            </span> */}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {[
            {
              icon: <Facebook className="w-4 h-4" />,
              color: "blue",
              bg: "blue",
            },
            { icon: <Twitter className="w-4 h-4" />, color: "sky", bg: "sky" },
            {
              icon: <MessageCircle className="w-4 h-4" />,
              color: "green",
              bg: "green",
            },
          ].map((btn, i) => (
            <button
              key={i}
              className={`p-2 rounded-full bg-${btn.bg}-50 text-${btn.color}-600 hover:bg-${btn.bg}-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm`}
            >
              {btn.icon}
            </button>
          ))}

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: phoneDetails.name,
                  text: `Check out the ${phoneDetails.name}!`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl
            bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm
            hover:from-blue-600 hover:to-indigo-700 transition-all duration-300
            hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="lg:flex lg:flex-row items-center sm:items-start py-2 sm:py-3">
          {/* Image Gallery */}
          <VariantImageGallery phone={phoneDetails} />

          {/* Right Specs */}
          <div className="flex-1 flex flex-col gap-1">
            {/* Top Specs & Variants Section */}
            <div className="flex flex-col lg:flex-row gap-1">
              {/* Left: Top Specs List */}
              <ul
                // sm:inline
                className={` hidden ${widthClass} leading-tight overflow-hidden bg-gradient-to-br from-white to-gray-50/50`}
              >
                {[
                  {
                    icon: <Calendar className="w-4 h-4 text-green-600" />,
                    text: "Gorilla Glass Victus 2",
                    subText: "IP68 Water Resistant",
                  },
                  {
                    icon: <Smartphone className="w-4 h-4 text-teal-600" />,
                    text: "206g • 8mm Thickness",
                    subText: "Titanium Frame",
                  },
                  {
                    icon: <Shield className="w-4 h-4 text-indigo-500" />,
                    text: "Android 16 • HyperOS 3",
                    subText: "4-Year OS & 5-Year Security",
                  },
                  {
                    icon: <Cpu className="w-4 h-4 text-orange-600" />,
                    text: "Snapdragon 8 Gen 3 (4nm)",
                    subText: "Octa-core",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-1 py-1 px-1 ${
                      i !== 0 ? "border-t border-gray-200/60" : ""
                    } hover:bg-white/70 transition-all duration-200 cursor-pointer group`}
                  >
                    <div className="flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-lg p-1 group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-inter">
                        {item.text}
                      </span>
                      <span className="text-[11px] font-sans text-gray-500">
                        {item.subText}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex-1 w-full">
                <Variants variants={phoneDetails?.variants} />
              </div>
            </div>
            <div className="md:hidden flex items-center justify-between border-b border-gray-100 bg-white py-2">
              {/* LEFT SECTION */}
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-gray-900 leading-tight">
                  {phoneDetails.name}
                </h1>
                <span className="text-[11px] text-gray-500 mt-0.5">
                  Released: {phoneDetails.release_date || "TBA"}
                </span>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex items-center gap-1.5">
                {/* Social Icons */}
                <button
                  className="p-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>

                <button
                  className="p-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>

                <button
                  className="p-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
                  aria-label="Whatsapp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>

                {/* Share Button */}
                <button
                  aria-label="Share"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: phoneDetails.name,
                        text: `Check out the ${phoneDetails.name}!`,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied");
                    }
                  }}
                  className="p-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-900 hover:text-white transition"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              {phoneDetails?.searchIndex?.specs_grid.map((item, i) => {
                if (!item.value) return null;
                const IconComponent = iconMap[item.key].icon;
                const textColor = iconMap[item.key].text;
                const backgroundColor = iconMap[item.key].color;
                return (
                  <li
                    key={i}
                    className={`${backgroundColor} ${
                      item.key === "chipset" ? "flex lg:hidden" : "flex"
                    } flex flex-col items-start p-2 border border-gray-200/80 rounded-md bg-gradient-to-br from-white to-gray-50/40 cursor-pointer group`}
                  >
                    <div className="text-center group-hover:scale-110 transition-transform duration-200">
                      <IconComponent size={20} className={`${textColor}`} />
                    </div>
                    {item.key !== "battery" && (
                      <>
                        <span className="font-inter text-[12px]">
                          {item.value}
                        </span>
                        <span className="text-[11px] text-gray-500 font-sans">
                          {item.subvalue}
                        </span>
                      </>
                    )}

                    {item.key === "battery" && (
                      <>
                        <span className="font-inter text-[12px]">
                          {item.value}
                        </span>
                        <div className="flex items-center gap-2">
                          {typeof item.subvalue === "object" &&
                          !Array.isArray(item.subvalue) ? (
                            // 👉 Case: subvalue is an object → loop
                            Object.entries(item.subvalue).map(
                              ([key, value]) => {
                                if (!value) return null;
                                const IconComponent = iconMap[key]?.icon;
                                const textColor = iconMap[key]?.color;

                                return (
                                  <span
                                    key={key}
                                    className="flex items-center gap-1"
                                  >
                                    {IconComponent && (
                                      <IconComponent
                                        size={13}
                                        className={textColor}
                                      />
                                    )}
                                    <span className="text-[10px] font-bold text-gray-800">
                                      {value}
                                    </span>
                                  </span>
                                );
                              }
                            )
                          ) : (
                            <span className="text-[10px] font-bold text-gray-800">
                              {item.subvalue}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-full border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            {/* LEFT SECTION — Specifications */}
            <div className="lg:col-span-9 border-gray-100">
              <MobileSpeficaion phoneDetails={phoneDetails} />
            </div>

            {/* RIGHT SECTION — Competitors */}
            {/* <div className="lg:col-span-3 p-2 bg-gradient-to-b from-gray-50 to-white border border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-blue-500">
                Competitors for {phoneDetails.name || "OPPO Find X9"}
              </h3>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                <div className="group border  bg-white rounded-lg p-2 shadow-md border-blue-400 transition-all duration-300">

                  <div className="flex items-center gap-3 mb-1">
                    <img
                      src="https://www.91-img.com/pictures/170930-v7-oppo-find-x9-pro-mobile-phone-medium-1.jpg?tr=q-70"
                      alt="OPPO Find X9 Pro"
                      className="w-16 h-20 object-contain rounded-md bg-gray-50 flex-shrink-0"
                    />
                    <div>
                      <a
                        href="/oppo-find-x9-pro-price-in-india"
                        className="block text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        OPPO Find X9 Pro
                      </a>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-700 rounded-full">
                        Upcoming
                      </span>
                    </div>
                  </div>


                  <div className="max-w-sm border-t border-gray-700 mx-auto bg-white overflow-hidden">

                    <div className="text-[11px] font-medium text-gray-600 mt-2">
                      Phone Comparison
                    </div>


                    <div className="w-full text-[11px] text-gray-700">

                      {specs1.map((spec, i) => (
                        <div
                          key={i}
                          className={`group flex items-center justify-between py-1.5
                                                 shadow-sm rounded-lg border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-200 rounded-sm px-1 -mx-1 ${spec.hideOnSmall
                              ? "hidden sm:flex"
                              : ""
                            }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center text-gray-500 truncate">
                              {spec.icon}
                            </span>
                            <span className="text-gray-800 font-bold">
                              {spec.name}
                            </span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {spec.value}
                          </span>
                        </div>
                      ))}


                      <div className="border-t border-gray-100 mt-2 pt-1"></div>


                      <div className="text-[12px] font-semibold text-gray-800 mb-1">
                        Common Features
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-500 truncate">
                          <MemoryStick className="text-blue-500 mr-1 w-4 h-4" />{" "}
                          RAM
                        </span>
                        <span className="font-semibold text-gray-900 truncate ml-2">
                          12 GB
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-500 truncate">
                          <HardDrive className="text-green-500  mr-1 w-4 h-4" />{" "}
                          Memory
                        </span>
                        <span className="font-semibold text-gray-900 truncate ml-2">
                          256 GB
                        </span>
                      </div>
                    </div>


                    <div className="flex justify-end mt-4">
                      <a
                        href="/compare/OPPO/Find+X9+Pro/vs/OPPO/Find+X9.html"
                        className="inline-flex items-center px-4 py-2 text-[12px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                      >
                        Compare Now →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group border  bg-white rounded-lg p-2 shadow-md border-blue-400 transition-all duration-300">

                  <div className="flex items-center gap-3 mb-1">
                    <img
                      src="https://www.91-img.com/pictures/170930-v7-oppo-find-x9-pro-mobile-phone-medium-1.jpg?tr=q-70"
                      alt="OPPO Find X9 Pro"
                      className="w-16 h-20 object-contain rounded-md bg-gray-50 flex-shrink-0"
                    />
                    <div>
                      <a
                        href="/oppo-find-x9-pro-price-in-india"
                        className="block text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        OPPO Find X9 Pro
                      </a>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-700 rounded-full">
                        Upcoming
                      </span>
                    </div>
                  </div>


                  <div className="max-w-sm border-t border-gray-700 mx-auto bg-white overflow-hidden">

                    <div className="text-[11px] font-medium text-gray-600 mt-2">
                      Phone Comparison
                    </div>


                    <div className="w-full text-[11px] text-gray-700">

                      {specs1.map((spec, i) => (
                        <div
                          key={i}
                          className={`group flex items-center justify-between py-1.5
                                                 shadow-sm rounded-lg border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-200 rounded-sm px-1 -mx-1 ${spec.hideOnSmall
                              ? "hidden sm:flex"
                              : ""
                            }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center text-gray-500 truncate">
                              {spec.icon}
                            </span>
                            <span className="text-gray-800 font-bold">
                              {spec.name}
                            </span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {spec.value}
                          </span>
                        </div>
                      ))}


                      <div className="border-t border-gray-100 mt-2 pt-1"></div>


                      <div className="text-[12px] font-semibold text-gray-800 mb-1">
                        Common Features
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-500 truncate">
                          <MemoryStick className="text-blue-500 mr-1 w-4 h-4" />{" "}
                          RAM
                        </span>
                        <span className="font-semibold text-gray-900 truncate ml-2">
                          12 GB
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-500 truncate">
                          <HardDrive className="text-green-500  mr-1 w-4 h-4" />{" "}
                          Memory
                        </span>
                        <span className="font-semibold text-gray-900 truncate ml-2">
                          256 GB
                        </span>
                      </div>
                    </div>


                    <div className="flex justify-end mt-4">
                      <a
                        href="/compare/OPPO/Find+X9+Pro/vs/OPPO/Find+X9.html"
                        className="inline-flex items-center px-4 py-2 text-[12px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                      >
                        Compare Now →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
