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
const PhoneCard = ({ phone }) => {
  const [open, setOpen] = useState(false);
  const isNew = phone.is_new;
  const isPopular = phone.is_popular;
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const price = phone?.searchIndex?.min_price;
  const status = phone?.status?.toLowerCase();
  const isUpcoming = status === "rumored" || status === "upcoming";

  const noPrice = !price || price == 0;
  console.log(noPrice);
  const showPrice = isUpcoming && noPrice ? "Coming Soon" : price || "NA";
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
    wired: <Cable size={15} className="w-3 h-3 mr-0.5 text-orange-500" />,
    wireless: <Wifi className="w-3 h-3 mr-0.5  text-blue-600" />,
    reverse: (
      <RotateCcw className="w-3 h-3 mr-0.5 text-orange-600 text-gray-600" />
    ),
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Specs and Price */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start lg:p-2">
            <div className="relative inline-flex flex-col items-start group">
              {/* Storage Tag */}
              <div className="bg-gray-800  text-white text-[7.5px] lg:text-[10.5px] font-medium px-1 py-1 rounded-tl-md rounded-tr-md shadow-sm">
                {phone?.searchIndex?.ram}GB |{" "}
                {phone?.searchIndex?.storage
                  ?.toString()
                  .toUpperCase()
                  .includes("TB")
                  ? phone?.searchIndex?.storage
                  : `${phone?.searchIndex?.storage}GB`}
              </div>

              {/* Main Price Box */}
              <div className="bg-gray-100 border border-gray-300  shadow-lg rounded-bl-md rounded-tr-md px-1.5 py-0.5 -mt-1 w-[65px] lg:w-[95px] flex items-center">
                <div className="flex items-baseline gap-0.5 w-full">
                  {!noPrice && (
                    <span className="text-[8px] lg:text-[10px] font-medium opacity-70">
                      Rs.
                    </span>
                  )}

                  <span
                    className={`text-${noPrice ? "[7.5px]" : "[9px]"} lg:text-${
                      noPrice ? "[12px]" : "[15px]"
                    } font-bold text-gray-900`}
                  >
                    {showPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
              let hzMatch = null;
              if (!spec.value) return null;
              if (typeof spec?.subvalue === "string") {
                hzMatch = spec.subvalue.match(/(\d+Hz)/i);
              }
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
                      {spec.key.toUpperCase().split("_")[0]}
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
                    {spec.key !== "battery" && (
                      <span className="text-[9px] text-gray-600">
                        {spec.value}
                      </span>
                    )}

                    {spec.key === "display" && refreshRate && (
                      <span className="text-[9px] px-1 py-0.5 bg-purple-50 text-purple-700 rounded">
                        {refreshRate}
                      </span>
                    )}
                    {spec.key === "battery" && (
                      <>
                        <span className="text-[9px] text-gray-600">
                          {spec.value}
                        </span>
                        {Object.entries(spec.subvalue).map(([key, value]) => {
                          if (!value) return null;
                          return (
                            <span
                              key={key}
                              className={`flex items-center  ${
                                key === "reverse" ? "hidden 2xl:flex" : "flex"
                              }`}
                            >
                              {iconMap[key]}
                              <span className="text-[9px] text-gray-600">
                                {value}
                              </span>
                            </span>
                          );
                        })}
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneCard;
