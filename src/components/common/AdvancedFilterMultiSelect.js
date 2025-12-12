import { useEffect, useState, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function AdvancedFilterMultiSelect({ filter,selectedOptions,setSelectedOptions }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef({});

  // Get selected options for this filter
  const selected = selectedOptions[filter.slug] || [];
  // Toggle selection
  const toggleOption = (slug, value) => {
    setSelectedOptions((prev) => {
      const prevSelected = prev[slug] || [];
      const newSelected = prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value)
        : [...prevSelected, value];
      return { ...prev, [slug]: newSelected };
    });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current[filter.slug] &&
        !dropdownRef.current[filter.slug].contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filter.slug]);

  return (
    <div
      key={filter.slug}
      className="relative w-full"
      ref={(el) => (dropdownRef.current[filter.slug] = el)}
    >
      <button
        type="button"
        className="w-full border border-gray-300 p-2 flex justify-between items-center rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() =>
          setOpenDropdown(openDropdown === filter.slug ? null : filter.slug)
        }
        aria-haspopup="listbox"
        aria-expanded={openDropdown === filter.slug}
      >
        <span className="text-sm font-medium truncate text-left flex items-center gap-2">
          {selected.length === 0 ? (
            filter.name
          ) : (
            <>
              <span className="text-gray-900">{selected.join(", ")}</span>
              {selected.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {selected.length}
                </span>
              )}
            </>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
            openDropdown === filter.slug ? "rotate-180" : ""
          }`}
        />
      </button>

      {openDropdown === filter.slug && (
        <>
          <div
            className="fixed inset-0 z-0"
            onClick={() => setOpenDropdown(null)}
            aria-hidden="true"
          />
          <ul
            className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
            role="listbox"
          >
            {filter.values.length > 1 && (
              <li className="sticky top-0 bg-gray-50 border-b border-gray-200 px-3 py-2 flex gap-2">
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    filter.values.forEach((opt) => {
                      if (!selected.includes(opt.value))
                        toggleOption(filter.slug, opt.value);
                    });
                  }}
                >
                  Select All
                </button>
                {selected.length > 0 && (
                  <>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      className="text-xs text-gray-600 hover:text-gray-700 font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        selected.forEach((opt) =>
                          toggleOption(filter.slug, opt)
                        );
                      }}
                    >
                      Clear All
                    </button>
                  </>
                )}
              </li>
            )}

            {filter.values.map((option) => (
              <li
                key={option.value}
                className={`flex items-center justify-between px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors ${
                  selected.includes(option.value) ? "bg-blue-50/50" : ""
                }`}
                onClick={() => toggleOption(filter.slug, option.value)}
                role="option"
                aria-selected={selected.includes(option.value)}
              >
                <span className="text-sm text-gray-700 flex-1">{option.value}</span>
                {selected.includes(option.value) && (
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                )}
              </li>
            ))}

            {filter.values.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-gray-500">
                No options available
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
