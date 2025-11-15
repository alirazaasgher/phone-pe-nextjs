import { ChevronDown,Check } from "lucide-react";
import { useState } from "react";
export default function CameraTab({ phone, activeTab }) {
    const [showRearComparison, setShowRearComparison] = useState(false);
    return (
        <>
            {activeTab === "camera" && (
                <div className="space-y-8">
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Rear Camera Section */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                        Main Camera
                                        <button
                                            className="ml-2 p-1 rounded hover:bg-gray-100 transition"
                                            // onClick={() => setShowRearComparison(true)}
                                            aria-label="Show rear camera comparison"
                                        >
                                            <ChevronDown className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Main Camera</span>
                                        <span className="font-medium">200MP</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Ultra Wide</span>
                                        <span className="font-medium">50MP</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Telephoto</span>
                                        <span className="font-medium">12MP</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Periscope</span>
                                        <span className="font-medium">10MP</span>
                                    </div>
                                </div>
                            </div>

                            {/* Camera Features Section */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                    Camera Features
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        "8K Video Recording",
                                        "100x Space Zoom",
                                        "Nightography",
                                        "AI Photo Enhancement",
                                        "Director's View",
                                        "Portrait Video",
                                        "Super HDR",
                                        "Expert RAW",
                                    ].map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-3 bg-gray-50 rounded-lg"
                                        >
                                            <Check className="w-4 h-4 text-green-500 mr-2" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Front Camera Section */}
                        <div className="mt-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                            Front Camera
                                            <button
                                                className="ml-2 p-1 rounded hover:bg-gray-100 transition"
                                                onClick={() => setShowRearComparison(true)}
                                                aria-label="Show rear camera comparison"
                                            >
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                            <span className="text-gray-600">Main Camera</span>
                                            <span className="font-medium">200MP</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                            <span className="text-gray-600">Ultra Wide</span>
                                            <span className="font-medium">50MP</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                            <span className="text-gray-600">Telephoto</span>
                                            <span className="font-medium">12MP</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                            <span className="text-gray-600">Periscope</span>
                                            <span className="font-medium">10MP</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                        Camera Features
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            "8K Video Recording",
                                            "100x Space Zoom",
                                            "Nightography",
                                            "AI Photo Enhancement",
                                            "Director's View",
                                            "Portrait Video",
                                            "Super HDR",
                                            "Expert RAW",
                                        ].map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center p-3 bg-gray-50 rounded-lg"
                                            >
                                                <Check className="w-4 h-4 text-green-500 mr-2" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Rear Camera Comparison Modal */}
                    {showRearComparison && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md relative">
                                {/* Close Button */}
                                <button
                                    onClick={() => setShowRearComparison(false)}
                                    className="absolute top-3 right-3 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>

                                {/* Header */}
                                <div className="p-5 border-b">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Rear Camera compared to
                                    </h3>
                                    <div className="flex mt-3 border-b">
                                        <button className="px-3 py-2 text-sm font-semibold text-orange-600 border-b-2 border-orange-500">
                                            40 - 200 K PHONES
                                        </button>
                                        <button className="px-3 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800">
                                            ALL PHONES
                                        </button>
                                    </div>
                                </div>

                                {/* Scores */}
                                <div className="p-5 space-y-5">
                                    {[
                                        { label: "This Device", value: 96 },
                                        { label: "Average in group", value: 84 },
                                        { label: "Best in this group", value: 99 },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            {/* Label + Progress Bar */}
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {item.label}
                                                </span>
                                                <div className="w-full h-2 bg-gray-200 rounded mt-1">
                                                    <div
                                                        className="h-2 bg-green-600 rounded"
                                                        style={{ width: `${item.value}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Score Badge */}
                                            <span className="ml-3 font-bold text-white bg-green-600 px-3 py-1 rounded-lg text-sm">
                                                {item.value}%
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="px-5 pb-5 text-xs text-gray-500">
                                    Group: <span className="font-semibold">40 - 200 K Phones</span> | Based
                                    on specs, benchmarks & expert ratings
                                </div>
                                <div className="px-5 pb-5">
                                    <a
                                        href="#"
                                        className="text-orange-600 font-semibold text-sm hover:underline"
                                    >
                                        See Best Rear Camera Phones in 40 - 200 K
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}