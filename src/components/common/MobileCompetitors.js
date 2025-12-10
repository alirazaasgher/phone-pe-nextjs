import {DollarSign} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function MobileCompetitors({ competitorPhone, phoneDetails, iconMap }) {
  const mainSpecs = phoneDetails?.searchIndex?.specs_grid || [];
  // COMPETITOR phone specs
  const compSpecs = competitorPhone?.searchIndex?.specs_grid || [];
  // Helper to get spec value
  const getSpecValue = (grid, key) => {
    let value = grid?.find((s) => s.key === key)?.value || null;
    // Remove (xxx) if key is chipset
    if (key.toLowerCase() === "chipset" && value) {
      // Remove anything in parentheses including spaces
      value = value.replace(/\s*\(.*?\)/g, "");
    }

    return value;
  };

  // Get all main spec keys
  const mainKeys = mainSpecs.map((s) => s.key);

  // Keep only keys that exist in BOTH phones
  const commonKeys = mainKeys.filter((key) =>
    compSpecs.some((s) => s.key === key)
  );
  return (
    <>
     <div
  key={phoneDetails.id}
  className="min-h-[302px] group border bg-white rounded-lg p-1 shadow-md border-blue-400 transition-all duration-300 flex flex-col"
>
  <div className="flex-1">
       <div className="flex items-start gap-4 mb-2 pb-2 border-b border-gray-200">
          <div className="relative w-20 h-24 flex items-center justify-center">
          <Image
    src={phoneDetails.primary_image}
    alt={phoneDetails.name}
    fill
    className="object-contain object-center p-1"
    sizes="80px"
  />
            <div className="absolute -top-0 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-[9px] font-bold">VS</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <a
              href=""
              className="block text-base font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-1"
            >
              {competitorPhone.name}
            </a>
            {/* <span className="inline-flex items-center gap-1 px-1 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Competitor
            </span> */}
          </div>
        </div>

        <div className="max-w-sm border-gray-700 mx-auto bg-white overflow-hidden">
          {commonKeys.map((key) => {
            const IconComponent = iconMap[key]?.icon;
            const textColor = iconMap[key]?.text;
            const mainVal = getSpecValue(mainSpecs, key);
            const compVal = getSpecValue(compSpecs, key);

            return (
              <div key={key} className="w-full text-[8.5px]">
                <div className="group flex items-center py-1 px-1 shadow-sm rounded-lg border border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-200">
                  {/* Left Icon */}
                  {IconComponent && (
                    <span
                      className={`flex-shrink-0 flex items-center mr-2 ${textColor}`}
                    >
                      <IconComponent size={13} />
                    </span>
                  )}

                  {/* Values */}
                  <div className="flex items-center gap-1 w-full">
                    {/* MAIN VALUE */}
                    <span className="text-blue-600 font-semibold break-words leading-tight">
                      {mainVal || "-"}
                    </span>

                    {/* VS */}
                    <span className="text-gray-400 px-1 whitespace-nowrap">
                      vs
                    </span>

                    {/* COMPETITOR VALUE */}
                    <span className="text-red-600 font-semibold break-words leading-tight">
                      {compVal || "-"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Price Comparison */}
          <span className="flex items-center py-1 px-1 shadow-sm rounded-lg border border-gray-100 text-[9px] gap-2">
            <DollarSign size={13} className="text-orange-500" />
            <span className="text-blue-600 font-semibold">
              {phoneDetails?.searchIndex?.min_price_usd || "-"}
            </span>
            <span className="text-gray-400">vs</span>
            <span className="text-red-600 font-semibold">
              {competitorPhone?.searchIndex?.min_price_usd || "-"}
            </span>
          </span>
        </div>
  </div>
     
        <div className="flex justify-end mt-4">
          <Link
            href={`/${competitorPhone.slug}`}
            className="inline-flex items-center px-4 py-2 text-[12px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
          >
            View Details →
          </Link>
        </div>
      </div>


    </>
  );
}
