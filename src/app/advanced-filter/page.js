"use client";
import { useState } from "react";
import AdvancedFilter from "@/data/AdvanceFilter";
import AdvancedFilterMultiSelect from "@/components/common/AdvancedFilterMultiSelect";
import AdvanceFilterCheckBox from "@/components/common/AdvanceFilterCheckBox";

export default function AdvancedFilters() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [tempSelectedOptions, setTempSelectedOptions] = useState({});
  const [showApplyButton, setShowApplyButton] = useState(false);

  const handleFilterChange = (newOptions) => {
    setTempSelectedOptions(newOptions);
    setShowApplyButton(true);
  };

  const handleApply = () => {
    setSelectedOptions(tempSelectedOptions);
    setShowApplyButton(false);
    // Add your apply logic here (e.g., trigger API call, update parent state, etc.)
  };

  const handleReset = () => {
    setTempSelectedOptions({});
    setSelectedOptions({});
    setShowApplyButton(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {AdvancedFilter.map((section) => (
          <div
            key={section.section || section.id}
            className="pb-6 border-b border-gray-200 last:border-0"
          >
            <h2
              className="text-base font-semibold text-gray-900 mb-4 tracking-wide relative pb-2
after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-blue-600"
            >
              {section.section}
            </h2>

            <div
              className={`grid grid-cols-1 gap-3 ${
                section.columns === 2
                  ? "md:grid-cols-2"
                  : "md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {section.filters.map((filter) => {
                if (filter.type === "checkbox") {
                  return filter.values.map((val) => (
                    <AdvanceFilterCheckBox
                      key={val.value}
                      filter={filter}
                      val={val}
                      selectedOptions={tempSelectedOptions}
                      setSelectedOptions={handleFilterChange}
                    />
                  ));
                }

                if (filter.type === "multi-select") {
                  return (
                    <AdvancedFilterMultiSelect
                      key={filter.slug}
                      filter={filter}
                      selectedOptions={tempSelectedOptions}
                      setSelectedOptions={handleFilterChange}
                    />
                  );
                }

                if (filter.type === "range-slider") {
                  return null;
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      {showApplyButton && (
        <div
          className={`fixed bottom-5 right-5 flex items-center gap-2 transition-all duration-300 z-50 ${
            showApplyButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 hover:shadow transition-all"
          >
            Reset
          </button>

          <button
            onClick={handleApply}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
