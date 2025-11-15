'use client'
import { useState } from 'react'

const filterCategories = {
  brand: {
    title: 'Brand',
    options: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Oppo', 'Vivo', 'Realme']
  },
  priceRange: {
    title: 'Price Range',
    options: ['Under ₹10K', '₹10K - ₹20K', '₹20K - ₹30K', '₹30K - ₹50K', '₹50K+']
  },
  screenSize: {
    title: 'Screen Size',
    options: ['Under 5"', '5" - 6"', '6" - 6.5"', '6.5" - 7"', '7"+']
  },
  ram: {
    title: 'RAM',
    options: ['2GB', '3GB', '4GB', '6GB', '8GB', '12GB+']
  },
  storage: {
    title: 'Storage',
    options: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB+']
  },
  camera: {
    title: 'Main Camera',
    options: ['Under 12MP', '12-24MP', '24-48MP', '48-64MP', '64MP+']
  },
  battery: {
    title: 'Battery',
    options: ['Under 3000mAh', '3000-4000mAh', '4000-5000mAh', '5000mAh+']
  },
  launchStatus: {
    title: 'Launch Status',
    options: ['Already Launched', 'Upcoming', 'Rumored']
  }
}

export default function FilterSidebar({ isOpen, onClose, filters, onFilterChange }) {
  const [expandedCategories, setExpandedCategories] = useState(['brand', 'priceRange'])

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleFilterToggle = (category, option) => {
    const currentFilters = filters[category] || []
    const newFilters = currentFilters.includes(option)
      ? currentFilters.filter(f => f !== option)
      : [...currentFilters, option]

    onFilterChange({ ...filters, [category]: newFilters })
    
  }

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((total, filterArray) => total + (filterArray?.length || 0), 0)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white shadow-lg rounded-lg h-fit sticky top-20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <button
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All ({getActiveFilterCount()})
              </button>
            )}
          </div>

          <FilterContent
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
            filters={filters}
            handleFilterToggle={handleFilterToggle}
          />
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Mobile Filter Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <div className="flex items-center space-x-2">
            {getActiveFilterCount() > 0 && (
              <button
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <FilterContent
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
            filters={filters}
            handleFilterToggle={handleFilterToggle}
          />
        </div>

        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Apply Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </button>
        </div>
      </div>
    </>
  )
}

function FilterContent({ expandedCategories, toggleCategory, filters, handleFilterToggle }) {
  return (
    <div className="space-y-4">
      {Object.entries(filterCategories).map(([category, { title, options }]) => (
        <div key={category} className="border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleCategory(category)}
            className="flex justify-between items-center w-full text-left"
          >
            <span className="font-medium text-gray-900">{title}</span>
            <svg
              className={`h-4 w-4 transition-transform ${expandedCategories.includes(category) ? 'rotate-180' : ''
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedCategories.includes(category) && (
            <div className="mt-3 space-y-2">
              {options.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(filters[category] || []).includes(option)}
                    onChange={() => handleFilterToggle(category, option)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}