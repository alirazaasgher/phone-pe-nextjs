// src/components/PhoneCard.js
"use client";
import Link from "next/link";
import Image from "next/image";
import { Smartphone, Calendar, ChevronRight } from "lucide-react";
import {
  Star,
  Cable,
  Cpu,
  RotateCcw,
  Monitor,
  Camera,
  Battery,
  Wifi,
  X,
} from "lucide-react"; // Icons from Lucide
import { Inter, Poppins } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const ChipsetCard = ({ chipset }) => {
  const tierConfig = {
    flagship: {
      badge:
        "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-amber-200",
      glow: "from-amber-50 to-orange-50",
      dot: "bg-amber-400",
      accent: "text-amber-500",
    },
    mid_range: {
      badge:
        "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-200",
      glow: "from-blue-50 to-indigo-50",
      dot: "bg-blue-500",
      accent: "text-blue-500",
    },
    budget: {
      badge:
        "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-gray-200",
      glow: "from-gray-50 to-slate-50",
      dot: "bg-gray-400",
      accent: "text-gray-500",
    },
  };

  const tier = tierConfig[chipset.tier] || tierConfig.budget;

  return (
    <div
      className={`${inter?.className ?? ""} group relative bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden h-full`}
    >
      {/* Top Section: Image & Badge */}
      <div
        className={`relative bg-gradient-to-br ${tier.glow} overflow-hidden pt-5 px-4 pb-2`}
      >
        {/* Tier Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-md ${tier.badge}`}
          >
            {chipset.tier.replace("_", " ")}
          </span>
        </div>

        {/* Year pill - top right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/80 backdrop-blur-sm text-gray-500 text-[9px] font-semibold px-2 py-0.5 rounded-full border border-gray-200 shadow-sm">
            {chipset.announced_year}
          </span>
        </div>

        {/* Image Container */}
        <a
          href={`/soc/${chipset.slug}`}
          className="block relative aspect-square w-full max-w-[160px] mx-auto overflow-hidden"
        >
          <img
            src={chipset?.primary_image || "/images/default_placeholder.webp"}
            alt={`${chipset.brand} ${chipset.name}`}
            className="w-full h-full object-contain p-2 transform group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-md"
          />
        </a>

        {/* Bottom fade into content */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content Section */}
      <div className="px-4 pt-3 pb-4 flex flex-col flex-grow bg-white">
        {/* Brand */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`w-1.5 h-1.5 rounded-full ${tier.dot}`} />
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${tier.accent}`}
          >
            {chipset.brand}
          </span>
        </div>

        {/* Chipset Name */}
        <a href={`/soc/${chipset.slug}`} className="block mb-3">
          <h3 className="font-extrabold text-sm lg:text-[15px] text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors leading-tight">
            {chipset.name.replace(/-/g, " ")}
          </h3>
        </a>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          {/* Phones count or static label */}
          <div className="flex items-center gap-1 text-gray-400">
            <Smartphone size={13} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">
              {chipset.phones_count ?? "—"} phones
            </span>
          </div>

          {/* Specs CTA */}
          <a
            href={`/soc/${chipset.slug}`}
            className="flex items-center gap-1 text-[11px] font-bold text-gray-400 group-hover:text-blue-500 transition-colors"
          >
            View Specs
            <ChevronRight size={14} strokeWidth={3} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChipsetCard;
