"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Smartphone,
  HardDrive,
  Monitor,
  Camera,
  Cpu,
  Battery,
  Zap,
  Heart,
  Share2,
  ChevronRight,
  Star,
  Check,
  Search,
  X,
  Sparkles,
  Info,
  RefreshCw,
  Truck,
  ArrowLeftRight,
  ThumbsUp,
  AlertCircle,
  Minus,
  Award,
  TrendingUp,
  MessageSquare,
  Wifi,
  Cable,
  BatteryCharging,
  MemoryStick,
  Gauge,
  Volume2,
  Fingerprint,ShieldCheck, RotateCcw, Clock ,TruckIcon,Facebook ,Twitter ,Calendar,Scale ,Database ,Users ,MessageCircle 
} from "lucide-react";
import Link from "next/link";

export default function OverviewSection() {
    const specs = [
    {
      icon: <Gauge className="w-5 h-5" />,
      label: "Performance",
      value: "Mediatek Helio G91 Ultra (12 nm)",
      badge: "Flagship SoC",
      progress: 85,
      color: "amber",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      label: "Dimensions",
      value: "214g • 8.2mm • Premium Build",
      badge: "Slim Profile",
      progress: 75,
      color: "purple",
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      label: "Software",
      value: "Android 16 • 4 Years of Updates",
      badge: "Long Support",
      progress: 90,
      color: "green",
    },
    {
      icon: <HardDrive className="w-5 h-5" />,
      label: "Memory Type",
      value: "LPDDR5X RAM / UFS 4.0 Storage",
      badge: "High Speed",
      progress: 95,
      color: "orange",
    },
    {
      icon: <Volume2 className="w-5 h-5" />,
      label: "Audio",
      value: "Stereo Speakers • Dolby Atmos",
      badge: "Immersive Sound",
      progress: 80,
      color: "pink",
    },
  ];

  const colorMap = {
    amber: "from-amber-400 to-amber-600",
    purple: "from-purple-400 to-violet-600",
    green: "from-emerald-400 to-green-600",
    orange: "from-orange-400 to-red-500",
    pink: "from-pink-400 to-rose-500",
  };
  const data = {
    name: "Samsung Galaxy M17",
    release: "Exp. release 2025, October 13",
    weight: "192g, 7.5mm thickness",
    os: "Android 15, One UI 7",
    storage: "128GB, microSDXC",
    display: '6.7" 1080x2340 px',
    camera: "50MP 1080p",
    chipset: "Exynos 1330",
    ram: "4-8GB",
    battery: "5000mAh 25W",
    popularity: "12%",
    hits: "166,051 hits",
    fans: "13 Fans",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a17.jpg",
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
  {/* HEADER */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Smartphone className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
        <p className="text-sm text-gray-500 mt-1">Flagship Smartphone</p>
      </div>
    </div>

    {/* Social icons */}
    <div className="flex gap-2 mt-3 sm:mt-0">
      <Link href="https://facebook.com" target="_blank">
        <div className="p-3 rounded-xl bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm">
          <Facebook size={20} />
        </div>
      </Link>
      <Link href="https://twitter.com" target="_blank">
        <div className="p-3 rounded-xl bg-white border border-gray-200 text-sky-500 hover:bg-sky-50 hover:border-sky-200 transition-all duration-200 shadow-sm">
          <Twitter size={20} />
        </div>
      </Link>
      <button className="p-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
        <Share2 size={20} />
      </button>
    </div>
  </div>

  {/* MAIN SECTION */}
 <div className="flex flex-col lg:flex-row gap-6 p-4">
  {/* LEFT: Image + Specs */}
  <div className="w-full lg:w-[30%] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/20 rounded-2xl border border-gray-100 p-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
    <motion.img
      src={data.image}
      alt={data.name}
      className="w-full max-h-[250px] object-contain drop-shadow-2xl z-10"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </div>

  {/* RIGHT: Highlights */}
  <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
      {specs.map((spec, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.01, x: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group cursor-pointer"
        >
          {/* Left Icon */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${colorMap[spec.color]} text-white shadow-sm group-hover:shadow-md transition-transform group-hover:scale-110`}
          >
            {spec.icon}
          </div>

          {/* Middle Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {spec.label}
              </span>
              <span
                className={`px-2 py-0.5 bg-gradient-to-br ${colorMap[spec.color]} text-white text-xs font-medium rounded-full shadow-sm`}
              >
                {spec.badge}
              </span>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
              {spec.value}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div
                className={`h-1.5 bg-gradient-to-r ${colorMap[spec.color]}`}
                initial={{ width: 0 }}
                animate={{ width: `${spec.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Chevron */}
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
        </motion.div>
      ))}
    </div>
  
</div>



  {/* FOOTER LINKS */}
  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/20">
    <Link href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 shadow-sm font-medium">
      <Smartphone size={18} />
      Compare Device
    </Link>
    <Link href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg font-medium">
      <MessageCircle size={18} />
      Read Reviews
    </Link>
  </div>
</div>
  );
}
