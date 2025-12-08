import { Battery, Camera, DollarSign, Monitor } from "lucide-react";
import Link from "next/link";

export default function MobileCompetitors({ phoneDetails, iconMap }) {
  return (
    <div className="lg:col-span-3 p-2 bg-gradient-to-b from-gray-50 to-white border border-gray-100">
      <h3 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-blue-500">
        Competitors for {phoneDetails.name}
      </h3>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
        {phoneDetails?.competitors.map((item, i) => {
          // MAIN phone specs
          const mainSpecs = phoneDetails?.searchIndex?.specs_grid || [];

          // COMPETITOR phone specs
          const compSpecs = item?.searchIndex?.specs_grid || [];

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
            <div
              key={item.id}
              className="group border bg-white rounded-lg p-1 shadow-md border-blue-400 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-1">
                <img
                  src={`${item.primary_image}`}
                  alt={`${item.name}`}
                  className="w-16 h-20 object-contain rounded-md bg-gray-50 flex-shrink-0"
                />
                <div>
                  <a
                    href=""
                    className="block text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </a>
                  {/* <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-700 rounded-full">
                    Upcoming
                  </span> */}
                </div>
              </div>

              <div className="max-w-sm border-t border-gray-700 mx-auto bg-white overflow-hidden">
                <div className="text-[11px] font-medium text-gray-600 mb-2">
                  Phone Comparison
                </div>
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
                    {phoneDetails?.searchIndex?.min_price || "-"}
                  </span>
                  <span className="text-gray-400">vs</span>
                  <span className="text-red-600 font-semibold">
                    {item?.searchIndex?.min_price || "-"}
                  </span>
                </span>
              </div>
              <div className="flex justify-end mt-4">
                <Link
                  href={`/${item.slug}`}
                  className="inline-flex items-center px-4 py-2 text-[12px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                >
                  View Details →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
