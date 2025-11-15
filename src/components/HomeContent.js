"use client";
import { useState, useEffect } from "react";

import { Smartphone, Apple, Square, Circle, Star as StarIcon, ChevronLeft, ChevronRight, Diamond, Scale, Flame, Lightbulb, Phone } from "lucide-react";
// import FilterSidebar from "../components/Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import PhoneCard from "./PhoneCard";
import { Inter, Poppins } from 'next/font/google';
import Container from "./Container";
// Module-scope declaration
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Home({ homePageData }) {
  // ✅ Brands with icons
  const brands = [
    { name: "Samsung", url: "/mobiles/samsung-mobile-phones", logo: "/images/Brands/Samsung/Samsung_Orig_Wordmark_BLUE_RGB.png", color: "bg-blue-50", icon: Smartphone, count: 520 },
    { name: "Apple", url: "/mobiles/apple-mobile-phones", logo: "/images/Brands/Apple/apple-seeklogo.png", color: "bg-gray-50", icon: Apple, count: 220 },
    { name: "OnePlus", url: "/mobiles/oneplus-mobile-phones", logo: "/images/Brands/OnePlus/oneplus-seeklogo.png", color: "bg-red-50", icon: StarIcon, count: 120 },
    { name: "Xiaomi", url: "/mobiles/xiaomi-mobile-phones", logo: "/images/Brands/Xiaomi/xiaomi-seeklogo.png", color: "bg-orange-50", icon: Square, count: 2000 },
    { name: "Vivo", url: "/mobiles/vivo-mobile-phones", logo: "/images/Brands/Vivo/vivo-seeklogo.png", color: "bg-cyan-50", icon: Circle, count: 200 },
    { name: "Oppo", url: "/mobiles/oppo-mobile-phones", logo: "/images/Brands/Oppo/oppo-logo.png", color: "bg-green-50", icon: Smartphone, count: 20 },

  ];

  const priceCategories = [
    {
      id: 1,
      title: "Above 50,000",
      subtitle: "Flagships",
      range: "> 50,000 Rs.",
      icon: "💎",
      gradient: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      count: 10 || 0,
      link: "/mobiles/above-50000"
    },
    {
      id: 2,
      title: "40,000 - 50,000",
      subtitle: "Mid-Range",
      range: "40,000 - 50,000 Rs.",
      icon: "⚖️",
      gradient: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      count: 20 || 0,
      link: "/mobiles/40000-50000"
    },
    {
      id: 3,
      title: "30,000 - 40,000",
      subtitle: "Popular Picks",
      range: "30,000 - 40,000 Rs.",
      icon: "📱",
      gradient: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      count: 30 || 0,
      link: "/mobiles/30000-40000"
    },
    {
      id: 4,
      title: "20,001 - 30,000",
      subtitle: "Best Value",
      range: "20,001 - 30,000 Rs.",
      icon: "🔥",
      gradient: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
      count: 40 || 0,
      link: "/mobiles/20001-30000"
    },
    {
      id: 5,
      title: "10,001 - 20,000",
      subtitle: "Budget",
      range: "10,001 - 20,000 Rs.",
      icon: "💡",
      gradient: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      borderColor: "border-pink-200",
      count: 50 || 0,
      link: "/mobiles/10001-20000"
    },
    {
      id: 6,
      title: "Under 10,000",
      subtitle: "Entry-Level",
      range: "< 10,000 Rs.",
      icon: "📞",
      gradient: "from-gray-400 to-gray-600",
      bgColor: "bg-gray-50",
      textColor: "text-gray-700",
      borderColor: "border-gray-200",
      count: 60 || 0,
      link: "/mobiles/under-10000"
    }
  ];

  const phones = homePageData?.latest_mobiles || [];
  const upComingMobiles = homePageData?.upcoming_mobiles || [];
  const popularMobiles = homePageData?.popular_mobiles || [];
  const itemsPerPage = 3;
  const totalPages = Math.ceil(phones.length / itemsPerPage);
  // ✅ Phone Card
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    if (startIndex + itemsPerPage < phones.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + itemsPerPage >= phones.length;

  const getCurrentItems = () => {
    return phones.slice(startIndex, startIndex + itemsPerPage);
  };
  if (phones.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No new mobiles available
      </p>
    );
  }

  return (
    <>
      <div className="p-4 space-y-3">
        {/* 📌 Brands */}
        <h2 className="text-sm sm:text-2xl font-bold text-gray-800 mb-6">Top Brands</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={`/mobiles/brand/${brand.name.toLowerCase()}`}
              className={`flex flex-col items-center border border-gray-200 rounded-xl p-4 group min-w-[50px] min-h-[20px] sm:min-w-[130px] transition-transform transform hover:scale-105 hover:border-blue-400 hover:shadow-lg ${brand.color}`}
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 mb-3 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="font-sans text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </p>
              <span className="font-mono text-xs text-gray-500 mt-1">
                {brand.count} models
              </span>
            </a>
          ))}
        </div>
        <h2 className="text-sm sm:text-2xl font-bold text-gray-800 mb-6">
          Browse by Price Range
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {priceCategories.map((priceCategorie) => {
            // Map icons based on category id
            const icons = {
              1: <Diamond className={`w-6 h-6 ${priceCategorie.textColor}`} />,
              2: <Scale className={`w-6 h-6 ${priceCategorie.textColor}`} />,
              3: <Smartphone className={`w-6 h-6 ${priceCategorie.textColor}`} />,
              4: <Flame className={`w-6 h-6 ${priceCategorie.textColor}`} />,
              5: <Lightbulb className={`w-6 h-6 ${priceCategorie.textColor}`} />,
              6: <Phone className={`w-6 h-6 ${priceCategorie.textColor}`} />
            };

            return (
              <a
                key={priceCategorie.id}
                href={priceCategorie.link}
                className={`${priceCategorie.bgColor} ${priceCategorie.borderColor} flex flex-col items-center border border-gray-200 rounded-xl p-4 group min-w-[50px] min-h-[20px] sm:min-w-[130px] transition-transform transform hover:scale-105 hover:border-blue-400 hover:shadow-lg`}
              >
                {/* Icon */}
                <div className="mb-2">{icons[priceCategorie.id]}</div>

                {/* Title */}
                <p className="font-sans text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {priceCategorie.title}
                </p>

                {/* Subtitle */}
                <p
                  className={`font-semibold text-xs ${priceCategorie.textColor} mb-2`}
                >
                  {priceCategorie.subtitle}
                </p>

                {/* Count */}
                <span className="font-mono text-xs text-gray-500 mt-1">
                  {priceCategorie.count} models
                </span>
              </a>
            );
          })}
        </div>

        {/* Newly Launched */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`${poppins.className} text-sm sm:text-2xl font-bold text-gray-800`}>
            Newly Launched
          </h2>
          {phones.length > 6 && (
            <a
              href="/mobiles/newly-launched"
              className="text-sm px-4 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          {phones.length > itemsPerPage && (
            <>
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                disabled={isPrevDisabled}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                aria-label="Previous mobiles"
              >
                <ChevronLeft className="cursor-pointer w-5 h-5 text-gray-600" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                disabled={isNextDisabled}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                aria-label="Next mobiles"
              >
                <ChevronRight className="cursor-pointer w-5 h-5 text-gray-600" />
              </button>
            </>
          )}

          {/* Mobile Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4
                    transition-all duration-300 ease-in-out" >
            {getCurrentItems().map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>

        {upComingMobiles.length > 0 && (

          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`${poppins.className} text-sm sm:text-2xl font-bold text-gray-800`}>
                Upcoming Mobiles
              </h2>
              {upComingMobiles.length > 6 && (
                <a
                  href="/mobiles/newly-launched"
                  className="text-sm px-4 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
            <div className="relative">
              {/* Navigation Arrows */}
              {upComingMobiles.length > itemsPerPage && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={prevSlide}
                    disabled={isPrevDisabled}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                    aria-label="Previous mobiles"
                  >
                    <ChevronLeft className="cursor-pointer w-5 h-5 text-gray-600" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={nextSlide}
                    disabled={isNextDisabled}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                    aria-label="Next mobiles"
                  >
                    <ChevronRight className="cursor-pointer w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}

              {/* Mobile Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 
                    transition-all duration-300 ease-in-out">
                {getCurrentItems().map((upComingMobiles) => (
                  <PhoneCard key={upComingMobiles.id} phone={upComingMobiles} />
                ))}
              </div>
            </div>
          </>

        )}


        {upComingMobiles.length > 0 && (
         <>
         <div className="flex justify-between items-center mb-6">
          <h2 className={`${poppins.className} text-sm sm:text-2xl font-bold text-gray-800`}>
            Popular Mobiles
          </h2>
          {popularMobiles.length > 6 && (
            <a
              href="/mobiles/newly-launched"
              className="text-sm px-4 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
        <div className="relative">
          {/* Navigation Arrows */}
          {popularMobiles.length > itemsPerPage && (
            <>
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                disabled={isPrevDisabled}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                aria-label="Previous mobiles"
              >
                <ChevronLeft className="cursor-pointer w-5 h-5 text-gray-600" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                disabled={isNextDisabled}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                     bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 
                     transition-all duration-200 border border-gray-200
                     disabled:opacity-50"
                aria-label="Next mobiles"
              >
                <ChevronRight className="cursor-pointer w-5 h-5 text-gray-600" />
              </button>
            </>
          )}

          {/* Mobile Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {getCurrentItems().map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>
         </>
        )}
        
      </div>
    </>
  );

}
