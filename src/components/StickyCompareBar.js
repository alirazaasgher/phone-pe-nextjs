"use client";
import { useEffect, useState } from "react";
export default function StickyCompareBar({ phones }) {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`fixed top-16 left-0 w-full bg-white/70 backdrop-blur-xl border-b border-gray-200/50 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        showBar
          ? "translate-y-0 opacity-100 shadow-xl"
          : "-translate-y-full opacity-0 shadow-none"
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto flex items-center justify-between py-2 px-6">
        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-center overflow-x-auto no-scrollbar py-1">
          {phones.slice(0, window?.innerWidth < 768 ? 2 : 4).map((phone) => {
            const status = phone?.searchIndex?.status;
            const noPrice =
              !phone?.searchIndex?.min_price &&
              !phone?.searchIndex?.min_price_usd;
            const price = phone?.searchIndex?.min_price;
            const isUpcoming = status === "rumored" || status === "upcoming";
            let displayPrice = "";
            let currencySymbol = "";

            if (isUpcoming && noPrice) {
              displayPrice = "Coming Soon";
            } else if (price) {
              displayPrice = price;
              currencySymbol = "Rs.";
            } else if (phone?.searchIndex?.min_price_usd) {
              displayPrice = phone.searchIndex.min_price_usd;
              currencySymbol = "$";
            }

            return (
              <div
                key={phone.id}
                className="group flex items-center gap-2 md:gap-3 bg-white/40 hover:bg-white border border-gray-200/60 rounded-xl px-2 py-1.5 transition-all duration-300 hover:shadow-md cursor-default shrink-0 min-w-[160px] md:min-w-[200px]"
              >
                <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">
                  <img
                    src={phone.primary_image}
                    alt={phone.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>

                <div className="flex flex-col min-w-0 pr-1">
                  <span className="text-[11px] md:text-[13px] font-bold text-gray-900 leading-none mb-1">
                    {phone.name}
                  </span>
                  <span className="text-[10px] md:text-[11px] font-semibold text-indigo-600 leading-none">
                    {currencySymbol} {displayPrice}
                  </span>
                </div>

                <button
                  onClick={() => removePhone(phone.id)}
                  className="ml-auto p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all text-gray-400 flex-shrink-0"
                >
                  <svg
                    className="w-3 h-3 md:w-3.5 md:h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            );
          })}

          {phones.length > 2 && (
            <div className="flex md:hidden items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-[11px] font-bold flex-shrink-0">
              +{phones.length - 2}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
