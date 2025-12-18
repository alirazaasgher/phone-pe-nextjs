// components/ActiveFilters.js (Client Component)
"use client";
import { useTransition } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { tagToFilter } from "@/utils/helpers";

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
  activeTags,
  setLoading,
}) {
  const [isPending, startTransition] = useTransition();
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
