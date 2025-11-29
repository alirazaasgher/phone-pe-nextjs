"use client";
import { useState, useCallback, useTransition } from "react";
import Header from "@/components/layouts/Header";
import FilterSidebar from "@/components/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/layouts/Footer";
import MobileHeader from "@/components/layouts/MobileHeader";
import Loader from "./loading";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const showSidebar = shouldShowSidebar(pathname);
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const [isPending, startTransition] = useTransition();
  // Function to navigate with loader
  const navigate = useCallback(
    (path) => {
      startTransition(() => {
        router.push(path); // App Router
      });
    },
    [router]
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <Header toggleSidebar={() => toggleSidebar((prev) => !prev)} />
      <MobileHeader />

      <div className="pt-13 md:pt-18 pb-16 sm:pb-0 flex-1 w-full">
        <div className="xl:max-w-6xl 2xl:max-w-7xl sm:max-w-3xl mx-auto flex flex-col lg:flex-row sm:gap-4 sm:px-6 lg:px-8 py-4 relative">
          {showSidebar && (
            <aside className="lg:w-65">
              <FilterSidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onApply={(path) => navigate(path)}
              />
            </aside>
          )}

          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-md overflow-hidden w-full relative">
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                  <Loader />
                </div>
              )}
              <div className="p-3 opacity-80">{children}</div>
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
