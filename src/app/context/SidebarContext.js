// app/context/SidebarContext.jsx
"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";

const SidebarContext = createContext();
export function SidebarProvider({ children }) {
    const pathname = usePathname();
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        // Determine if sidebar should be shown
        const isSidebarRoute = shouldShowSidebar(pathname);
        setShowSidebar(isSidebarRoute);
    }, [pathname]);


    return (
        <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    return useContext(SidebarContext);
}

function shouldShowSidebar(pathname) {
    if (!pathname) return false;
    if (pathname === "/") return true; // homepage shows sidebar
    if (pathname.startsWith("/mobiles")) return true; // category pages show sidebar
    return false; // hide sidebar everywhere else (like `/apple-iphone-15-pro-max`)
}
