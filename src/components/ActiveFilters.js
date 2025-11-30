// components/ActiveFilters.js (Client Component)
"use client";
import { useTransition } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
const formatNumber = (num) => {
  if (num == null) return "";
  return num; // e.g., 40000 → "40,000"
};
function getActiveTags(parsed, availableFilters) {
  const tags = [];
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  // Brands
  if (Array.isArray(parsed.brands)) {
    parsed.brands.forEach((b) => {
      const cleaned = b
        .replace(/-mobile$/, "")
        .split("-")
        .filter(Boolean);
      cleaned.forEach((name) => {
        if (
          availableFilters.brands.some(
            (brand) => brand.name.toLowerCase() === name.toLowerCase()
          )
        ) {
          tags.push(capitalize(name));
        }
      });
    });
  }

  // Price Range
  // Ensure priceRange is an array of ranges
  if (Array.isArray(parsed.priceRange)) {
    parsed.priceRange.forEach((range) => {
      if (!Array.isArray(range)) return;

      const [min, max] = range;

      if (min != null && max != null) {
        tags.push(`${formatNumber(min)} - ${formatNumber(max)}`);
      } else if (min != null) {
        tags.push(`${formatNumber(min)}`);
      } else if (max != null) {
        tags.push(`${formatNumber(max)}`);
      }
    });
  }

  // Screen Size
  if (Array.isArray(parsed.screenSize)) {
    parsed.screenSize.forEach((range) => {
      let tag = range;

      // Match "min-to-max" formats like "4.5to5.0" or "5.0to5.5"
      const match = range.match(/^(\d+(\.\d+)?)to(\d+(\.\d+)?)$/);
      if (match) {
        const min = match[1];
        const max = match[3];
        tag = `${min} - ${max} inch`; // human-readable format
      } else if (!isNaN(Number(range))) {
        // Single number, e.g., "6"
        tag = `${range} inch`;
      }

      // Push to tags array
      tags.push(tag);
    });
  }

  // RAM & Storage
  const specMappings = [
    { key: "ram", label: "GB RAM" },
    { key: "storage", label: "GB Storage" },
  ];

  specMappings.forEach(({ key, label }) => {
    if (Array.isArray(parsed[key])) {
      parsed[key].filter(Boolean).forEach((v) => {
        // Match with availableFilters[key] objects by 'name' or 'value'
        const match = availableFilters[key]?.find(
          (f) => f.name === `${v}gb` || f.value === `${v} GB`
        );

        if (match) {
          tags.push(`${v}${label}`);
        }
      });
    }
  });

  if (Array.isArray(parsed.batteryCapacity)) {
    parsed.batteryCapacity.forEach((batt) => {
      let tag = batt;

      // Match numeric values with optional "mAh" suffix
      const match = batt.match(/^(\d+)(mAh)?$/i);
      if (match) {
        const value = match[1];
        tag = `${value} mAh`; // human-readable format
      }

      // Push to tags array
      tags.push(tag);
    });
  }

  return tags;
}

function tagToFilter(tag) {
  const cleanTag = tag.trim().toLowerCase();
  // Screen size range: e.g., "4.5to5.0 inch", "5.0-5.5 inch"
  if (/^\d+(\.\d+)?\s*(to|-)\s*\d+(\.\d+)?\s*inch$/i.test(cleanTag)) {
    const parts = cleanTag
      .replace(/\s*inch\s*$/i, "")
      .split(/\s*(?:to|-)\s*/)
      .map((s) => s.trim());
    return `${parts[0]}to${parts[1]}-screen-size`;
  }

  // Battery: must contain "mAh" to differentiate from price
  // e.g., "3000 mAh", "3000-4000 mAh"
  if (/^\d+(\s*(?:to|-)\s*\d+)?\s*mAh$/i.test(cleanTag)) {
    const value = cleanTag
      .replace(/\s*mAh\s*$/i, "")
      .replace(/\s*(?:to|-)\s*/g, (match) =>
        match.includes("to") ? "to" : "-"
      )
      .trim();
    return `${value}mAh-battery`;
  }

  // RAM: e.g., "6 RAM", "8GB RAM"
  if (/^\d+\s*(?:gb\s*)?ram$/i.test(cleanTag)) {
    return `${cleanTag.replace(/\s*(?:gb\s*)?ram$/i, "").trim()}gb-ram`;
  }

  // Storage: e.g., "128 Storage", "256GB Storage"
  if (/^\d+\s*(?:gb\s*)?storage$/i.test(cleanTag)) {
    return `${cleanTag.replace(/\s*(?:gb\s*)?storage$/i, "").trim()}gb-storage`;
  }

  // Price: single number (no units)
  if (/^\d+$/.test(cleanTag)) {
    return `price-${cleanTag}`;
  }

  // Default: replace spaces with dash
  return cleanTag.replace(/\s+/g, "-");
}

function removeBrandFromFilter(filterString, brand) {
  const cleaned = filterString
    .toLowerCase()
    .replace(new RegExp(`\\b${brand.toLowerCase()}\\b-?`, "gi"), "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, ""); // remove leading/trailing dash

  // If it resolves to generic meaningless string → return empty string
  const invalids = ["", "mobile-phones"];
  return invalids.includes(cleaned) ? "" : cleaned;
}
const isPriceFilter = (f) => {
  if (!f) return false;

  // Normalize multiple dashes to single dash
  const cleanF = f.replace(/-+/g, "-");

  // price-from-60000, price-up-to-60000, price-60000
  if (/^price-(from|up-to|\d+)-?\d*$/.test(cleanF)) return true;

  // range with 'to' → 40000-to-50000
  if (/^\d+-to-\d+$/.test(cleanF)) return true;

  // single dash numeric range → 15000-35000 or normalized triple dash
  if (/^\d+-\d+$/.test(cleanF)) return true;

  // single number → 50000
  if (/^\d+$/.test(cleanF)) return true;

  return false;
};

export default function ActiveFilters({
  filters,
  parsed,
  availableFilters,
  setLoading,
}) {
  const [isPending, startTransition] = useTransition();
  const activeTags = getActiveTags(parsed, availableFilters);
  const router = useRouter(activeTags, parsed);
  const removeFilter = (tag) => {
    setLoading(true);

    const filterValue = tagToFilter(tag, filters);

    let updatedFilters = [...filters];

    const combinedBrand = filters.find((f) => f.includes("-mobile"));
    const priceCategories = [
      "budget-smartphones",
      "best-value-phones",
      "popular-picks",
      "mid-range",
      "mid-range-phones",
      "premium-mobiles",
      "flagship-phones",
    ];

    const isPriceCategory = (f) => priceCategories.includes(f);
    // Remove price filters if the clicked tag is a price
    if (isPriceFilter(filterValue)) {
      updatedFilters = updatedFilters.filter((f) => !isPriceFilter(f));
      // Remove any dynamically generated price category
      updatedFilters = updatedFilters.filter((f) => !isPriceCategory(f));
    }

    // Remove brand inside combined brands
    else if (combinedBrand && combinedBrand.includes(filterValue)) {
      const newBrandString = removeBrandFromFilter(combinedBrand, filterValue);
      updatedFilters = updatedFilters
        .map((f) => (f === combinedBrand ? newBrandString : f))
        .filter(Boolean); // Remove empty items
    }
    // Normal remove
    else {
      updatedFilters = updatedFilters.filter((f) => f !== filterValue);
    }

    const path = updatedFilters.length
      ? `/mobiles/${updatedFilters.join("/")}`
      : `/mobiles`;

    startTransition(() => {
      router
        .push(path)
        .catch(() => router.push("/mobiles"))
        .finally(() => setLoading(false));
    });
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
