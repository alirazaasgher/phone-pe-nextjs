import { HardDrive, Package } from "lucide-react";
export default function Variants({ variants, storageType}) {
  const colClass = variants.length <= 2 ? "grid-cols-1" : "grid-cols-2";
  const isThree = variants.length === 3;
  return (
    <>
      <div className="border-gray-200 mt-2 sm:mt-0">
        {/* Variant Cards */}
        <div className={`grid ${colClass} gap-2`}>
          {variants.map((v, i) => (
            <div
              key={i}
              className={`bg-white rounded shadow-sm px-3 py-3 hover:shadow-md transition-shadow cursor-pointer ${
                isThree && i === 2 ? "col-span-2" : ""
              }`}
            >
              {/* <MemoryStick className="w-4 h-4 text-orange-600" /> */}
              {/* Variant Name */}
              <div className="flex items-center justify-between w-full">
                <span className="font-inter text-[12px] font-medium">
                  {v.ram}GB RAM
                </span>

                {storageType && (
                  <span className="font-sans text-[10px] bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 px-1 py-1 rounded font-semibold shadow-sm border border-orange-200">
                    {storageType}
                  </span>
                )}
              </div>

              {/* Prices and badge */}
              <div className="relative text-[11px] text-gray-800">
                <div className="flex flex-col">
                  <span>
                    PKR {v.pkr_price && v.pkr_price > "0" ? v.pkr_price : "TBA"}
                  </span>
                  <span>
                    USD {v.usd_price && v.usd_price > "0" ? v.usd_price : "TBA"}
                  </span>
                </div>

                {/* Badge at bottom-right of price */}
                {v.storage && (
                  <span className="absolute bottom-0 right-0 bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] shadow-sm whitespace-nowrap flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-xs font-bold text-blue-900">
                      {v?.storage?.toString().toUpperCase().includes("TB")
                        ? `${v?.storage}`
                        : `${v?.storage}GB`}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-full mt-1">
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded px-4 py-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs text-amber-800 font-medium">
                Prices may vary by region and retailer
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
