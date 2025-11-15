"use client";

import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleApplyFilters = (filters) => {
//     let result = phones;

//     if (filters.priceRange) {
//       result = result.filter(
//         (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
//       );
//     }
//     if (filters.brands?.length > 0) {
//       result = result.filter((p) => filters.brands.includes(p.brand));
//     }
//     if (filters.ram?.length > 0) {
//       result = result.filter((p) => filters.ram.includes(p.ram));
//     }
//     if (filters.storage?.length > 0) {
//       result = result.filter((p) => filters.storage.includes(p.storage));
//     }

//     setFilteredPhones(result);
//   };

const handleApplyFilters = (newFilters) => {
    setSelectedFilters(newFilters);
    setSidebarOpen(false);
    // Optional: update URL or fetch filtered data here
  };

  return (
    <FilterContext.Provider
     
    >
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook for easier access
export const useFilters = () => useContext(FilterContext);
