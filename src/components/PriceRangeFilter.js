import React, { useState } from "react";
{
  /* Price Range */
}
// PriceRangeFilter Component
const PriceRangeFilter = ({ value, handlePriceChange }) => {
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  React.useEffect(() => {
    if (value?.priceRange) {
      setMinPrice(value.priceRange.min ?? "");
      setMaxPrice(value.priceRange.max ?? "");
    }
  }, [value]);
  const updateParent = (newMin, newMax) => {
    const minNum = parseFloat(newMin);
    const maxNum = parseFloat(newMax);

    // Only include min if it's a valid number
    const updated = {};
    if (!isNaN(minNum)) updated.min = minNum;

    // Only include max if it's a valid number
    if (!isNaN(maxNum)) updated.max = maxNum;

    // Optional: check if min <= max when both exist
    if (
      updated.min !== undefined &&
      updated.max !== undefined &&
      updated.min > updated.max
    ) {
      // Invalid range, don't update
      return;
    }

    // Update parent if at least one value exists
    if (Object.keys(updated).length > 0) {
      handlePriceChange(updated);
    }
  };

  const handleMinChange = (e) => {
    const val = e.target.value;
    setMinPrice(val);
    updateParent(val, maxPrice);
  };

  const handleMaxChange = (e) => {
    const val = e.target.value;
    setMaxPrice(val);
    updateParent(minPrice, val);
  };

  return (
    <div className="p-4 border rounded-xl bg-gray-50">
      <p className="text-sm font-medium text-gray-800 mb-3">
        Price Range (PKR)
      </p>

      <div className="flex items-center gap-3">
        {/* Min Price */}
        <div className="flex flex-col w-1/2">
          <label className="text-xs text-gray-500 mb-1">Min</label>
          <input
            type="number"
            value={minPrice}
            onChange={handleMinChange}
            placeholder="0"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <span className="text-gray-500 font-medium mt-5">–</span>

        {/* Max Price */}
        <div className="flex flex-col w-1/2">
          <label className="text-xs text-gray-500 mb-1">Max</label>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxChange}
            placeholder="100000"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
