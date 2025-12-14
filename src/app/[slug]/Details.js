"use client";
import React from "react";
import {
  Shield,
  Monitor,
  Camera,
  Cpu,
  Battery,
  Share2,
  Wifi,
  Cable,
  RotateCcw,
  Facebook,
  Twitter,
  MessageCircle,
  Calendar,
  Layers,
} from "lucide-react";
import VariantImageGallery from "@/components/VariantImageGallery";
import MobileSpeficaion from "@/components/MobileSpecfications";
import Variants from "@/components/common/Variants";
import MobileCompetitors from "@/components/common/MobileCompetitors";
import PhonePages from "@/components/common/PhonePages";
import PhoneCard from "@/components/PhoneCard";
export default function Details({ phoneDetails, similarMobiles }) {
  const iconMap = {
    display: { icon: Monitor, color: "bg-indigo-100", text: "text-indigo-600" },
    main_camera: { icon: Camera, color: "bg-rose-100", text: "text-rose-600" },
    battery: {
      icon: Battery,
      color: "bg-emerald-100",
      text: "text-emerald-600",
    },
    chipset: { icon: Cpu, color: "bg-amber-100", text: "text-amber-600" },
    wired: { icon: Cable, color: "text-orange-500", text: "text-orange-500" },
    wireless: { icon: Wifi, color: "text-blue-600", text: "text-blue-600" },
    reverse: {
      icon: RotateCcw,
      color: "text-orange-600",
      text: "text-orange-600",
    },
    released_data: {
      icon: Calendar,
      color: "text-blue-600",
      text: "text-blue-800",
    },
    glass_protection: {
      icon: Layers,
      color: "text-purple-600",
      text: "text-purple-800",
    },
    os: {
      icon: Shield,
      color: "text-green-600",
      text: "text-green-800",
    },
    front_camera: {
      icon: Camera,
      color: "text-rose-600",
      text: "text-rose-800",
    },
  };
  let widthClass = "w-[250px] 2xl:w-[350px]"; // default
  if (phoneDetails.variants.length >= 1 && phoneDetails.variants.length <= 3)
    widthClass = "w-[280px] sm:w-[250px] 2xl:w-[350px]";
  return (
    <>
      <div className="hidden md:flex relative px-5 py-2 bg-white/60 backdrop-blur-xl border-b border-gray-200/60 items-center justify-between shadow-sm">
        {/* Left: Name & Release */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight group transition-all duration-300">
            <span className="group-hover:text-blue-600">
              {phoneDetails.name}
            </span>
          </h1>
          <p className="text-xs text-gray-600 mt-2 flex items-center gap-2"></p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {[
            {
              icon: <Facebook className="w-4 h-4" />,
              color: "blue",
              bg: "blue",
            },
            { icon: <Twitter className="w-4 h-4" />, color: "sky", bg: "sky" },
            {
              icon: <MessageCircle className="w-4 h-4" />,
              color: "green",
              bg: "green",
            },
          ].map((btn, i) => (
            <button
              key={i}
              className={`p-2 rounded-full bg-${btn.bg}-50 text-${btn.color}-600 hover:bg-${btn.bg}-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm`}
            >
              {btn.icon}
            </button>
          ))}

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: phoneDetails.name,
                  text: `Check out the ${phoneDetails.name}!`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl
            bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm
            hover:from-blue-600 hover:to-indigo-700 transition-all duration-300
            hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="lg:flex lg:flex-row items-center sm:items-start py-2 sm:py-3">
          {/* Image Gallery */}
          <VariantImageGallery phone={phoneDetails} />

          {/* Right Specs */}
          <div className="flex-1 flex flex-col gap-1">
            {/* Top Specs & Variants Section */}
            <div className="flex flex-col lg:flex-row gap-1">
              {/* Left: Top Specs List */}
              <ul
                // sm:inline
                className={` hidden sm:inline ${widthClass} leading-tight overflow-hidden bg-gradient-to-br from-white to-gray-50/50`}
              >
                {phoneDetails?.searchIndex?.top_specs.map((item, i) => {
                  if (!item.text) return null;
                  const IconComponent = iconMap[item.key].icon;
                  const textColor = iconMap[item.key].text;
                  return (
                    <li
                      key={i}
                      className={` flex items-center gap-1 py-1 px-1 ${
                        i !== 0 ? "border-t border-gray-200/60" : ""
                      } hover:bg-white/70 transition-all duration-200 cursor-pointer group`}
                    >
                      <div className="flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-lg p-1 group-hover:scale-110 transition-transform duration-200">
                        <IconComponent size={20} className={`${textColor}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-inter">
                          {item.text}
                        </span>
                        <span className="text-[11px] font-sans text-gray-500">
                          {item.subText}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="flex-1 w-full">
                <Variants variants={phoneDetails?.variants} />
              </div>
            </div>
            <div className="md:hidden flex items-center justify-between border-b border-gray-100 bg-white py-2">
              {/* LEFT SECTION */}
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-gray-900 leading-tight">
                  {phoneDetails.name}
                </h1>
                <span className="text-[11px] text-gray-700 mt-0.5">
                  Released: {phoneDetails.release_date || "TBA"}
                </span>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex items-center gap-1.5">
                {/* Social Icons */}
                <button
                  className="p-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>

                <button
                  className="p-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>

                <button
                  className="p-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
                  aria-label="Whatsapp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>

                {/* Share Button */}
                <button
                  aria-label="Share"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: phoneDetails.name,
                        text: `Check out the ${phoneDetails.name}!`,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied");
                    }
                  }}
                  className="p-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-900 hover:text-white transition"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              {phoneDetails?.searchIndex?.specs_grid.map((item, i) => {
                if (!item.value) return null;
                const IconComponent = iconMap[item.key].icon;
                const textColor = iconMap[item.key].text;
                const backgroundColor = iconMap[item.key].color;
                return (
                  <li
                    key={i}
                    className={`${backgroundColor} ${
                      item.key === "main_camera" ? "flex lg:hidden" : "flex"
                    } flex flex-col items-start p-2 border border-gray-200/80 rounded-md bg-gradient-to-br from-white to-gray-50/40 cursor-pointer group`}
                  >
                    <div className="text-center group-hover:scale-110 transition-transform duration-200">
                      <IconComponent size={20} className={`${textColor}`} />
                    </div>
                    {item.key !== "battery" && (
                      <>
                        <span className="font-inter text-[12px]">
                          {item.value}
                        </span>
                        <span className="text-[11px] text-gray-500 font-sans">
                          {item.subvalue}
                        </span>
                      </>
                    )}

                    {item.key === "battery" && (
                      <>
                        <span className="font-inter text-[12px]">
                          {item.value}
                        </span>
                        <div className="flex items-center gap-2">
                          {typeof item.subvalue === "object" &&
                          !Array.isArray(item.subvalue) ? (
                            // 👉 Case: subvalue is an object → loop
                            Object.entries(item.subvalue).map(
                              ([key, value]) => {
                                if (!value) return null;
                                const IconComponent = iconMap[key]?.icon;
                                const textColor = iconMap[key]?.color;

                                return (
                                  <span
                                    key={key}
                                    className="flex items-center gap-1"
                                  >
                                    {IconComponent && (
                                      <IconComponent
                                        size={13}
                                        className={textColor}
                                      />
                                    )}
                                    <span className="text-[10px] font-bold text-gray-800">
                                      {value}
                                    </span>
                                  </span>
                                );
                              }
                            )
                          ) : (
                            <span className="text-[10px] font-bold text-gray-800">
                              {item.subvalue}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-full border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            {/* LEFT SECTION — Specifications */}
            <div
              className={`${
                phoneDetails.competitors?.length <= 0
                  ? "lg:col-span-12"
                  : "lg:col-span-9"
              } border-gray-100`}
            >
              <MobileSpeficaion phoneDetails={phoneDetails} />
            </div>
            {phoneDetails.competitors?.length > 0 && (
              <div className="p-1 space-y-1 sm:hidden mt-2">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Competitors for {phoneDetails.name}
                </h2>

                {/* Divider line below heading */}
                <div className="mt-2 mb-3 h-px bg-blue-500"></div>

                <PhonePages
                  phones={phoneDetails?.competitors}
                  phoneDetails={phoneDetails}
                  fromCompetitor={true}
                  iconMap={iconMap}
                />
              </div>
            )}
            {phoneDetails.competitors?.length > 0 && (
              <div className="hidden lg:block lg:col-span-3 p-2 bg-gradient-to-b from-gray-50 to-white border border-gray-100">
                <>
                  <h3 className="text-base font-bold text-gray-900 pb-4 border-b-2 border-blue-500">
                    Competitors for {phoneDetails.name}
                  </h3>

                  {phoneDetails.competitors.map((competitor, index) => (
                    <div key={index} className="flex flex-col mt-1">
                      <MobileCompetitors
                        key={competitor.slug}
                        competitorPhone={competitor}
                        phoneDetails={phoneDetails}
                        iconMap={iconMap}
                      />
                    </div>
                  ))}
                </>
              </div>
            )}
            {similarMobiles?.length > 0 && (
              <div className="p-1 space-y-1 sm:hidden mt-2">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Similar Mobiles
                </h2>

                {/* Divider line below heading */}
                <div className="mt-2 mb-3 h-px bg-blue-500"></div>

                <PhonePages
                  phones={similarMobiles}
                  phoneDetails={phoneDetails}
                  fromCompetitor={false}
                  iconMap={iconMap}
                />
              </div>
            )}
            <div className="px-1 hidden col-span-full sm:flex justify-between items-center border-b border-blue-500 mt-3 pb-2">
              {similarMobiles.length > 0 && (
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Similar Mobiles
                </h2>
              )}

              {similarMobiles.length > 6 && (
                <a className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                  View All
                </a>
              )}
            </div>

            <div className="px-1 py-1 col-span-full hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-2">
              {similarMobiles.map((phone, index) => (
                <PhoneCard
                  key={phone.id}
                  phone={phone}
                  isPriority={index < 6}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
