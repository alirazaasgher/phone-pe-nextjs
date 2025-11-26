"use client";
import { useState } from "react";
import Header from "@/components/layouts/Header";
import FilterSidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/Footer";
import MobileHeader from "@/components/layouts/MobileHeader";

export default function ClientLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const showSidebar = shouldShowSidebar(pathname);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <Header toggleSidebar={toggleSidebar} />
      <MobileHeader />

      <div className="pt-13 md:pt-18 pb-16 sm:pb-0 flex-1 w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row sm:gap-4 sm:px-6 lg:px-8 py-4">
          {showSidebar && (
            <aside className="lg:w-65">
              <div className="lg:sticky lg:top-24">
                <FilterSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </aside>
          )}

          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-md overflow-hidden">
              <div className="p-3">{children}</div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function shouldShowSidebar(pathname) {
  return true;
  if (!pathname) return false;
  if (pathname === "/") return true; // homepage shows sidebar
  if (
    pathname.startsWith("/mobiles") ||
    pathname.startsWith("/brands") ||
    pathname.startsWith("/apple-iphone-15-pro-max")
  )
    return true; // category pages show sidebar
  return false; // hide sidebar everywhere else (like `/apple-iphone-15-pro-max`)
}
