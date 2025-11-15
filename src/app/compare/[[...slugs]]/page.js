"use client";
import React, { useState, useMemo } from "react";
import { Search, X, Check, Smartphone, Battery, Cpu, Camera, HardDrive, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useSearch from "@/app/hooks/useSearch";
import mobiles from "@/data/mobiles";
// ===== Static demo data (you can replace with your real data) =====
const MOBILE_DATA = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro-max",
    brand: "Apple",
    price: 999,
    image: "/images/1.webp",
    specs: {
      display: "6.1\" OLED 120Hz",
      refresh: 120,
      processor: "A17 Pro",
      ramGB: 8,
      storageGB: 128,
      batteryMah: 3274,
      cameraMP: 48,
      os: "iOS 17",
      weightG: 187,
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    price: 1199,
    image: "/images/2.webp",
    specs: {
      display: "6.8\" AMOLED 120Hz",
      refresh: 120,
      processor: "Snapdragon 8 Gen 3",
      ramGB: 12,
      storageGB: 256,
      batteryMah: 5000,
      cameraMP: 200,
      os: "Android 14",
      weightG: 232,
    },
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    brand: "Google",
    price: 999,
    image: "/images/3.webp",
    specs: {
      display: "6.7\" LTPO 120Hz",
      refresh: 120,
      processor: "Tensor G3",
      ramGB: 12,
      storageGB: 128,
      batteryMah: 5050,
      cameraMP: 50,
      os: "Android 14",
      weightG: 213,
    },
  },
  {
    id: 4,
    name: "OnePlus 12",
    brand: "OnePlus",
    slug: "oneplus-12",
    price: 799,
    image: "/images/4.webp",
    specs: {
      display: "6.8\" AMOLED 120Hz",
      refresh: 120,
      processor: "Snapdragon 8 Gen 3",
      ramGB: 12,
      storageGB: 256,
      batteryMah: 5400,
      cameraMP: 50,
      os: "Android 14",
      weightG: 220,
    },
  },
  {
    id: 5,
    name: "Xiaomi 14",
    brand: "Xiaomi",
    slug: "xiaomi-14",
    price: 699,
    image: "/images/3.webp",
    specs: {
      display: "6.4\" AMOLED 120Hz",
      refresh: 120,
      processor: "Snapdragon 8 Gen 3",
      ramGB: 12,
      storageGB: 256,
      batteryMah: 4610,
      cameraMP: 50,
      os: "Android 14",
      weightG: 188,
    },
  },
  {
    id: 6,
    name: "Nothing Phone (2)",
    slug: "nothing-phone-2",
    brand: "Nothing",
    price: 599,
    image: "/images/2.webp",
    specs: {
      display: "6.7\" OLED 120Hz",
      refresh: 120,
      processor: "Snapdragon 8+ Gen 1",
      ramGB: 12,
      storageGB: 256,
      batteryMah: 4700,
      cameraMP: 50,
      os: "Android 14",
      weightG: 201,
    },
  },
  {
    id: 7,
    name: "Realme GT 6",
    slug: "realme-gt-6",
    brand: "Realme",
    price: 549,
    image: "/images/1.webp",
    specs: {
      display: "6.78\" AMOLED 120Hz",
      refresh: 120,
      processor: "Snapdragon 8s Gen 3",
      ramGB: 12,
      storageGB: 256,
      batteryMah: 5500,
      cameraMP: 50,
      os: "Android 14",
      weightG: 199,
    },
  },
  {
    id: 8,
    name: "Infinix Note 30",
    slug: "infinix-note-30",
    brand: "Infinix",
    price: 229,
    image: "/images/3.webp",
    specs: {
      display: "6.78\" IPS 120Hz",
      refresh: 120,
      processor: "Helio G99",
      ramGB: 8,
      storageGB: 128,
      batteryMah: 5000,
      cameraMP: 64,
      os: "Android 13",
      weightG: 219,
    },
  },
];

const allBrands = ["All", ...Array.from(new Set(MOBILE_DATA.map(m => m.brand)))];

// Simple heuristics for "bigger is better" comparison
const numericFields = {
  ramGB: { label: "RAM", icon: <Cpu size={16} className="inline" />, unit: "GB" },
  storageGB: { label: "Storage", icon: <HardDrive size={16} className="inline" />, unit: "GB" },
  batteryMah: { label: "Battery", icon: <Battery size={16} className="inline" />, unit: "mAh" },
  cameraMP: { label: "Camera", icon: <Camera size={16} className="inline" />, unit: "MP" },
  refresh: { label: "Refresh", icon: <Zap size={16} className="inline" />, unit: "Hz" },
};

const pretty = (n) => n.toLocaleString();

// function useSearch(data) {
//   const [q, setQ] = useState("");
//   const [brand, setBrand] = useState("All");
//   const filtered = useMemo(() => {
//     return data.filter((m) => {
//       const byBrand = brand === "All" || m.brand === brand;
//       const byQ = !q ||
//         m.name.toLowerCase().includes(q.toLowerCase()) ||
//         m.brand.toLowerCase().includes(q.toLowerCase());
//       return byBrand && byQ;
//     });
//   }, [q, brand, data]);
//   return { q, setQ, brand, setBrand, filtered };
// }

export default function MobileCompare({ params }) {
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    brand,
    setBrand,
  } = useSearch(mobiles);

  // ✅ Get slugs from params safely
  const { slugs = [] } = React.use(params);

  // ✅ Keep only slugs in state
  const [selected, setSelected] = useState(slugs);

  // ✅ Get phone objects from slugs (with debug logging if missing)
  const selectedItems = useMemo(() => {
    return selected.map((slug) => {
      const phone = mobiles.find((m) => m.slug === slug);
      if (!phone) console.warn("Missing mobile for slug:", slug);
      return phone;
    }).filter(Boolean);
  }, [selected, mobiles]);

  // ✅ Handle search selection (store slug only)
  const handleSelect = (phone) => {
    setSelected((prev) => {
      if (prev.includes(phone.slug)) return prev;
      const updated = [...prev, phone.slug];
      console.log("Updated selected:", updated);
      return updated;
    });
    setShowSuggestions(false);
  };

  // ✅ Toggle selection (max 4)
  const toggleSelect = (slug) => {
    setSelected((prev) => {
      let updated;
      if (prev.includes(slug)) {
        updated = prev.filter((x) => x !== slug);
      } else {
        updated = prev.length >= 4 ? prev : [...prev, slug];
      }
      console.log("Updated selected:", updated);
      return updated;
    });
  };
  console.log("Selected items:", selectedItems);
  // ✅ Clear all
  const clearAll = () => {
    setSelected(slugs);
  };

  // ✅ Compute best values across numeric fields
  const bestMap = useMemo(() => {
    return selectedItems.reduce((acc, phone) => {
      for (const key of Object.keys(numericFields)) {
        acc[key] = Math.max(acc[key] || 0, phone?.specs?.[key] || 0);
      }
      return acc;
    }, {});
  }, [selectedItems]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <Smartphone className="w-6 h-6" />
          <h1 className="text-xl md:text-2xl font-semibold">Compare Mobiles (up to 4)</h1>
        </div>
      </header>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Search by name or brand..."
              className="w-full pl-11 pr-3 py-2 rounded-2xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition"
              >
                <X className="text-gray-500" size={16} />
              </button>
            )}

            {selectedItems.length < 4 && showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 divide-y divide-gray-100 max-h-60 overflow-y-auto">
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => handleSelect(s)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={s.image}
                        alt={s.model}
                        className="w-10 h-10 rounded-lg object-cover border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {s.brand} {s.model}
                        </p>
                        <p className="text-sm text-gray-500">${s.price}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                      {s.storage} / {s.ram}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* 
          <div>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="px-3 py-2 rounded-2xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {allBrands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div> */}
        </div>
      </div>

      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-x-auto">
                  {selectedItems.map((m) => (
                    <div key={m.id} className="flex items-center gap-2 px-2 py-1 rounded-xl border border-slate-200 bg-white">
                      <img src={m.image} alt={m.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="min-w-[140px]">
                        <div className="text-sm font-medium leading-tight line-clamp-1">{m.model}</div>
                        <div className="text-xs text-slate-500">${pretty(m.price)}</div>
                      </div>
                      <button onClick={() => toggleSelect(m.slug)} className="p-1 text-slate-500 hover:text-slate-800">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {/* {isComparisonPage && (
                    <button
                      onClick={clearAll}
                      className="px-3 py-2 rounded-xl text-sm border border-slate-300 hover:bg-slate-50"
                    >
                      Clear
                    </button>
                  )} */}
                  <button onClick={clearAll} className="px-3 py-2 rounded-xl text-sm border border-slate-300 hover:bg-slate-50">Clear</button>
                  {/* <a href="#compare" className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800">Open Comparison</a> */}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison table */}
      <section id="compare" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence>
          {selectedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6"
            >
              <h2 className="text-lg font-semibold mb-4">Comparison</h2>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-md">
                <table className="min-w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="p-3 font-medium text-slate-600 sticky left-0 bg-slate-50 z-10">Spec</th>
                      {selectedItems.map((m) => (
                        <th key={`head-${m.slug}`} className="p-3 font-semibold whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <img src={m.image} alt={m.model} className="w-10 h-10 rounded-md object-cover" />
                            <div>
                              <div className="leading-tight">{m.model}</div>
                              <div className="text-xs text-slate-500">${pretty(m.price)}</div>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <Row label="Display">
                      {selectedItems.map((m) => (
                        <Cell key={`display-${m.slug}`}>{m.specs.display}</Cell>
                      ))}
                    </Row>

                    <Row label="Processor">
                      {selectedItems.map((m) => (
                        <Cell key={`processor-${m.slug}`}>{m.specs.processor}</Cell>
                      ))}
                    </Row>

                    {Object.entries(numericFields).map(([key, meta]) => (
                      <Row
                        key={key}
                        label={<span className="inline-flex items-center gap-1">{meta.icon}{meta.label}</span>}
                      >
                        {selectedItems.map((m) => {
                          const val = m.specs[key];
                          const isBest = val === bestMap[key] && selectedItems.length > 1;
                          return (
                            <Cell key={`${key}-${m.slug}`} highlight={isBest}>
                              <span className="tabular-nums">{val}</span> {meta.unit}
                              {isBest && <Check className="inline ml-1" size={14} />}
                            </Cell>
                          );
                        })}
                      </Row>
                    ))}

                    <Row label="OS">
                      {selectedItems.map((m) => (
                        <Cell key={`os-${m.slug}`}>{m.specs.os}</Cell>
                      ))}
                    </Row>

                    <Row label="Weight">
                      {selectedItems.map((m) => (
                        <Cell key={`weight-${m.slug}`}>
                          <span className="tabular-nums">{m.specs.weightG}</span> g
                        </Cell>
                      ))}
                    </Row>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>


      {/* Footer spacer */}
      <div className="h-24" />
    </div>
  );
}

function SpecPill({ icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
      {icon}
      <span className="truncate" title={String(label)}>{label}</span>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <tr className="border-t border-slate-200/80">
      <td className="p-3 font-medium text-slate-600 whitespace-nowrap">{label}</td>
      {children}
    </tr>
  );
}

function Cell({ children, highlight = false }) {
  return (
    <td className={`p-3 align-top ${highlight ? "bg-emerald-50/70 ring-1 ring-emerald-200 rounded-md" : ""}`}>
      {children}
    </td>
  );
}
