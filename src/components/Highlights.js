import React from "react";
import { Monitor, Camera, Cpu, Battery, Zap } from "lucide-react";

export default function Highlights ({ phoneDetails }) {
  const highlights = [
    {
      id: "display",
      icon: Monitor,
      gradientFrom: "from-cyan-500/20",
      gradientTo: "to-blue-500/20",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-400",
      value: `${phoneDetails?.display?.size || "6.7"}"`,
      subtext: phoneDetails?.display?.resolution || "1440x3136 pixels",
    },
    {
      id: "camera",
      icon: Camera,
      gradientFrom: "from-purple-500/20",
      gradientTo: "to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
      value: (
        <>
          {phoneDetails?.camera?.main || "200"}
          <span className="text-lg">MP</span>
        </>
      ),
      subtext: phoneDetails?.camera?.video || "4320p video",
    },
    {
      id: "chipset",
      icon: Cpu,
      gradientFrom: "from-orange-500/20",
      gradientTo: "to-red-500/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-400",
      value: phoneDetails?.chipset?.ram || "12/16GB",
      subtext: phoneDetails?.chipset?.name || "Snapdragon 8 Elite",
    },
    {
      id: "battery",
      icon: Battery,
      gradientFrom: "from-green-500/20",
      gradientTo: "to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400",
      value: (
        <>
          {phoneDetails?.battery?.capacity || "7000"}
          <span className="text-lg">mAh</span>
        </>
      ),
      subtext: (
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3" />
          {phoneDetails?.battery?.charging || "120W / 50W"}
        </span>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  {highlights.map((item, index) => (
    <div
      key={index}
      className={`
        bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} 
        backdrop-blur-sm rounded-2xl p-5 border ${item.borderColor} 
        hover:scale-[1.04] hover:shadow-lg transition-all duration-300 ease-out
      `}
    >
      <item.icon className={`w-6 h-6 ${item.iconColor} mb-2`} />
      <div className="text-3xl md:text-3xl font-bold text-white mb-1">
        {item.value}
      </div>
      <div className="text-xs text-gray-300">{item.subtext}</div>
    </div>
  ))}
</div>

  );
};

