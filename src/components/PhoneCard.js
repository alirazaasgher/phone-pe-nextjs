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
  X,
} from "lucide-react"; // Icons from Lucide
import { useRouter } from "next/navigation";
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
import Loader from "@/app/loading";
const PhoneCard = ({
  phone,
  isPriority = false,
  fromCompare = false,
  removePhone,
  fromDetailsPage = false,
  phoneSlug = "",
}) => {
  const [open, setOpen] = useState(false);
  const isNew = phone.is_new;
  const isPopular = phone.is_popular;
  const status = phone?.searchIndex?.status;

  const pkrPrice = phone?.searchIndex?.min_price;
  const usdPrice = phone?.searchIndex?.min_price_usd;

  const noPrice = !pkrPrice && !usdPrice;
  const isUpcoming = status === "rumored" || status === "upcoming";

  let displayPKR = "";
  let displayUSD = "";

  if (isUpcoming && noPrice) {
    displayPKR = "Coming Soon";
  } else {
    if (pkrPrice) displayPKR = `Rs. ${pkrPrice}`;
    if (usdPrice) displayUSD = `$${usdPrice}`;
  }
  const storage = phone?.searchIndex?.storage
    ?.toString()
    .toUpperCase()
    .includes("TB")
    ? phone?.searchIndex?.storage
    : `${phone?.searchIndex?.storage}GB`;
  const widthClass =
    displayPKR && displayUSD
      ? "w-[95px] lg:w-[110px]"
      : displayPKR
        ? "w-[85px] lg:w-[95px]"
        : "w-[55px] lg:w-[70px]";
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`${inter.className} relative bg-white rounded-md lg:rounded-xl shadow-md border border-gray-200 group flex flex-col overflow-hidden `}
    >
      {/* Remove Button */}
      {fromCompare && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removePhone(phone.id);
          }}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition z-10"
          title="Remove phone"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Image Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden cursor-pointer">
        <Link
          href={`/${phone.slug}`}
          prefetch={true}
          onClick={() => !isNavigating && setIsNavigating(true)}
          className="block cursor-pointer"
        >
          {/* Loading Overlay */}
          {isNavigating && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <Loader />
            </div>
          )}

          {/* Image */}
          <div className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] lg:w-[240px] lg:h-[240px] mx-auto mt-4 sm:mt-0">
            <Image
              src={phone.primary_image || "/images/default_placeholder.webp"}
              alt={phone.name}
              fill
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 240px"
              className="object-contain p-2 sm:p-4 lg:p-6"
              fetchPriority={isPriority ? "high" : "auto"}
              priority={isPriority}
              quality={85}
            />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Specs + Price */}
          <div className="absolute bottom-0 left-0 lg:p-2">
            {/* Storage Tag */}
            <div className="bg-gray-800 text-white text-[7.5px] lg:text-[10.5px] font-medium px-1 py-1 rounded-tl-md rounded-tr-md shadow-sm">
              {phone?.searchIndex?.ram}GB | {storage}
            </div>

            {/* Price Badge */}
            <div
              className={`bg-gray-100 border border-gray-300 shadow-lg rounded-bl-md rounded-tr-md px-2 py-1 -mt-1 ${widthClass} flex flex-col leading-tight`}
            >
              {displayPKR && (
                <span className="text-[12px] lg:text-[13px] font-bold text-gray-900">
                  {displayPKR}
                </span>
              )}

              {displayUSD && (
                <span className="text-[9px] lg:text-[10px] font-medium text-gray-500">
                  {displayUSD}
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Compare Button */}
        {fromDetailsPage && (
          <div className="absolute bottom-0 right-0 lg:p-2">
            <Link
              href={`/compare/${phoneSlug}-vs-${phone.slug}`}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Compare ${phone.name}`}
              className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] lg:text-[12px] font-semibold px-2 py-1.5 rounded shadow-md transition whitespace-nowrap"
            >
              Compare
            </Link>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="px-2 py-1.5 lg:px-3.5 flex items-start justify-between gap-2 flex-grow">
        <h3 className="font-semibold text-[12px] lg:text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-snug flex-1">
          {phone.brand.name} {phone.name}
        </h3>

        {/* Rating */}
        {phone.rating && (
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 flex-shrink-0 min-w-[48px] justify-center">
            <Star className="text-amber-500 fill-amber-500" size={12} />
            <span className="text-xs font-bold text-amber-700">
              {phone.rating}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneCard;
