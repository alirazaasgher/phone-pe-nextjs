// src/components/PhoneCard.js
"use client";
import Link from "next/link";
import {
  Star,
  Eye,
  X,
  Plus,
  Calendar,
  Cable,
  Smartphone,
  Cpu,
  RotateCcw,
  Monitor,
  Camera,
  Battery,
  Shield,
  Wifi,
  MemoryStick,
  HardDrive,
} from "lucide-react"; // Icons from Lucide
import { Inter, Poppins } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import { motion, AnimatePresence } from "framer-motion";
import QuickViewDrawer from "@/components/QuickViewDrawer";
import { useState } from "react";
const PhoneCard = ({ phone, handleCompare, comparedPhones = [] }) => {
  const [open, setOpen] = useState(false);
  const isNew = phone.is_new;
  const isUpcoming = phone.is_upcoming;
  const isPopular = phone.is_popular;
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isCompared = comparedPhones.some((p) => p.id === phone.id);
  const getTagColor = (tag) => {
    if (tag.includes("5G") || tag.includes("WiFi"))
      return "bg-green-100 text-green-700";
    if (tag.includes("Snapdragon") || tag.includes("Bionic"))
      return "bg-purple-100 text-purple-700";
    if (tag.includes("MP") || tag.includes("Camera"))
      return "bg-blue-100 text-blue-700";
    if (tag.includes("GB") || tag.includes("TB"))
      return "bg-gray-100 text-gray-700";
    if (tag.includes("Pro") || tag.includes("Max"))
      return "bg-indigo-100 text-indigo-700";
    return "bg-blue-100 text-blue-700"; // default
  };

  const openModal = (phone) => {
    setIsHoverEnabled(false);
    setSelectedPhone(phone);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpen(false);
    setTimeout(() => setSelectedPhone(null), 300);
  };

  const iconMap = {
    display: <Monitor size={14} className="text-purple-500" />,
    main_camera: <Camera size={14} className="text-sky-500" />,
    battery: <Battery size={14} className="text-green-500" />,
    chipset: <Cpu size={15} className="text-orange-500" />,
  };
  return (
    <>
      <div
        className={`
    ${inter.className}
    bg-white
    rounded-md
    lg:rounded-xl
    shadow-md
    border border-gray-200
    group
    flex flex-col
    relative
    overflow-hidden
  `}
      >
        {/* Product Image */}
        <Link
          href={`/${phone.slug}`}
          className="relative group bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
        >
          <div className="flex-shrink-0 flex justify-center items-center h-full">
            <div className="w-[190px] h-[190px] lg:w-[220px] lg:h-[220px] flex items-center justify-center">
              <img
                src={phone.primary_image || "images/default_placeholder.webp"}
                alt={phone.name}
                loading="lazy"
                className="object-contain mix-blend-multiply max-w-[150px] max-h-[150px] lg:max-w-[200px] lg:max-h-[200px] p-3 sm:p-6"
              />
            </div>
          </div>

          {/* Hover Overlay */}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Specs and Price */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start lg:p-2">
            <div className="relative inline-flex flex-col items-start group">
              {/* Storage Tag */}
              <div className="bg-gray-800  text-white text-[7.5px] lg:text-[10.5px] font-medium px-1 py-1 rounded-tl-md rounded-tr-md shadow-sm">
                {phone?.searchIndex?.ram}GB |{" "}
                {phone?.searchIndex?.storage?.toString().toUpperCase().includes("TB")
                  ? phone?.searchIndex?.storage
                  : `${phone?.searchIndex?.storage}GB`}
              </div>

              {/* Main Price Box */}
              <div className="bg-gray-100 border border-gray-300  shadow-lg rounded-bl-md rounded-tr-md px-1.5 py-0.5 -mt-1 w-[65px] lg:w-[95px] flex items-center">
                <div className="flex items-baseline gap-0.5 w-full">
                  <span className="text-[8px] lg:text-[10px] font-medium opacity-70">
                    Rs.
                  </span>
                  <span className="text-[9px] lg:text-[15px] font-bold text-gray-900">
                    {phone?.searchIndex?.min_price
                      ? phone?.searchIndex?.min_price
                      : "67,999"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Before Tag (bottom right) */}
          {/* <div className="absolute bottom-1 left-3 right-0 bg-white rounded-md shadow-md border border-gray-200 px-1 text-[8px] text-gray-500">
      Before <span className="line-through text-red-500">₱69,999</span>
    </div> */}

          {/* Price Tag */}
          {/* <div className="relative group">
      <span className="relative z-10 flex items-center gap-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500 text-white text-[10px] lg:text-[12px] font-bold px-2 py-1 lg:px-2.5 lg:py-1.5 rounded-lg shadow-lg">
        <span className="text-[8px] lg:text-[9px] font-medium opacity-90">Rs.</span>
        <span className="tracking-tight">{phone.searchIndex.min_price.toLocaleString()}</span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-lg blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-200"></div>
    </div> */}
          {/* Quick View Button */}
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              openModal(phone);
            }}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-lg"
            title="Quick View"
          >
            <Eye size={16} />
          </button> */}
        </Link>

        {/* Product Details */}
        <div className="px-2 py-1.5 lg:px-3.5 flex flex-col flex-grow">
          {/* Name & Rating Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col flex-1">
              <h3 className="font-bold text-[11.5px] lg:text-sm sm:text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-snug mb-1">
                {phone.name}
              </h3>
            </div>
            {phone.rating && (
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 flex-shrink-0">
                <Star className="text-amber-500 fill-amber-500" size={12} />
                <span className="text-xs font-bold text-amber-700">
                  {phone.rating}
                </span>
              </div>
            )}
          </div>

          {/* Key Specs Row */}
          <div className="w-full">
            {(phone?.searchIndex?.specs_grid ?? []).map((spec, i) => {
              if (!spec.value) return null;
              const hzMatch = spec.subvalue?.match(/(\d+Hz)/i);
              const refreshRate = hzMatch ? hzMatch[1] : null;
              return (
                <div
                  key={i}
                  className={`group flex items-center justify-between lg:py-1
                            shadow-sm rounded-lg border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-200 rounded-sm px-2 -mx-1 hidden sm:flex`}
                >
                  <div className="flex items-center gap-1 lg:gap-1.5">
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {iconMap[spec.key]}
                    </span>
                    <span className="text-gray-700 text-[10px] font-bold">
                      {spec.key.toUpperCase()}
                    </span>
                    {spec.badge && (
                      <span
                        className={`hidden lg:inline-block px-1 py-0.5 rounded text-[8px] font-bold ${spec.badgeColor}`}
                      >
                        {spec.badge}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-0.5">
                    <span className="text-[9px] text-gray-600">
                      {spec.value}
                    </span>
                    {/* Show only when spec.key is display and refreshRate exists */}
                    {spec.key === "display" && refreshRate && (
                      <span className="text-[9px] px-1 py-0.5 bg-purple-50 text-purple-700 rounded">
                        {refreshRate}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <QuickViewDrawer phone={phone} open={open} setOpen={setOpen} /> */}
      {/* Premium Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPhone && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModal} // Close when clicking backdrop
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()} // Prevent inside click close
            >
              {/* Header */}
              <div className="sticky top-0 flex justify-between items-center px-6 py-4 border-b bg-white/90 backdrop-blur z-10">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">
                    {selectedPhone.name}
                  </h2>
                  <p className="text-gray-500">{selectedPhone.brand}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-full p-2 hover:bg-red-100 transition group"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-transform group-hover:rotate-90" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 grid lg:grid-cols-2 gap-6">
                {/* Left Side: Image + Colors */}
                <div className="space-y-6">
                  {/* Image with price tag */}
                  <div className="relative group">
                    <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 shadow-lg overflow-hidden border border-gray-200/50 backdrop-blur-sm">
                      <img
                        src={selectedPhone.image_url}
                        alt={`${selectedPhone.name} - ${selectedPhone.brand}`}
                        className="w-full h-[22rem] object-contain transition-all duration-300 group-hover:scale-105 cursor-zoom-in p-6"
                        loading="lazy"
                      />
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2.5 rounded-full shadow-lg font-bold text-base backdrop-blur-sm border border-green-400/20 hover:shadow-xl transition-all hover:scale-105">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{selectedPhone.price}</span>
                    </div>

                    {/* Brand Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 px-4 py-2 rounded-full shadow-md border border-gray-200/50 font-semibold text-sm">
                      {selectedPhone.brand}
                    </div>

                    {/* Zoom hint on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-black/80 text-white px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-md flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                          />
                        </svg>
                        Click to zoom
                      </div>
                    </div>
                  </div>

                  {/* Colors Section */}
                  <div className="bg-white rounded-xl p-5 border border-gray-200/50 shadow-sm">
                    <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center justify-center">
                      <span className="w-1.5 h-5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full mr-2.5"></span>
                      Available Colors
                      <span className="ml-2.5 text-xs font-normal text-gray-500">
                        {selectedPhone.colors.length}{" "}
                        {selectedPhone.colors.length === 1
                          ? "option"
                          : "options"}
                      </span>
                    </h4>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {selectedPhone.colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center gap-2 group cursor-pointer"
                        >
                          <div className="relative">
                            <button
                              className="relative w-12 h-12 rounded-full border-2 border-gray-300 shadow-md ring-2 ring-transparent hover:ring-indigo-500 hover:ring-offset-2 hover:scale-110 transition-all duration-200 hover:shadow-xl active:scale-95"
                              style={{
                                backgroundColor:
                                  color.toLowerCase() === "white"
                                    ? "#ffffff"
                                    : color.toLowerCase() === "black"
                                    ? "#1a1a1a"
                                    : color.toLowerCase(),
                              }}
                              title={color}
                              aria-label={`${color} color option`}
                            >
                              {/* Shine effect */}
                              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>

                              {/* Check icon for white color visibility */}
                              {color.toLowerCase() === "white" && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                </span>
                              )}
                            </button>

                            {/* Selection indicator placeholder */}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full border-2 border-white shadow-md opacity-0 group-hover:opacity-0 transition-opacity flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>

                          <span className="text-xs text-gray-700 font-medium capitalize group-hover:text-indigo-600 transition-colors">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Specs + Features */}
                <div className="space-y-6">
                  {/* Specs */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Smartphone className="w-5 h-5 mr-2 text-indigo-600" />
                      Specifications
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-5 border border-gray-200/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(selectedPhone.specs).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow duration-200"
                            >
                              <span className="text-sm text-gray-600 capitalize font-medium">
                                {key.replace(/_/g, " ")}
                              </span>
                              <span className="text-sm font-bold text-gray-900 ml-3 text-right">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-purple-600" />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedPhone.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg hover:from-purple-100 hover:to-indigo-100 transition"
                        >
                          <span className="text-green-600">✓</span>
                          <span className="text-gray-800">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 px-6 py-4 border-t bg-white flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition">
                  View Full Details
                </button>
                <button className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
                  Add to Compare
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhoneCard;
