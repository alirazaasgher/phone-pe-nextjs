"use client";
// import { useState } from "react";
import {
  Smartphone,
  TrendingUp,
  DollarSign,
  Sparkles,
  Wifi,
  Apple,
  Square,
  Circle,
  Star as StarIcon,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Scale,
  Flame,
  Lightbulb,
  Phone,
} from "lucide-react";
import PhoneCard from "./PhoneCard";
import { Inter, Poppins } from "next/font/google";
import BrandsData from "@/data/BrandsData";
// Module-scope declaration
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import { useRef, useState, useEffect } from "react";
import PriceCategoriesData from "@/data/PriceCategoriesData";
import Link from "next/link";
export default function HomeContent({ homePageResponse }) {
  // ✅ Brands with icons

  const phones = homePageResponse?.latest_mobiles || [];
  const upComingMobiles = homePageResponse?.upcoming_mobiles || [];
  const popularMobiles = homePageResponse?.popular_mobiles || [];
  const itemsPerPage = 3;
  const itemsRef = useRef([]);
  const [pageIndex, setPageIndex] = useState(0);

  // Split phones into pages (2 cards per page)
  const pages = [];
  for (let i = 0; i < phones.length; i += 2) {
    pages.push(phones.slice(i, i + 2));
  }
  const scrollContainerRef = useRef(null);
  if (phones.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">No new mobiles available</p>
    );
  }

  return (
    <>
      <div className="p-1">
        {/* 📌 Brands */}
        <div className="">
          <h2 className="text-sm sm:text-2xl font-bold text-gray-800 mb-2">
            Top Brands
          </h2>

          {/* MOBILE HORIZONTAL COMPACT BRANDS */}
          <div className="sm:hidden overflow-x-auto flex gap-2 scrollbar-hide">
            {BrandsData.slice(0, 6).map((brand) => (
              <Link
                key={brand.value}
                href={`${brand.url}`}
                className={`flex-shrink-0 w-24 p-3 flex flex-col items-center rounded-xl shadow-sm hover:shadow-md transition-transform transform hover:scale-105 ${brand.color}`}
              >
                <div className="w-10 h-10 mb-1 flex items-center justify-center rounded-full group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                  <img
                    src={brand.logo}
                    alt={brand.value}
                    className="w-9 h-9 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-semibold text-gray-800 group-hover:text-blue-600 text-center truncate w-full">
                  {brand.value}
                </p>
                {/* <span className="text-[10px] text-gray-500 mt-0.5">
                  {brand.count} models
                </span> */}
              </Link>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-2 sm:hidden">
            Swipe →
          </p>

          {/* DESKTOP VIEW - ORIGINAL GRID */}
          <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-2">
            {BrandsData.slice(0, 6).map((brand) => (
              <Link
                key={brand.value}
                href={`${brand.url}`}
                className={`group relative flex flex-col items-center justify-center border-2 border-gray-200 rounded-2xl p-4
              hover:border-blue-400
              ${brand.color}`}
              >
                <div className="w-10 h-10 sm:w-10 sm:h-10 mb-1 lg:mb-3 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                  <img
                    src={brand.logo}
                    alt={brand.value}
                    className="w-6 h-6 lg:w-10 lg:h-10 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="font-sans text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {brand.value}
                </p>
                {/* <span className="font-mono text-xs text-gray-500 lg:mt-1">
                  {brand.count} models
                </span> */}
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-center mt-2 mb-3">
            <h3
              className={`${poppins.className} text-sm sm:text-2xl font-bold text-gray-800`}
            >
              Browse by Price Range
            </h3>
          </div>

          {/* MOBILE HORIZONTAL SCROLL */}
          <div className="sm:hidden overflow-x-auto flex gap-2 scrollbar-hide">
            {PriceCategoriesData.map((priceCategorie) => {
              const icons = {
                1: (
                  <Diamond className={`w-6 h-6 ${priceCategorie.textColor}`} />
                ),
                2: <Scale className={`w-6 h-6 ${priceCategorie.textColor}`} />,
                3: (
                  <Smartphone
                    className={`w-6 h-6 ${priceCategorie.textColor}`}
                  />
                ),
                4: <Flame className={`w-6 h-6 ${priceCategorie.textColor}`} />,
                5: (
                  <Lightbulb
                    className={`w-6 h-6 ${priceCategorie.textColor}`}
                  />
                ),
                6: <Phone className={`w-6 h-6 ${priceCategorie.textColor}`} />,
              };

              return (
                <Link
                  key={priceCategorie.id}
                  href={priceCategorie.link}
                  className={`${priceCategorie.bgColor} ${priceCategorie.borderColor} flex-shrink-0 w-28 flex flex-col items-center border rounded-xl p-3 group transition-transform transform hover:scale-105 hover:border-blue-400 hover:shadow-lg`}
                >
                  <div className="mb-1">{icons[priceCategorie.id]}</div>

                  <p className="font-sans text-xs font-semibold text-gray-800 group-hover:text-blue-600 text-center truncate w-full transition-colors">
                    {priceCategorie.title}
                  </p>

                  <p
                    className={`font-semibold text-[10px] ${priceCategorie.textColor} mb-1 text-center truncate w-full`}
                  >
                    {priceCategorie.subtitle}
                  </p>

                  <span className="font-mono text-[10px] text-gray-500 mt-0.5">
                    {priceCategorie.count} models
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="text-center text-xs text-gray-500 mt-2 sm:hidden">
            Swipe →
          </p>
          {/* DESKTOP GRID */}
          <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {PriceCategoriesData.map((priceCategorie) => {
              const icons = {
                1: (
                  <Diamond className={`w-6 h-6 ${priceCategorie.textColor}`} />
                ),
                2: <Scale className={`w-6 h-6 ${priceCategorie.textColor}`} />,
                3: (
                  <Smartphone
                    className={`w-6 h-6 ${priceCategorie.textColor}`}
                  />
                ),
                4: <Flame className={`w-6 h-6 ${priceCategorie.textColor}`} />,
                5: (
                  <Lightbulb
                    className={`w-6 h-6 ${priceCategorie.textColor}`}
                  />
                ),
                6: <Phone className={`w-6 h-6 ${priceCategorie.textColor}`} />,
              };

              return (
                <Link
                  key={priceCategorie.id}
                  href={priceCategorie.link}
                  className={`${priceCategorie.bgColor} ${priceCategorie.borderColor} flex flex-col items-center border border-gray-200 rounded-xl p-2 group transition-transform transform hover:scale-105 hover:border-blue-400 hover:shadow-lg`}
                >
                  <div className="mb-2">{icons[priceCategorie.id]}</div>

                  <p className="font-sans text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {priceCategorie.title}
                  </p>

                  <p
                    className={`font-semibold text-xs ${priceCategorie.textColor} mb-2`}
                  >
                    {priceCategorie.subtitle}
                  </p>

                  <span className="font-mono text-xs text-gray-500 mt-1">
                    {priceCategorie.count} models
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        {/* Newly Launched */}
        <div className="flex justify-between items-center mt-2 mb-3">
          <h2
            className={`${poppins.className} text-sm sm:text-2xl font-bold text-gray-800`}
          >
            Newly Launched
          </h2>
          {phones.length > 6 && (
            <a
              href="/mobiles/newly-launched"
              className="text-sm px-4 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2"
            >
              View All
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          )}
        </div>

        <div className="">
          {/* Navigation Arrows */}
          {phones.length > itemsPerPage && (
            <>
              {/* Left Arrow */}
              {/* <button
                onClick={prevSlide}
                disabled={isPrevDisabled}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                aria-label="Previous mobiles"
              >
                <ChevronLeft className="cursor-pointer w-5 h-5 text-gray-600" />
              </button> */}

              {/* Right Arrow */}
              {/* <button
                onClick={nextSlide}
                disabled={isNextDisabled}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                aria-label="Next mobiles"
              >
                <ChevronRight className="cursor-pointer w-5 h-5 text-gray-600" />
              </button> */}
            </>
          )}
          <div
            ref={scrollContainerRef}
            className="sm:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth gap-2"
            onScroll={(e) => {
              const scrollLeft = e.currentTarget.scrollLeft;
              const containerWidth = e.currentTarget.offsetWidth;
              const newIndex = Math.round(scrollLeft / containerWidth);
              setPageIndex(newIndex);
            }}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {pages.map((pageCards, page) => (
              <div
                key={page}
                data-index={page}
                ref={(el) => (itemsRef.current[page] = el)}
                className="snap-center w-full flex-shrink-0 flex"
              >
                {pageCards.map((phone, idx) => (
                  <div
                    key={phone.id}
                    className={`w-1/2 ${idx === 0 ? "pr-1" : "pl-1"}`}
                  >
                    <PhoneCard phone={phone} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Modern Indicator */}
          {pages.length > 2 && (
            <div className="flex justify-center gap-1 mt-2 sm:hidden">
              {pages.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-150 ${
                    pageIndex === index ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Tablet / Desktop grid */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-2">
            {phones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>

        {upComingMobiles.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2
                className={`${poppins.className} text-sm sm:text-2xl font-bold text-gray-800`}
              >
                Upcoming Mobiles
              </h2>
              {upComingMobiles.length > 6 && (
                <a
                  href="/mobiles/newly-launched"
                  className="text-sm px-4 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2"
                >
                  View All
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </div>
            <div className="relative">
              {/* Navigation Arrows */}
              {upComingMobiles.length > itemsPerPage && (
                <>
                  {/* Left Arrow */}
                  {/* <button
                    onClick={prevSlide}
                    disabled={isPrevDisabled}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                    aria-label="Previous mobiles"
                  >
                    <ChevronLeft className="cursor-pointer w-5 h-5 text-gray-600" />
                  </button> */}

                  {/* Right Arrow */}
                  {/* <button
                    onClick={nextSlide}
                    disabled={isNextDisabled}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                    aria-label="Next mobiles"
                  >
                    <ChevronRight className="cursor-pointer w-5 h-5 text-gray-600" />
                  </button> */}
                </>
              )}

              <div className="relative">
                <div
                  className="
      flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide
      sm:grid sm:grid-cols-2 lg:grid-cols-3
    "
                >
                  {upComingMobiles.map((upComingMobiles) => (
                    <PhoneCard
                      key={upComingMobiles.id}
                      phone={upComingMobiles}
                    />
                  ))}
                </div>

                {/* Scroll hint */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white/90 to-transparent pointer-events-none px-2 py-1 text-sm text-gray-500 font-medium sm:hidden">
                  Swipe →
                </div>
              </div>
            </div>
          </>
        )}

        {upComingMobiles.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2
                className={`${poppins.className} text-sm sm:text-2xl font-bold text-gray-800`}
              >
                Popular Mobiles
              </h2>
              {popularMobiles.length > 6 && (
                <a
                  href="/mobiles/newly-launched"
                  className="text-sm px-4 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2"
                >
                  View All
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </div>
            <div className="relative">
              {/* Navigation Arrows */}
              {popularMobiles.length > itemsPerPage && (
                <>
                  {/* Left Arrow */}
                  {/* <button
                onClick={prevSlide}
                disabled={isPrevDisabled}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                aria-label="Previous mobiles"
              >
                <ChevronLeft className="cursor-pointer w-5 h-5 text-gray-600" />
              </button> */}

                  {/* Right Arrow */}
                  {/* <button
                onClick={nextSlide}
                disabled={isNextDisabled}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                aria-label="Next mobiles"
              >
                <ChevronRight className="cursor-pointer w-5 h-5 text-gray-600" />
              </button> */}
                </>
              )}

              {/* Mobile Grid */}
              {/* <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {getCurrentItems().map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
}
