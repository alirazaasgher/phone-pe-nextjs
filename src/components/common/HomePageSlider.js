import PhoneCard from "../PhoneCard";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function HomePageSlider({
  phones,
  itemsPerPage,
  title,
  redriectTo,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const nextSlide = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const totalPages = Math.ceil(phones.length / itemsPerPage);
  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage >= totalPages - 1;

  // Get current page items
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = phones.slice(startIndex, endIndex);
  return (
    <>
      <div className="flex justify-between items-center mt-2 mb-3">
        <h2
          className={`${poppins.className} text-sm sm:text-2xl font-bold text-gray-800`}
        >
          {title}
        </h2>
        <Link
          href={`/mobiles/${redriectTo}`}
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
        </Link>
      </div>
      <div className="hidden sm:grid  relative">
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentItems.map((phone, index) => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              isPriority={startIndex + index < 6}
            />
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={isPrevDisabled}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                              bg-white rounded-full shadow-lg p-2 hover:bg-gray-50
                              transition-all duration-200 border border-gray-200
                              disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous mobiles"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={isNextDisabled}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                                bg-white rounded-full shadow-lg p-2 hover:bg-gray-50
                                transition-all duration-200 border border-gray-200
                                disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next mobiles"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </>
  );
}
