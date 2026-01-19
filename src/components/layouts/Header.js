"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Smartphone } from "lucide-react";
import mobiles from "@/data/mobiles";
import useSearch from "@/app/hooks/useSearch";
import { useRouter } from "next/navigation";
export default function Header({ toggleSidebar }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();
  const { query, setQuery, suggestions, showSuggestions, setShowSuggestions } =
    useSearch(mobiles);
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
      className={`fixed top-0 z-50 left-0 right-0 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-2xl shadow-2xl border-b border-white/5"
          : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 md:px-6 h-16 md:h-16">
          {/* Left Section - Logo + Mobile Menu */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="group relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 xl:hidden transition-all duration-300 active:scale-95"
            >
              <Menu
                className="text-white transition-transform group-hover:rotate-180 duration-300"
                size={20}
              />
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <Smartphone
                  className="relative text-white drop-shadow-lg transition-transform group-hover:scale-110 duration-300"
                  size={28}
                />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight text-white relative">
                Mobile<span className="text-cyan-300">42</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </span>
            </Link>
          </div>

          {/* Middle Section - Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
            {[
              { href: "/", label: "Home" },
              { href: "/mobiles", label: "Mobiles" },
              { href: "/brands", label: "Brands" },
              // { href: "/compare", label: "Compare" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-white/90 hover:text-white rounded-xl transition-all duration-300 group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-1/2 transition-all duration-300"></span>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-all duration-300"></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Progress Bar */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50"></div>
      )}
    </header>
  );
}
