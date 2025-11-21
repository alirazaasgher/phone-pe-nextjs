"use client";
import React, { useState, useMemo, useEffect } from "react";
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
  Fingerprint, ShieldCheck, RotateCcw, Clock, TruckIcon, Bot, Facebook, Twitter, MessageCircle, Package,
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
  MonitorSmartphone
} from "lucide-react";
import VariantImageGallery from "@/components/VariantImageGallery";
import PhoneCard from "@/components/PhoneCard";
import mobiles from "../../data/homepage";
import MobileSpeficaion from "@/components/MobileSpecfications";
import ColorSelector from "@/components/ColorSelector";
export default function Details({ phoneDetails }) {
  const phones = mobiles?.data?.topNewMobiles || [];
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 12;
  const getCurrentItems = () => {
    return phones.slice(startIndex, startIndex + itemsPerPage);
  };
  const BatteryInfo = () => (
    <span className="inline-flex items-center gap-2">
      {/* Wired Charging */}
      <span className="inline-flex items-center">
        <Cable className="w-3 h-3 mr-0.5 text-orange-600" />
        <span className="font-bold text-orange-700">120W</span>
      </span>

      {/* Wireless Charging */}
      <span className="inline-flex items-center">
        <Wifi className="w-3 h-3 mr-0.5 text-blue-600" />
        <span className="font-bold text-blue-700">50W</span>
      </span>

      {/* Reverse Charging */}
      <span className="inline-flex items-center">
        <RotateCcw className="w-3 h-3 mr-0.5 text-gray-600" />
        <span className="font-bold text-gray-800">10W</span>
      </span>
    </span>
  );
   const specs1 = [
    {
      icon: <Camera size={16} className="text-sky-500" />,
      name: "Camera",
      value: (
        <span className="inline-flex items-center gap-1">
          <span className="text-blue-600">200MP</span> vs <span className="text-red-600">48MP</span>
        </span>
      ),
    },
    {
      icon: <Monitor size={16} className="text-purple-500" />,
      name: "Display",
      value: (
        <span className="inline-flex items-center gap-1">
          <span className="text-blue-600">8.0"</span> vs <span className="text-red-600">6.9"</span>
        </span>
      ),
    },
    {
      icon: <Battery size={16} className="text-green-500" />,
      name: "Battery",
      value: (
        <span className="inline-flex items-center gap-1">
          <span className="text-red-600">4400</span> vs <span className="text-blue-600">4832 mAh</span>
        </span>
      ),
    },
    {
      icon: <Weight size={16} className="text-orange-500" />,
      name: "Weight",
      value: (
        <span className="inline-flex items-center gap-1">
          <span className="text-blue-600">215g</span> vs <span className="text-red-600">231g</span>
        </span>
      ),
    },
    {
  icon: <Shield size={16} className="text-orange-500" />,
  name: "Updates",
  value: (
    <span className="inline-flex items-center gap-1">
      <span className="text-blue-600">4 yrs</span> vs{" "}
      <span className="text-red-600">5 yrs</span>
    </span>
  ),
},
    {
      icon: <DollarSign size={16} className="text-orange-500" />,
      name: "Price",
      value: (
        <span className="inline-flex items-center gap-1">
           <span className="text-[8px] lg:text-[10px] font-medium opacity-70">Rs.</span>
            <span className="text-blue-600">75,000</span> vs 
             <span className="text-[8px] lg:text-[10px] font-medium opacity-70">Rs.</span>
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
      color: "red"
    },

    // 2. Display (First thing users see and interact with)
    {
      icon: <Monitor className="w-3.5 h-3.5 text-purple-500" />,
      label: "6.8\" AMOLED Display",
      sub: "2800×1260 • 144Hz • HDR10+ • 2000 nits",
      color: "purple"
    },

    // 3. Camera System (Major decision factor)
    {
      icon: <Camera className="w-3.5 h-3.5 text-sky-500" />,
      label: "200MP Main + 8MP Ultra-Wide",
      sub: "OIS • 8K@30fps • Night Mode • f/1.65",
      color: "sky"
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
      color: "green"
    },

    {
      icon: <Layers className="w-3.5 h-3.5 text-slate-500" />,
      label: "Gorilla Glass Victus 2",
      sub: "Titanium Frame • IP68 Water Resistant",
      color: "slate"
    },

    {
      icon: <Shield className="w-3.5 h-3.5 text-indigo-500" />,
      label: "Android 15 + HyperOS",
      sub: "4 Years OS Updates • 5 Years Security",
      color: "indigo"
    },
  ];



  const variants = [
    { ram: "8GB", storage: "128GB", price: "₹27,999", tag: "", tagColor: "bg-blue-100 text-blue-700" },
    { ram: "12GB", storage: "256GB", price: "₹31,499", tag: "", tagColor: "bg-green-100 text-green-700" }
  ];

  const colorMap = {
  red: "bg-red-100",
  purple: "bg-blue-50 border-blue-200",
  sky: "bg-sky-100",
  green: "bg-green-100",
  slate: "bg-slate-100",
  indigo: "bg-indigo-100",
};

  return (
    <>
      <div className="hidden md:flex relative px-5 py-3 bg-gradient-to-r from-gray-50 via-white to-gray-100 border-b border-gray-200 items-center justify-between shadow-sm">
        {/* Left: Name & Release */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors duration-200">
            {phoneDetails.name}
          </h1>
          <p className="text-xs text-gray-600 mt-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded-md border border-green-200">
              <Calendar className="w-3 h-3" />
              {phoneDetails.release_date || "TBA"}
            </span>
            <span className="text-gray-400">•</span>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md font-medium border border-indigo-200">
              <Smartphone className="w-3 h-3" />
              Flagship Android
            </span>
          </p>
        </div>

        {/* Right: Share Icons + Share Button */}
        <div className="flex items-center gap-2">
          {/* Social Icons */}

          <a href={`#`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 hover:scale-110"
            title="Share on Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>


          <a href={`#`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white transition-all duration-200 hover:scale-110"
            title="Share on Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>


          <a href={`#`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200 hover:scale-110"
            title="Share on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* General Share Button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: phoneDetails.name,
                  text: `Check out the ${phoneDetails.name}!`,
                  url: window.location.href,
                });
              } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
      <div className="w-full">
     <div className="flex flex-col lg:flex-row items-start py-3">
          {/* Image Gallery */}
    <VariantImageGallery phone={phoneDetails} />


 {/* Right Specs */}
<div className="flex-1 flex flex-col gap-1">
      {/* Top Specs & Variants Section */}
      <div className="flex flex-col lg:flex-row gap-1 items-start">
        {/* Left: Top Specs List */}
        <ul className="w-full lg:w-[280px] text-[14px] leading-tight border border-gray-200/80 rounded-xl overflow-hidden bg-gradient-to-br from-white to-gray-50/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {[
            { icon: <Calendar className="w-3 h-3 text-green-600" />, text: "Released 2025, October 23", subText: "Official launch date" },
            { icon: <Smartphone className="w-3 h-3 text-teal-600" />, text: "206g, 8mm thickness", subText: "Weight & Thickness" },
            { icon: <Shield className="w-3.5 h-3.5 text-indigo-500" />, text: "Android 16, HyperOS 3", subText: "OS Version" },
            { icon: <Cpu className="w-3.5 h-3.5 text-orange-600" />, text: "Snapdragon 8 Gen 3 (4nm)", subText: "Processor" },
          ].map((item, i) => (
            <li
              key={i}
              className={`flex items-center gap-2 py-1 px-2 ${
                i !== 0 ? "border-t border-gray-200/60" : ""
              } hover:bg-white/70 transition-all duration-200 cursor-pointer group`}
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-lg p-1 group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-semibold">{item.text}</span>
                <span className="text-gray-500 text-sm">{item.subText}</span>
              </div>
            </li>
          ))}
        </ul>
         {/* <ColorSelector
          colors={phoneDetails.colors}
          selectedColor={phoneDetails.colors[0].name}
          // onSelect={setSelectedColor}
        /> */}
        

        {/* Right: Variants */}
        <ul className="w-full lg:flex-1 grid grid-cols-2 gap-2 pl-2 pr-2">
          {[
            { ram:"4", storage: "256GB", type: "SSD", priceUSD: 799, pricePKR: 350000 },
            { ram:"8", storage: "512GB", type: "SSD", priceUSD: 899, pricePKR: 400000 },
            { ram:"12", storage: "1TB", type: "SSD", priceUSD: 1099, pricePKR: 490000 },
            { ram:"16", storage: "1TB", type: "Pro SSD", priceUSD: 1299, pricePKR: 580000 },
          ].map((variant, i, arr) => {
            let colSpan = "col-span-1";
            if (arr.length === 1) colSpan = "col-span-2";
            if (arr.length === 3 && i === 2) colSpan = "col-span-2";

            return (
              <li
                key={i}
                className={`flex flex-col gap-2 p-2 rounded-xl bg-gradient-to-br from-white via-white to-gray-50/30 border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] hover:border-gray-300/80 cursor-pointer transition-all duration-300 group ${colSpan}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-500 font-medium">{variant.ram}GB</span>
                    <span className="text-sm font-bold text-gray-900">{variant.storage}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      variant.type.includes("Pro")
                        ? "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200/50"
                        : "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200/50"
                    } shadow-sm group-hover:scale-105 transition-transform duration-200`}
                  >
                    {variant.type}
                  </span>
                </div>
                <span className="font-bold text-gray-900 tracking-tight">
                  ${variant.priceUSD}{" "}
                  <span className="text-gray-500 text-xs font-medium">
                    / PKR {variant.pricePKR.toLocaleString()}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      

      {/* Specs Grid Below */}
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {[
          { icon: <MonitorSmartphone className="w-6 h-6 text-green-600" />, value: "6.59\"", subvalue: "1156x2510 pixels" },
          { icon: <Camera className="w-6 h-6 text-teal-600" />, value: "50MP", subvalue: "4320p" },
          { icon: <Battery className="w-6 h-6 text-orange-600" />, value: "7100mAh", subvalue: "100W" },
        ].map((item, i) => (
          <li
            key={i}
            className="flex flex-col items-start gap-1 p-3 border border-gray-200/80 rounded-xl bg-gradient-to-br from-white to-gray-50/40 shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:border-gray-300/80 transition-all duration-300 cursor-pointer group"
          >
            <div className="text-center group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
            <span className="text-base font-bold text-gray-900">{item.value}</span>
            <span className="text-xs text-gray-500 font-medium">{item.subvalue}</span>
          </li>
        ))}
      </ul>
    </div>


        </div>
        <div className="md:hidden p-3 flex items-start justify-between">
          {/* Left Section — Phone Name + Release Date */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {phoneDetails.name}
            </h1>
            <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1.5">
              <span>Released: {phoneDetails.release_date || "TBA"}</span>
            </p>
          </div>

          {/* Right Section — Social Icons */}
          <div className="flex items-center gap-2">
            {/* Social Icons */}
            <a
              href={`#`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a
              href={`#`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 transition"
              title="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href={`#`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* General Share Button */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: phoneDetails.name,
                    text: `Check out the ${phoneDetails.name}!`,
                    url: window.location.href,
                  });
                } else {
                  alert("Sharing not supported on this browser");
                }
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 font-medium text-sm hover:bg-blue-100 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Variant Selector */}
        <div className="md:hidden p-3 border-t border-gray-200">
          {/* Header */}
          <div className="flex items-center gap-1 mb-2">
            <div className="bg-white p-1 rounded-xl shadow-sm">
              <Package className="w-4 h-4 text-orange-500" />
            </div>
            <h3 className="text-gray-900 text-sm font-semibold tracking-tight">
              Available Variants
            </h3>
          </div>

          <div className="">
            {[
              { ram: "8GB + 128GB", price: "₹27,999", storage: "UFS 3.1" },
              { ram: "12GB + 256GB", price: "₹31,499", storage: "UFS 4.0" },
            ].map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs bg-white/50 rounded-lg px-2 py-1 hover:bg-white transition-all"
              >
                <span className="text-gray-800 font-medium">{v.ram}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{v.price}</span>
                  <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md text-[10px] font-medium">
                    {v.storage}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-500 italic mt-2">
            Dual SIM (Hybrid) • No SD card slot
          </p>

        </div>
        <div className="w-full border-t border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            {/* LEFT SECTION — Specifications */}
            <div className="lg:col-span-9 border-gray-100">
              <MobileSpeficaion phoneDetails={phoneDetails} />
            </div>

            {/* RIGHT SECTION — Competitors */}
            <div className="lg:col-span-3 p-2 bg-gradient-to-b from-gray-50 to-white border border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-blue-500">
                Competitors for {phoneDetails.name || "OPPO Find X9"}
              </h3>

              {/* Competitors List */}
              <div className="max-h-[600px]">

                {/* Competitor Card */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                <div className="group border  bg-white rounded-lg p-2 shadow-md border-blue-400 transition-all duration-300">

                  {/* Row 1 — Image & Name */}
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

                  {/* Row 2 — Specs + Compare Button */}
                  <div className="max-w-sm border-t border-gray-700 mx-auto bg-white overflow-hidden">
                    {/* Header */}
                    <div className="text-[11px] font-medium text-gray-600 mt-2">Phone Comparison</div>

                    {/* Comparison List */}
                    <div className="w-full text-[11px] text-gray-700">
                      {/* Camera */}
                      {specs1.map((spec, i) => (
                        <div
                          key={i}
                          className={`group flex items-center justify-between py-1.5
                                                 shadow-sm rounded-lg border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-200 rounded-sm px-1 -mx-1 ${spec.hideOnSmall ? "hidden sm:flex" : ""}`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center text-gray-500 truncate">
                              {spec.icon}
                            </span>
                            <span className="text-gray-800 font-bold">{spec.name}</span>
                          </div>
                          <span className="font-bold text-gray-900">{spec.value}</span>
                        </div>
                      ))}

                      {/* Divider */}
                      <div className="border-t border-gray-100 mt-2 pt-1"></div>

                      {/* Common Features */}
                      <div className="text-[12px] font-semibold text-gray-800 mb-1">Common Features</div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-500 truncate">
                          <MemoryStick className="text-blue-500 mr-1 w-4 h-4" /> RAM
                        </span>
                        <span className="font-semibold text-gray-900 truncate ml-2">12 GB</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-500 truncate">
                          <HardDrive className="text-green-500  mr-1 w-4 h-4" /> Internal Memory
                        </span>
                        <span className="font-semibold text-gray-900 truncate ml-2">256 GB</span>
                      </div>
                    </div>

                    {/* Compare Button */}
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

                  {/* Row 1 — Image & Name */}
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

                  {/* Row 2 — Specs + Compare Button */}
                  <div className="max-w-sm border-t border-gray-700 mx-auto bg-white overflow-hidden">
                    {/* Header */}
                    <div className="text-[11px] font-medium text-gray-600 mt-2">Phone Comparison</div>

                    {/* Comparison List */}
                    <div className="w-full text-[11px] text-gray-700">
                      {/* Camera */}
                      {specs1.map((spec, i) => (
                        <div
                          key={i}
                          className={`group flex items-center justify-between py-1.5
                                                 shadow-sm rounded-lg border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-200 rounded-sm px-1 -mx-1 ${spec.hideOnSmall ? "hidden sm:flex" : ""}`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center text-gray-500 truncate">
                              {spec.icon}
                            </span>
                            <span className="text-gray-800 font-bold">{spec.name}</span>
                          </div>
                          <span className="font-bold text-gray-900">{spec.value}</span>
                        </div>
                      ))}

                      {/* Divider */}
                      <div className="border-t border-gray-100 mt-2 pt-1"></div>

                      {/* Common Features */}
                      <div className="text-[12px] font-semibold text-gray-800 mb-1">Common Features</div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-500 truncate">
                          <MemoryStick className="text-blue-500 mr-1 w-4 h-4" /> RAM
                        </span>
                        <span className="font-semibold text-gray-900 truncate ml-2">12 GB</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-500 truncate">
                          <HardDrive className="text-green-500  mr-1 w-4 h-4" /> Internal Memory
                        </span>
                        <span className="font-semibold text-gray-900 truncate ml-2">256 GB</span>
                      </div>
                    </div>

                    {/* Compare Button */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}


