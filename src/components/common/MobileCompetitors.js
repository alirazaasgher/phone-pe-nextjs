import { Battery, Camera, DollarSign, HardDrive, MemoryStick, Monitor } from "lucide-react";
import Link from "next/link";

export default function MobileCompetitors({ phoneDetails, iconMap }) {
    const specs1 = [
        {
            icon: <Camera size={16} className="text-sky-500" />,
            name: "Camera",
            value: (
                <span className="inline-flex items-center gap-1">
                    <span className="text-blue-600">200</span> vs{" "}
                    <span className="text-red-600">48MP</span>
                </span>
            ),
        },
        {
            icon: <Monitor size={16} className="text-purple-500" />,
            name: "Display",
            value: (
                <span className="inline-flex items-center gap-1">
                    <span className="text-blue-600">8.0"</span> vs{" "}
                    <span className="text-red-600">6.9"</span>
                </span>
            ),
        },
        {
            icon: <Battery size={16} className="text-green-500" />,
            name: "Battery",
            value: (
                <span className="inline-flex items-center gap-1">
                    <span className="text-red-600">4400</span>
                    <span className="text-[8px] lg:text-[10px] font-medium opacity-70">
                        VS.
                    </span>
                    <span className="text-blue-600">4832</span>
                    {/* <span className="text-[8px] lg:text-[10px] font-medium opacity-70">
            mAh
          </span> */}
                </span>
            ),
        },
        {
            icon: <DollarSign size={16} className="text-orange-500" />,
            name: "Price",
            value: (
                <span className="inline-flex items-center gap-1">
                    <span className="text-[8px] lg:text-[10px] font-medium opacity-70"></span>
                    <span className="text-blue-600">75,000</span> vs
                    <span className="text-red-600">72,000</span>
                </span>
            ),
        },
    ];
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
                        return grid?.find((s) => s.key === key)?.value || null;
                    };

                    // Get all main spec keys
                    const mainKeys = mainSpecs.map(s => s.key);

                    // Keep only keys that exist in BOTH phones
                    const commonKeys = mainKeys.filter(key =>
                        compSpecs.some(s => s.key === key)
                    );
                    return (
                        <div className="group border  bg-white rounded-lg p-2 shadow-md border-blue-400 transition-all duration-300">
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
                                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-700 rounded-full">
                                    Upcoming
                                </span>
                                </div>
                            </div>

                            <div className="max-w-sm border-t border-gray-700 mx-auto bg-white overflow-hidden">
                                <div className="text-[11px] font-medium text-gray-600 mb-2">
                                    Phone Comparison
                                </div>
                                {commonKeys.map((key, i) => {
                                    const IconComponent = iconMap[key]?.icon;
                                    const textColor = iconMap[key]?.text;
                                    const mainVal = getSpecValue(mainSpecs, key);
                                    const compVal = getSpecValue(compSpecs, key);
                                    return (
                                        <div className="w-full text-[9px] text-gray-700">
                                            <div
                                                key={i}
                                                className="group flex items-center justify-start py-1 shadow-sm rounded-lg border border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-200 px-2"
                                            >
                                                {/* Left Icon */}
                                                {IconComponent && (
                                                    <span className="flex items-center text-gray-500 mr-2">
                                                        <IconComponent size={12} className={`${textColor}`} />
                                                    </span>
                                                )}

                                                {/* Main and Competitor Values */}
                                                <div className="flex items-center w-full space-x-1">
                                                    <span className="text-gray-900 font-semibold">{mainVal}</span>
                                                    <span className="text-gray-400">vs</span>
                                                    <span className="text-gray-500 font-medium">{compVal}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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

                    )
                })}

            </div>
        </div>
    )
}

