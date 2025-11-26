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
        <div className="min-h-screen flex flex-col">
            <Header toggleSidebar={toggleSidebar} />
            <MobileHeader/>

          <div
  className={`w-full lg:pt-6 flex-1 max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 px-4 sm:px-6 lg:px-4`}
>
  {showSidebar && (
    <FilterSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
  )}
 {/* ${
      showSidebar
        ? "shadow-sm border border-gray-200 rounded-lg"
        : "border-0 rounded-lg"
    } */}
  <main
    className={`flex-1 bg-white 
     
    `}
  >
    {children}
  </main>
</div>


            <Footer />
        </div>
    );
}

function shouldShowSidebar(pathname) {
    return true;
    if (!pathname) return false;
    if (pathname === "/") return true; // homepage shows sidebar
    if (pathname.startsWith("/mobiles") || pathname.startsWith("/brands") || pathname.startsWith("/apple-iphone-15-pro-max")) return true; // category pages show sidebar
    return false; // hide sidebar everywhere else (like `/apple-iphone-15-pro-max`)
}
