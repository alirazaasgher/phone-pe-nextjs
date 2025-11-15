import React, { useState } from "react";
{/* Price Range */ }
const PriceRangeFilter = ({selected}) => {
    return (
        <>
            {/* Price Range */}
            <div className="p-4 border rounded-xl bg-gray-50">
                <p className="text-sm font-medium text-gray-800 mb-3">Price Range (PKR)</p>

                <div className="flex items-center gap-3">
                    {/* Min Price */}
                    <div className="flex flex-col w-1/2">
                        <label className="text-xs text-gray-500 mb-1">Min</label>
                        <input
                            type="number"
                            value={selected?.priceRange?.min || ""}
                            onChange={(e) => handlePriceChange({ ...selected.priceRange, min: e.target.value })}
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
                            value={selected?.priceRange?.max || ""}
                            onChange={(e) => handlePriceChange({ ...selected?.priceRange, max: e.target.value })}
                            placeholder="100000"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default PriceRangeFilter;