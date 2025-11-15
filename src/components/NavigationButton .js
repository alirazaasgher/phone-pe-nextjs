import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationButton({ direction, disabled, onClick }) {
   const isLeft = direction === "left";

  return (
    // <button
    //   type="button"
    //   onClick={onClick}
    //   disabled={disabled}
    //   className={`
    //     absolute ${position} top-1/2 -translate-y-1/2 z-30
    //     bg-white/95 backdrop-blur-md p-2 rounded-full shadow-md
    //     transition-all duration-200 ease-in-out
    //     hover:bg-white hover:scale-110
    //     ${disabled
    //       ? "opacity-30 cursor-not-allowed"
    //       : "hover:opacity-100"
    //     }
    //   `}
    // >
    //   <Icon className="w-3 h-3 text-gray-700" />
    // </button>

    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm hover:bg-white p-2.5 md:p-3 rounded-full shadow-xl border border-gray-200 transition-all duration-300 ${
        disabled ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
      } ${isLeft ? "left-3 md:left-4" : "right-3 md:right-4"}`}
      aria-label={`${direction} image`}
    >
      {isLeft ? <ChevronLeft className="w-2 h-2 md:w-2 md:h-2 text-gray-800" /> : <ChevronRight className="w-2 h-2 md:w-2 md:h-2 text-gray-800" />}
    </button>
  );
}
