import { HardDrive, Package } from "lucide-react";
export default function Variants({ variants }) {
  return (
    <>
      <div className="border-gray-200">
        {/* Variant Cards */}
        <div className="grid grid-cols-2 gap-2">
          {variants.map((v, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm px-3 py-3 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* <MemoryStick className="w-4 h-4 text-orange-600" /> */}
              {/* Variant Name */}
              <div className="flex items-center justify-between w-full">
                <span className="font-inter text-[12px] font-medium">
                  {v.ram}GB RAM
                </span>

                {v.storage_type && (
                  <span className="font-sans text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-medium">
                    {v.storage_type}
                  </span>
                )}
              </div>

              {/* Prices and badge */}
              <div className="relative text-[11px] text-gray-800">
                <div className="flex flex-col">
                  <span>PKR {v.pkr_price}</span>
                  <span>USD {v.usd_price}</span>
                </div>

                {/* Badge at bottom-right of price */}
                {v.storage && (
                  <span className="absolute bottom-0 right-0 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-sm whitespace-nowrap flex items-center gap-1">
                    <HardDrive className="w-3 h-3" />
                    {v?.storage?.toString().toUpperCase().includes("TB")
                      ? `${v?.storage}`
                      : `${v?.storage}GB`}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-full bg-gray-50 rounded-md mt-0.5">
          <div className="flex justify-between items-center w-full">
            {/* <p className="text-[10px] text-gray-500 italic">
              Dual SIM (Hybrid) • No SD card slot
            </p> */}
            <span className="text-[10px] text-gray-500 italic">
              Price may differ
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
