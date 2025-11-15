import { useState } from "react";
import { ChevronDown, ChevronUp, Monitor, Cpu, Zap, Download, Camera, Battery, Smartphone, ArrowRight, Shield } from "lucide-react";
export default function SpecsTab({ phone, activeTab }) {
    const sectionIcons = {
        network: "📡",
        body: "📱",
        display: "🖥️",
        platform: "⚡",
        memory: "💾",
        main_camera: "📸",
        selfie_camera: "🤳",
        sound: "🔊",
        connectivity: "🌐",
        battery: "🔋",
        sensors: "🎯",
        misc: "⭐"
    };
    return (
        <>
            {activeTab === "specs" && (
                <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-hidden">
                    {Object.entries(phone.specs).map(([section, details]) => (
                        <section key={section} className="mb-8">
                            <h2 className="text-2xl font-extrabold text-gray-900 capitalize mb-4">{section.replace(/_/g, " ")}</h2>
                            <div className="divide-y divide-gray-200">
                                {Object.entries(details).map(([key, value], idx) => (
                                    <div
                                        key={key}
                                        className={`grid grid-cols-2 py-2 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                    >
                                        <div className="text-sm text-gray-600 capitalize">{key.replace(/_/g, " ")}</div>
                                        <div className="text-sm text-gray-800">
                                            {Array.isArray(value) ? value.join(", ") : value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

            )}
        </>
    )
}