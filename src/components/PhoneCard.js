// src/components/PhoneCard.js
"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Cable,
  Cpu,
  RotateCcw,
  Monitor,
  Camera,
  Battery,
  Wifi,
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
import { useState } from "react";
const PhoneCard = ({ phone,isPriority }) => {
  const [open, setOpen] = useState(false);
  const isNew = phone.is_new;
  const isPopular = phone.is_popular;
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const price = phone?.searchIndex?.min_price;
  const status = phone?.status?.toLowerCase();
  const isUpcoming = status === "rumored" || status === "upcoming";

  const noPrice = !price || price === 0;

  // Determine the display price and currency
  let displayPrice = "";
  let currencySymbol = "";

  if (isUpcoming && noPrice) {
    displayPrice = "Coming Soon";
  } else if (price) {
    displayPrice = price;
    currencySymbol = "Rs."; // PKR
  } else if (phone?.searchIndex?.min_price_usd) {
    displayPrice = phone.searchIndex.min_price_usd;
    currencySymbol = "$"; // USD
  }
  const storage = phone?.searchIndex?.storage?.toString().toUpperCase().includes("TB") 
    ? phone?.searchIndex?.storage 
    : `${phone?.searchIndex?.storage}GB`; 

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
  const widthClass =
    currencySymbol === "$" ? "w-[55px] lg:w-[70px]" : "w-[90px] lg:w-[95px]";

  return (
    <div className={`${inter.className} bg-white rounded-md lg:rounded-xl shadow-md border border-gray-200 group flex flex-col relative overflow-hidden`}>
      <Link href={`/${phone.slug}`} className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        
        {/* Image Container */}
        <div className="w-[190px] h-[190px] lg:w-[220px] lg:h-[220px] flex items-center justify-center mx-auto">
          <div className="relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]">
            <Image
              src={phone.primary_image || "/images/default_placeholder.webp"}
              alt={phone.name}
              fill
              sizes="(max-width: 1024px) 150px, 200px"
              className="object-contain p-3 sm:p-6"
              fetchPriority={isPriority ? "high" : "auto"}
              priority={isPriority}
              quality={85}
            />
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Specs and Price Badge */}
        <div className="absolute bottom-0 left-0 lg:p-2">
          {/* Storage Tag */}
          <div className="bg-gray-800 text-white text-[7.5px] lg:text-[10.5px] font-medium px-1 py-1 rounded-tl-md rounded-tr-md shadow-sm">
            {phone?.searchIndex?.ram}GB | {storage}
          </div>
          
          {/* Price Box */}
          <div className={`bg-gray-100 border border-gray-300 shadow-lg rounded-bl-md rounded-tr-md px-1.5 py-0.5 -mt-1 ${widthClass} flex items-baseline gap-0.5`}>
            <span className="text-[8px] lg:text-[10px] font-medium opacity-70">{currencySymbol}</span>
            <span className={`${noPrice ? "text-[11px] lg:text-[12px]" : "text-[12px] lg:text-[13px]"} font-bold text-gray-900`}>
              {displayPrice}
            </span>
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="px-2 py-1.5 lg:px-3.5 flex items-start justify-between gap-2 flex-grow">
        <h3 className="font-bold text-[11.5px] lg:text-sm sm:text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-snug mb-1 flex-1">
          {phone.name}
        </h3>

        {phone.rating && (
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 flex-shrink-0">
            <Star className="text-amber-500 fill-amber-500" size={12} />
            <span className="text-xs font-bold text-amber-700">{phone.rating}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneCard;
