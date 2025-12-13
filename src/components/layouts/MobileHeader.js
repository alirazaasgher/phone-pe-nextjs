"use client";
import { Home, Layers, GitCompare, Smartphone } from "lucide-react";
import Link from "next/link";
export default function MobileHeader() {
  return (
    <>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[40] backdrop-blur-2xl bg-white/90 border-t border-gray-200/50 shadow-2xl shadow-slate-900/10">
        <nav className="flex justify-around items-center py-2 px-2 max-w-7xl mx-auto">
          {[
            { href: "/", label: "Home", icon: Home },
            { href: "/mobiles", label: "Mobiles", icon: Smartphone },
            { href: "/brands", label: "Brands", icon: Layers },
            // { href: "/compare", label: "Compare", icon: GitCompare },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 group active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300"></div>
              <item.icon className="relative w-5 h-5 text-gray-600 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300" />
              <span className="relative text-xs font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
