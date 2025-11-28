"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, ArrowUp, ArrowDown, Clock } from 'lucide-react';

function getActiveTags(parsed) {
  const tags = [];

  // Brands
  if (Array.isArray(parsed.brands) && parsed.brands.length > 0) {
    parsed.brands.forEach(b => {
      b.replace(/-mobile$/, "")
        .split("-")
        .forEach(name => {
          if (name) tags.push(name.charAt(0).toUpperCase() + name.slice(1));
        });
    });
  }

  // Price Range
  if (Array.isArray(parsed.priceRange) && parsed.priceRange.length === 2) {
    const [min, max] = parsed.priceRange;
    if (min != null && max != null) {
      tags.push(`${min} - ${max}`);
    }
  }

  // RAM
  if (Array.isArray(parsed.ram) && parsed.ram.length > 0) {
    parsed.ram.forEach(r => {
      if (r) tags.push(`${r}GB RAM`);
    });
  }

  // Storage
  if (Array.isArray(parsed.storage) && parsed.storage.length > 0) {
    parsed.storage.forEach(s => {
      if (s) tags.push(`${s}GB Storage`);
    });
  }

  // Features
  if (Array.isArray(parsed.features) && parsed.features.length > 0) {
    parsed.features.forEach(f => {
      if (f) tags.push(f.charAt(0).toUpperCase() + f.slice(1));
    });
  }

  // Category
  if (parsed.category) {
    tags.push(parsed.category.charAt(0).toUpperCase() + parsed.category.slice(1));
  }

  return tags;
}

export default function ResultsHeader({ totalResults = 0, filteredResults = 0, trending = {}, parsed,setLoading  }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFiltered, setIsFiltered] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const sortOptions = [
    { value: 'newest', label: 'Newest', icon: <Clock size={16} /> },
    { value: 'price_low_high', label: 'Price: Low to High', icon: <ArrowDown size={16} /> },
    { value: 'price_high_low', label: 'Price: High to Low', icon: <ArrowUp size={16} /> },
    { value: 'popular', label: 'Most Popular', icon: <Star size={16} /> },
  ];
  useEffect(() => {
    setIsFiltered(filteredResults > 0 && filteredResults < totalResults);
  }, [filteredResults, totalResults]);
  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };
  const activeTags = getActiveTags(parsed);
  function clearAllFilters() {
     setLoading(true);
    router.push("/mobiles");

  }

  const handleSortChange = (e) => {
     setLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;
    params.set("sort", value);

    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <>
      {/* Results Summary */}
      <div className="sticky top-6 bg-white rounded-md border border-gray-200 p-3 sm:p-5 mb-4 shadow-md">
        {/* Row: Sort + Clear All */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2.5 px-4 pr-10 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm cursor-pointer"
              onChange={handleSortChange}
              value={searchParams.get("sort") || "newest"}
            >
              <option value="newest">🆕 Newest</option>
              <option value="price_low_high">⬇ Price: Low to High</option>
              <option value="price_high_low">⬆ Price: High to Low</option>
              <option value="popular">⭐ Most Popular</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Clear All button */}
          {activeTags.length > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-full shadow-sm transition-all"
            >
              <RotateCcw size={16} />
              Clear All ({activeTags.length})
            </button>
          )}
        </div>
      </div>


      {/* Trending Picks (only if no filters applied) */}
      {/* {!isFiltered && trending.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-xs font-medium text-gray-600 mb-2">Trending Now</p>
          <div className="flex flex-wrap gap-2">
            {trending.map((item, i) => (
              <button
                key={i}
                onClick={() => console.log(`Apply filter: ${item.label}`)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )} */}
      {/* bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100   rounded-3xl shadow-inner*/}

      <div className="">
        {/* <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
    🔥 Trending Phones
  </h2> */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trending.map((item, i) => (
            <div
              key={item.id || i}
              className="relative rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              onClick={() => handlePhoneClick(item)}
            >
              {/* Rank Badge */}

              <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-blue-600 text-white rounded-full shadow">
                #{i + 1}
              </span>


              {/* Image */}
              <div className="relative mb-4">
                {!imageErrors[i] ? (
                  <Image
                    src={item.image}
                    alt={`${item.brand} ${item.model}`}
                    width={200}
                    height={144}
                    className="w-32 h-32 object-contain mx-auto mt-6 mb-4 drop-shadow-md"
                    onError={() => handleImageError(i)}
                    priority={i < 4}
                  />
                ) : (
                  <div className="w-full h-36 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Details */}
              <h3 className="text-lg font-bold text-gray-800 text-center">
                {item.model}
              </h3>
              <p className="text-gray-500 text-sm text-center">{item.brand}</p>

              {/* Button */}
              <button className="mt-4 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition">
                View Details
              </button>
              <div className="mt-8 text-center">
                <button className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-700 transition">
                  View All Trending Phones →
                </button>
              </div>
            </div>
          ))}
        </div>


      </div>

    </>
  );
}
