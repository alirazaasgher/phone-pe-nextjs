"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, Bell, X, Smartphone } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-md"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left Section - Logo + Menu (Mobile) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all md:hidden"
          >
            <Menu className="text-gray-700" size={22} />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Smartphone className="text-blue-600" size={26} />
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              PhoneHub
            </span>
          </Link>
        </div>

        {/* Middle Section - Search */}
        <div
          className={`${
            isMobileSearchOpen
              ? "absolute top-full left-0 w-full px-4 py-3"
              : "hidden"
          } md:block md:flex-1 md:max-w-2xl md:mx-8`}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search phones, brands, specs..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-gray-50 text-gray-800 placeholder-gray-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="text-gray-500/70" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all md:hidden"
          >
            <Search className="text-gray-700" size={20} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all">
            <Bell className="text-gray-700" size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileSearchOpen(false)}
        />
      )}
    </header>
  );
}
