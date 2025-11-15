// components/ActiveFilters.js (Client Component)
"use client";
import { X } from 'lucide-react';
import { useRouter } from "next/navigation";
function getActiveTags(parsed, availableFilters) {
  console.log(parsed)
  const tags = [];
  const capitalize = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // Brands
  if (Array.isArray(parsed.brands)) {
    parsed.brands.forEach(b => {
      const cleaned = b.replace(/-mobile$/, "").split("-").filter(Boolean);
      cleaned.forEach(name => {
        if (availableFilters.brands?.includes(name.toLowerCase())) {
          tags.push(capitalize(name));
        }
      });
    });
  }

  // Price Range
  if (Array.isArray(parsed.priceRange) && parsed.priceRange.length === 2) {
    const [min, max] = parsed.priceRange;
    if (min != null && max != null) {
      tags.push(`$${min} - $${max}`);
    }
  }

  // RAM & Storage
  const specMappings = [
    { key: "ram", label: "GB RAM" },
    { key: "storage", label: "GB Storage" }
  ];

  specMappings.forEach(({ key, label }) => {
    if (Array.isArray(parsed[key])) {
      parsed[key].filter(Boolean).forEach(v => {
        if (availableFilters[key]?.includes(v)) {
          tags.push(`${v}${label}`);
        }
      });
    }
  });

  // Features
  if (Array.isArray(parsed.features)) {
    parsed.features.filter(Boolean).forEach(f => {
      if (availableFilters.features?.includes(f.toLowerCase())) {
        tags.push(capitalize(f));
      }
    });
  }

  // Category
  if (parsed.category && availableFilters.category?.includes(parsed.category.toLowerCase())) {
    tags.push(capitalize(parsed.category));
  }

  return tags;
}



function tagToFilter(tag) {
  const cleanTag = tag.trim();

  if (/^\d+\s*RAM$/i.test(cleanTag)) {
    return `${cleanTag.replace(/\s*RAM$/i, "").trim()}gb-ram`;
  }

  if (/^\d+\s*Storage$/i.test(cleanTag)) {
    return `${cleanTag.replace(/\s*Storage$/i, "").trim()}gb-storage`;
  }

  if (/^\$\d+\s*-\s*\$\d+$/.test(cleanTag)) {
    const [min, max] = cleanTag.replace(/\$/g, "").split("-").map(s => s.trim());
    return `price-${min}-to-${max}`;
  }

  return cleanTag.toLowerCase().replace(/\s+/g, "-");
}

function removeBrandFromFilter(filterString, brand) {
  const cleaned = filterString
    .toLowerCase()
    .replace(new RegExp(`\\b${brand.toLowerCase()}\\b-?`, "gi"), "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, ""); // remove leading/trailing dash

  // If it resolves to generic meaningless string → return empty string
  const invalids = ["","mobile-phones"];
  return invalids.includes(cleaned) ? "" : cleaned;
}



export default function ActiveFilters({ filters, parsed}) {
  const activeTags = getActiveTags(parsed);
  const router = useRouter(activeTags, parsed);
  const removeFilter = (tag) => {
  const filterValue = tagToFilter(tag, filters);
  let updatedFilters = [...filters];

  // Find combined brand filters like: "oneplus-samsung-mobile-phones"
  const combinedBrand = filters.find(f => f.includes("-mobile"));

  if (combinedBrand && filterValue && combinedBrand.includes(filterValue)) {
    const newBrandString = removeBrandFromFilter(combinedBrand, filterValue);

    updatedFilters = filters.map(f => (f === combinedBrand ? newBrandString : f))
                           .filter(Boolean); // remove empty entries
  } else {
    updatedFilters = updatedFilters.filter(f => f !== filterValue);
  }

  const path = updatedFilters.length
    ? `/mobiles/${updatedFilters.join("/")}`
    : `/mobiles`;

  router.push(path);
};
  return (
    <>
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeTags.map((tag) => (
            <div
              key={tag}
              title={tag}
              className="group flex items-center gap-2 px-3 py-1.5
                   bg-white/70 backdrop-blur-sm 
                   border border-blue-100/60 
                   rounded-full text-[13px] font-medium 
                   text-blue-700 shadow-sm
                   hover:bg-blue-50 hover:shadow-md hover:border-blue-200
                   transition-all duration-200 cursor-pointer"
            >
              {/* Tag text */}
              <span className="truncate max-w-[140px]">{tag}</span>

              {/* Remove button */}
              <button
                onClick={() => removeFilter(tag)}
                className="flex items-center justify-center w-5 h-5 rounded-full 
                     bg-blue-100/70 text-blue-700
                     group-hover:bg-blue-500 group-hover:text-white 
                     transition-all duration-300 hover:rotate-90 shadow-sm"
                aria-label={`Remove ${tag} filter`}
              >
                <X size={12} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}

    </>

  );
}
