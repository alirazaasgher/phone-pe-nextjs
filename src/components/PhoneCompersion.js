"use client";
import React, {
  useCallback,
  useEffect,
  useState,
  useTransition,
  useRef,
} from "react";
import {
  Battery,
  Smartphone,
  Camera,
  Cpu,
  Wifi,
  Speaker,
  Shield,
  Zap,
  Search,
  Plus,
  Cable,
  RotateCcw,
  Aperture,
  ZoomIn,
  Film,
  BatteryCharging,
  Gamepad2,
  Gauge,
  SlidersHorizontal,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { searchPhones } from "@/app/services/phones";
import PhoneCard from "./PhoneCard";
import Loader from "@/app/loading";
import BarComparison from "@/components/BarComparison";
import OverallScores from "@/components/OverallScores";
import VerdictDisplay from "./VerdictDisplay";
import dynamic from "next/dynamic";
import MarketGraphPopup from "./MarketGraphPopup";
const TurnstileWidget = dynamic(() => import("./TurnstileWidget"), {
  ssr: false,
});
const PhoneComparison = ({ phones, comparisonData, similarMobiles }) => {
  const [showOnlyDiff, setShowOnlyDiff] = useState(false);
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [firstLoad, setFirstLoad] = useState(true);
  const [maxDevices, setMaxDevices] = useState(4);
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  // 1. Import useState at the top
  const [marketModal, setMarketModal] = useState({ isOpen: false, data: null });

  // 2. Define the handler
  const handleOpenMarketGraph = useCallback((data) => {
    if (data && data.peers && data.peers.length > 0) {
      setMarketModal({ isOpen: true, data });
    }
  }, []);
  const handleInputClick = () => {
    if (!verified && selectedPhones.length < maxDevices) {
      setShowTurnstile(true);
    }
  };
  const handleVerified = (token) => {
    setTurnstileToken(token);
    setVerified(true);
    setShowTurnstile(false);
  };
  const turnstileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (turnstileRef.current && !turnstileRef.current.contains(e.target)) {
        setShowTurnstile(false);
      }
    };

    if (showTurnstile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTurnstile]);
  const usageOptions = [
    {
      value: "balanced",
      label: "Balanced",
      icon: <SlidersHorizontal size={16} />,
    },
    {
      value: "gaming",
      label: "Gaming",
      icon: <Gamepad2 size={16} />,
    },
    {
      value: "battery",
      label: "Battery",
      icon: <Gauge size={16} />,
    },
    {
      value: "camera",
      label: "Camera",
      icon: <Camera size={16} />,
    },
    {
      value: "media_consumer",
      label: "Media Consumer",
      icon: <Film size={16} />,
    },
  ];
  const parts = pathname.split("/").filter(Boolean);
  const currentUsage =
    parts.find((p) => usageOptions.some((opt) => opt.value === p)) || "";
  const keyCategories = Object.keys(
    comparisonData?.scores[0]?.category_scores || {},
  );

  const CATEGORY_COLORS = {
    display: "blue",
    camera: "purple",
    performance: "green",
    battery: "amber",
    design: "pink",
    default: "gray",
  };

  const getSpecIcon = (category) => {
    const icons = {
      capacity: <BatteryCharging className="w-4 h-4 text-amber-600" />,
      display: <Smartphone className="w-4 h-4" />,
      chipset: <Cpu className="w-4 h-4 text-amber-600" />,
      software: <Zap className="w-4 h-4" />,
      design: <Shield className="w-4 h-4" />,
      connectivity: <Wifi className="w-4 h-4" />,
      audio: <Speaker className="w-4 h-4" />,
      sensors: <Shield className="w-4 h-4" />,
      Fast: <Cable className="w-4 h-4 text-orange-500" />,
      Wirless: <Wifi className="w-4 h-4 text-blue-600" />,
      Reverce: <RotateCcw className="w-4 h-4 text-orange-600" />,
      wide_aperture: <Aperture className="w-4 h-4" />,
      wide: <Camera className="w-4 h-4 text-rose-600" />,
      ultrawide: <Camera className="w-4 h-4 text-rose-600" />,
      periscope_telephoto: <Camera className="w-4 h-4 text-rose-600" />,
      telephoto: <Camera className="w-4 h-4 text-rose-600" />,
      ultrawide_aperture: <Aperture className="w-4 h-4" />,
      ultrawide_aperture: <Aperture className="w-4 h-4" />,
      periscope_telephoto_aperture: <Aperture className="w-4 h-4" />,
      front: <Camera className="w-4 h-4 text-rose-600" />,
      optical_zoom: <ZoomIn className="w-4 h-4" />,
      front_video: <Film className="w-4 h-4" />,
      video_resolution: <Film className="w-4 h-4" />,
      flash: <Zap className="w-4 h-4" />,
    };
    return icons[category] || <Smartphone className="w-4 h-4" />;
  };

  const getScoreClasses = (score) => {
    if (score >= 9)
      return {
        badge: "bg-emerald-100 text-emerald-700",
        bar: "bg-gradient-to-r from-emerald-400 to-emerald-600",
        label: "🔥 Excellent",
      };
    if (score >= 7)
      return {
        badge: "bg-blue-100 text-blue-700",
        bar: "bg-gradient-to-r from-blue-400 to-blue-600",
        label: "👍 Good",
      };
    return {
      badge: "bg-amber-100 text-amber-700",
      bar: "bg-gradient-to-r from-amber-400 to-amber-600",
      label: "✓ Average",
    };
  };
  useEffect(() => {
    const updateLimit = () => {
      setMaxDevices(window.innerWidth < 640 ? 2 : 4); // sm breakpoint
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);
  // Category importance weights for scoring
  const categoryWeights = {
    display: 1.3,
    performance: 1.5,
    camera: 1.3,
    battery: 1.4,
    memory: 1.3,
  };
  const getCategoryIcon = (category) => {
    const icons = {
      battery: <Battery className="w-4 h-4" />,
      display: <Smartphone className="w-4 h-4" />,
      camera: <Camera className="w-4 h-4" />,
      performance: <Cpu className="w-4 h-4" />,
      software: <Zap className="w-4 h-4" />,
      design: <Shield className="w-4 h-4" />,
      connectivity: <Wifi className="w-4 h-4" />,
      audio: <Speaker className="w-4 h-4" />,
      sensors: <Shield className="w-4 h-4" />,
    };
    return icons[category] || <Smartphone className="w-4 h-4" />;
  };

  const formatLabel = (key) => {
    //return key.replace(/_/g, " ").toUpperCase();
    return key
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const renderSpecRow = useCallback(
    (category, specKey) => {
      const specsPerPhone = comparisonData.scores.reduce((acc, phone) => {
        const spec = phone.category_scores[category]?.breakdown?.[specKey];
        if (!spec || spec.hidden) return acc;

        acc.push({
          id: phone.phone_id,
          name: phone.name,
          color: phone.primary_color,
          value: spec.value,
          score: spec.score,
        });

        return acc;
      }, []);

      if (specsPerPhone.length === 0) return null;

      return (
        <div key={specKey} className="border-b py-2 last:border-none">
          {/* Spec Title */}
          <div className="flex items-center gap-2 mb-2">
            <span>{getSpecIcon(specKey)}</span>
            <span className="text-xs font-semibold text-gray-700">
              {formatLabel(specKey)}
            </span>
          </div>

          {/* Phones */}
          <div className="mt-1 flex flex-col divide-y divide-gray-100 rounded-lg border border-gray-200 overflow-hidden">
            {specsPerPhone.map((phone) => {
              return (
                <div
                  key={phone.id}
                  className={`flex items-center gap-2 px-2 py-1.5 min-h-[34px] transition-all duration-200 bg-white hover:bg-gray-50`}
                >
                  {/* Color dot */}
                  {phone.score == null && (
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: phone.color }}
                    />
                  )}
                  {/* Value */}
                  <p
                    className="text-[11px] text-gray-700 flex-1 truncate"
                    dangerouslySetInnerHTML={{ __html: phone.value || "—" }}
                    title={phone.value}
                  />

                  {/* Optional tiny bar */}
                  {phone.score != null && (
                    <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(phone.score * 10, 100)}%`,
                          backgroundColor: phone.color,
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    },
    [comparisonData],
  );
  useEffect(() => {
    if (!pathname || !phones?.length) return;

    startTransition(() => {
      const phoneSlugString = pathname.split("/")[2] || "";
      if (!phoneSlugString) {
        setSelectedPhones([]);
      } else {
        const slugs = phoneSlugString.split("-vs-");
        setSelectedPhones(phones.filter((p) => slugs.includes(p.slug)));
      }
      setFirstLoad(false);
    });
  }, [pathname, phones]);
  const addPhone = useCallback(
    (phone) => {
      if (
        selectedPhones.length >= maxDevices ||
        selectedPhones.some((p) => p.id === phone.id)
      )
        return;

      startTransition(() => {
        const newSelected = [...selectedPhones, phone];
        setSelectedPhones(newSelected);

        router.replace(
          `/compare/${newSelected.map((p) => p.slug).join("-vs-")}`,
          undefined,
          { shallow: true },
        );
      });
    },
    [selectedPhones, router],
  );

  // Remove phone from comparison
  const removePhone = useCallback(
    (phoneId) => {
      startTransition(() => {
        const newSelected = selectedPhones.filter((p) => p.id !== phoneId);

        if (newSelected.length === 0) {
          // Redirect to home page if no phones left
          router.replace("/mobiles", undefined, { shallow: true });
          setSelectedPhones([]); // clear state just in case
          return;
        }

        setSelectedPhones(newSelected);

        router.replace(
          `/compare/${newSelected.map((p) => p.slug).join("-vs-")}`,
          undefined,
          { shallow: true },
        );
      });
    },
    [selectedPhones, router],
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch search results
  useEffect(() => {
    if (!debouncedSearch) return setResults([]);

    let isActive = true;
    searchPhones(debouncedSearch).then((apiPhones) => {
      if (isActive) setResults(apiPhones);
    });

    return () => {
      isActive = false;
    }; // cancel state update if unmounted
  }, [debouncedSearch]);

  const renderCategory = (categoryName, categoryKey) => {
    const specs =
      comparisonData?.scores[0]?.category_scores[categoryKey]?.breakdown;
    if (!specs) return null;

    const icon = getCategoryIcon(categoryKey);
    const validSpecKeys = Object.keys(specs).filter(
      (specKey) => renderSpecRow(categoryKey, specKey) !== null,
    );

    if (validSpecKeys.length === 0) return null;

    return (
      <div
        key={categoryKey}
        className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0,04)]"
      >
        {/* Header: Clean & Sophisticated */}
        <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-gray-50/50 to-white">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-gray-100 shadow-sm text-sm">
            {icon || "📱"}
          </div>
          <h3 className="text-[12px] font-black uppercase tracking-[0.05em] text-gray-800">
            {categoryName}
          </h3>
          <span className="ml-auto text-[10px] font-bold text-gray-400 bg-gray-100/50 px-2 py-0.5 rounded-full">
            {validSpecKeys.length}
          </span>
        </div>

        {/* Specs grid: Optimized for spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-3 border-t border-gray-50">
          {validSpecKeys.map((specKey) => (
            <div key={specKey} className="h-full">
              {renderSpecRow(categoryKey, specKey)}
            </div>
          ))}
        </div>
      </div>
    );
  };
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };
  const handleUsageChange = (e) => {
    const value = e.target.value;

    // remove existing sort/status
    const REMOVE = [
      "balanced",
      "gaming",
      "battery",
      "camera",
      "media_consumer",
    ];

    const cleaned = parts.filter((p) => !REMOVE.includes(p));
    const path = "/" + cleaned.join("/");
    // insert sort/status after brand (or after /mobiles)
    const baseIndex = cleaned[1] && cleaned[0] === "compare" ? 2 : 1;
    const params = new URLSearchParams({
      usage: value,
    }).toString();
    cleaned.splice(baseIndex, 0, value);
    router.push(`${path}?${params}`, { scroll: false });
  };
  return (
    <>
      {isPending || firstLoad ? (
        <Loader />
      ) : (
        <div className="p-1">
          {/* Search Bar */}
          <div className="relative mb-2 overflow-visible">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={
                selectedPhones.length >= maxDevices
                  ? "Maximum devices reached"
                  : verified
                    ? "Search for phones to compare..."
                    : "Search for phones to compare..."
                // Click to verify you're human
              }
              value={searchTerm}
              // disabled={selectedPhones.length >= maxDevices}
              // readOnly={!verified}
              // onClick={handleInputClick}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-white border-2 border-gray-200 rounded focus:outline-none focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed text-base"
            />

            {/* Turnstile — appears ABOVE input */}
            {showTurnstile && !verified && (
              <div
                ref={turnstileRef}
                className="absolute z-[999] top-full mt-2 left-0 bg-white border border-gray-200 rounded shadow-lg p-3"
              >
                <p className="text-sm text-gray-500 mb-2">
                  Please verify you're human
                </p>
                <TurnstileWidget onSuccess={handleVerified} />
              </div>
            )}

            {/* Green checkmark when verified */}
            {verified && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-lg">
                ✓
              </span>
            )}

            {/* Suggestions dropdown */}
            {searchTerm &&
              results.length > 0 &&
              selectedPhones.length < maxDevices && (
                <div className="absolute z-20 w-full bg-white border border-gray-200 rounded shadow max-h-96 overflow-y-auto">
                  {results.map((phone) => (
                    <div
                      key={phone.id}
                      onClick={() => {
                        addPhone(phone);
                        setSearchTerm("");
                        setResults([]);
                      }}
                      className="px-5 py-3.5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 cursor-pointer flex justify-between items-center border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={phone.primary_image}
                          alt={phone.name}
                          className="w-12 h-12 object-contain rounded-md flex-shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {phone.brand.name} {phone.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {phone.brand.name}
                          </div>
                        </div>
                      </div>
                      <Plus
                        size={20}
                        className="text-orange-500 flex-shrink-0"
                      />
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Search status indicator */}
          {searchTerm && searchTerm !== debouncedSearch && (
            <p className="text-xs text-gray-500 mt-2">Searching...</p>
          )}
          {/* Phone Cards */}
          <div className={`grid ${gridClasses[maxDevices]} gap-3 mb-4`}>
            {phones.map((phone, index) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                isPriority={index < 6}
                fromCompare={true}
                removePhone={removePhone}
              />
            ))}
          </div>
          {/* <select
            value={currentUsage}
            onChange={handleUsageChange}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none"
          >
            <option value="" disabled>
              Select Primary usage
            </option>
            {usageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select> */}
          {/* {phones.length > 1 && (
            <VerdictDisplay verdict={comparisonData.verdict} />
          )} */}
          {/* <OverallScores scores={comparisonData.charts.overall_scores} /> */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            {/* <RadarComparison
              data={comparisonData.charts.radar}
              colors={comparisonData.charts.phone_colors}
            /> */}

            {/* <BarComparison
              data={comparisonData.charts.bar}
              colors={comparisonData.charts.phone_colors}
            />

            <MarketGraphPopup
              isOpen={marketModal.isOpen}
              onClose={() => setMarketModal({ isOpen: false, data: null })}
              marketData={marketModal.data}
              primaryPhoneName={comparisonData.scores[0]?.phone_name}
            /> */}
          </div>
          {/* Similar MobileS */}
          {keyCategories.map((categoryKey) => {
            const categoryName = formatLabel(categoryKey);
            return renderCategory(categoryName, categoryKey);
          })}

         
        </div>
      )}
    </>
  );
};

export default PhoneComparison;
