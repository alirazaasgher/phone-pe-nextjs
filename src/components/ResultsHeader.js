"use client";
import { Calendar, RotateCcw } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Star, ArrowUp, ArrowDown, Clock } from "lucide-react";

export default function ResultsHeader({ activeTags, setLoading }) {
  const router = useRouter();
  const sortOptions = [
    { value: "new", label: "🆕 Newest", icon: <Clock size={16} /> },
    { value: "upcoming", label: "📅 Upcoming", icon: <Calendar size={16} /> },
    {
      value: "price-low-to-high",
      label: "⬇ Price: Low to High",
      icon: <ArrowDown size={16} />,
    },
    {
      value: "price-high-to-low",
      label: "⬆ Price: High to Low",
      icon: <ArrowUp size={16} />,
    },
    // { value: "popular", label: "⭐ Most Popular", icon: <Star size={16} /> },
  ];
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const currentSort =
    parts.find((p) => sortOptions.some((opt) => opt.value === p)) || "";
  function clearAllFilters() {
    setLoading(true);
    router.push("/mobiles");
  }

  const handleSortChange = (e) => {
    setLoading(true);

    const value = e.target.value; // new | upcoming | price-low-to-high | price-high-to-low

    const parts = pathname.split("/").filter(Boolean);

    // remove existing sort/status
    const REMOVE = [
      "new",
      "upcoming",
      "price-low-to-high",
      "price-high-to-low",
    ];

    const cleaned = parts.filter((p) => !REMOVE.includes(p));

    // insert sort/status after brand (or after /mobiles)
    const baseIndex = cleaned[1] && cleaned[0] === "mobiles" ? 2 : 1;
    cleaned.splice(baseIndex, 0, value);
    router.push("/" + cleaned.join("/"), { scroll: false });
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
              value={currentSort}
              onChange={handleSortChange}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none"
            >
              <option value="" disabled>
                Select sort option
              </option>
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
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
    </>
  );
}
