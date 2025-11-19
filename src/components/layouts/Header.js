"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, Bell, X, Smartphone } from "lucide-react";
import mobiles from "@/data/mobiles";
import useSearch from "@/app/hooks/useSearch";
import { useRouter } from "next/navigation";
export default function Header({ toggleSidebar }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
  } = useSearch(mobiles);
  const handleSelect = (name) => {
    setQuery(name);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(name)}`);
  };
  useEffect(() => {
     if (typeof window !== "undefined") {
    window.onscroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
  }
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 

  return (

    
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-slate-900/95 backdrop-blur-xl shadow-lg text-white"
          : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white"
        }`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left Section - Logo + Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="cursor-pointer p-2 rounded-xl hover:bg-white/10 md:hidden transition"
          >
            <Menu className="text-white" size={22} />
          </button>
          <Link href="/" className="flex items-center gap-2">
  <Smartphone className="text-white" size={26} />
  <span className="text-lg font-bold tracking-tight text-white 
               drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]
               drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]">
    Mobile42
  </span>
</Link>

        </div>

        {/* Middle Section - Navigation */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {[
            { href: "/", label: "Home" },
            { href: "/mobiles", label: "Mobiles" },
            { href: "/brands", label: "Brands" },
            { href: "/compare", label: "Compare" },
            { href: "/news", label: "News" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-yellow-300 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Right Section - Mobile Search Icon */}
        {/* <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="cursor-pointer p-2 rounded-xl hover:bg-white/10 md:hidden transition"
          >
            <Search className="text-white" size={20} />
          </button>
        </div> */}
      </div>

      {/* Mobile Search Overlay */}
      {/* {isMobileSearchOpen && (
        <div className="absolute top-full left-0 w-full px-4 py-3 z-50 bg-white md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search phones, brands, specs..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 
              focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 
              bg-gray-50 text-gray-800 placeholder-gray-500 transition"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
            />
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition"
              >
                <X className="text-gray-500" size={16} />
              </button>
            )}

            
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => handleSelect(s.model)}
                  >
                    <img
                      src={s.image_url}
                      alt={s.model}
                      className="w-10 h-10 rounded-lg object-cover border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {s.brand} {s.model}
                      </p>
                      <p className="text-sm text-gray-500">${s.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )} */}

      {/* Mobile Search Background Overlay */}
      {/* {isMobileSearchOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileSearchOpen(false)}
        />
      )} */}
    </header>

  );
}
