import { useEffect, useState, useRef } from "react";
import { Search, Plus } from "lucide-react";
import SpecGroup from "./SpecGroup";
import UseFilteredSpecs from "./UseFilteredSpecs";
import Link from "next/link";
export default function MobileSpeficaion({ phoneDetails, compatibility }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimerRef = useRef(null);
  const hasTrackedFocusRef = useRef(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear existing timer
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    // Track after user stops typing (debounce)
    if (value.trim()) {
      searchTimerRef.current = setTimeout(() => {
        window.gtag("event", "search", {
          search_term: value,
          event_category: "engagement",
          event_label: "specifications_search",
        });
      }, 1000);
    }
  };

  const handleSearchFocus = () => {
    if (!hasTrackedFocusRef.current) {
      window.gtag("event", "search_started", {
        event_category: "engagement",
        event_label: "specifications_search",
      });
      hasTrackedFocusRef.current = true;
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);
  // 🔍 Filter across *all* sections and fields
  const filteredSpecs = UseFilteredSpecs(phoneDetails, searchQuery);
  return (
    <div className="space-y-1">
      {/* Search Bar */}
      <div className="border-t border-gray-200 bg-white py-2.5 px-1">
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-blue-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              placeholder="Search specifications..."
              className="ml-2 w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Compare Button */}
          <Link
            key={phoneDetails.id}
            href={`/compare/${phoneDetails.slug}`}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-all flex-shrink-0"
            aria-label="Compare"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Compare</span>
          </Link>
        </div>
      </div>

      {/* Render filtered groups */}
      <div>
        {filteredSpecs.map((section, index) => {
          const [title, specs] =
            Object.entries(section).find(
              ([key]) =>
                key !== "is_expandable" &&
                key !== "max_visible" &&
                key !== "security",
            ) || [];
          const isExpandable = section.is_expandable;
          const max_visible = section.max_visible;
          if (!specs || Object.keys(specs).length === 0) return null;
          return (
            <SpecGroup
              key={index}
              title={title}
              specs={specs}
              isExpandable={isExpandable}
              max_visible={max_visible}
              searchQuery={searchQuery}
              compatibility={compatibility}
            />
          );
        })}
        {filteredSpecs.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-4">
            No results found 😕
          </div>
        )}
      </div>
    </div>
  );
}
