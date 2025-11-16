
// "use client";
// import { mobilePageData } from "../../services/phones";
// import ClientPhoneGrid from "@/components/ClientPhoneGrid";
// import SideBarData from "@/data/SideBarData";
// // utils inside the same file
// export default async function Page({ params, searchParams  }) {
//   const awaitedParams = await params;
//   const awaitedsearchParams = await searchParams;
//   const sortValue = awaitedsearchParams.sort || "default"; // fallback if not provided
//   const filters = awaitedParams.filters || [];

//   // params.filters will be undefined if no filters in URL
//   const parsed = {
//     category: null,
//     priceRange: null,
//     brands: [],
//     ram: [],
//     storage: [],
//     features: []
//   };

//   filters.forEach(f => {
//     if (f.startsWith("price-")) {
//       // e.g., "price-100-to-500" => [100, 500]
//       parsed.priceRange = f
//         .replace("price-", "")
//         .split("-to-")
//         .map(Number); // convert to numbers
//     } else if (f.endsWith("gb-ram")) {
//       // e.g., "6gb-ram" => [6]
//       const value = parseInt(f.replace("-ram", ""), 10);
//       if (!isNaN(value)) parsed.ram.push(value);
//     } else if (f.endsWith("gb-storage")) {
//       // e.g., "256gb-storage" => [256]
//       const value = parseInt(f.replace("-storage", ""), 10);
//       if (!isNaN(value)) parsed.storage.push(value);
//     } else if (f.includes("phones") || f.includes("mobile")) {
//       // e.g., "apple-phones" or "samsung-mobile" => ["Apple", "Samsung"]
//       const brandsArray = f
//         .replace(/-phones$/, "")
//         .replace(/-mobile$/, "")
//         .split("-")
//         .map(b => b.charAt(0).toUpperCase() + b.slice(1));
//       parsed.brands.push(...brandsArray);
//     } else {
//       // e.g., "smartphones" => "Smartphones"
//       parsed.category = f.charAt(0).toUpperCase() + f.slice(1);
//     }
//   });
//   const phones = await mobilePageData(parsed,sortValue);
//     const availableFilters = SideBarData.reduce((acc, item) => {
//     acc[item.slug] = item.values || [];
//     return acc;
//   }, {});
//   return (
//     <ClientPhoneGrid phones={phones} filters={filters} parsed={parsed} availableFilters = {availableFilters}/>
//   );
// }










"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import ClientPhoneGrid from "@/components/ClientPhoneGrid";
import SideBarData from "@/data/SideBarData";
import { mobilePageData } from "../../services/phones";

export default function Page() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = params.filters || [];
  const sortValue = searchParams.get("sort") || "default";

  // Parse filters
  const parsed = {
    category: null,
    priceRange: null,
    brands: [],
    ram: [],
    storage: [],
    features: []
  };

  filters.forEach((f) => {
    if (f.startsWith("price-")) {
      parsed.priceRange = f
        .replace("price-", "")
        .split("-to-")
        .map(Number);
    } else if (f.endsWith("gb-ram")) {
      const value = parseInt(f.replace("-ram", ""), 10);
      if (!isNaN(value)) parsed.ram.push(value);
    } else if (f.endsWith("gb-storage")) {
      const value = parseInt(f.replace("-storage", ""), 10);
      if (!isNaN(value)) parsed.storage.push(value);
    } else if (f.includes("phones") || f.includes("mobile")) {
      const brandsArray = f
        .replace(/-phones$/, "")
        .replace(/-mobile$/, "")
        .split("-")
        .map((b) => b.charAt(0).toUpperCase() + b.slice(1));
      parsed.brands.push(...brandsArray);
    } else {
      parsed.category = f.charAt(0).toUpperCase() + f.slice(1);
    }
  });

  const availableFilters = SideBarData.reduce((acc, item) => {
    acc[item.slug] = item.values || [];
    return acc;
  }, {});

  useEffect(() => {
    setLoading(true);
    // Fetch phones dynamically on client
    mobilePageData(parsed, sortValue).then((data) => {
      setPhones(data);
      setLoading(false);
    });
  }, [filters.join(","), sortValue]); // re-fetch if filters or sort change

  if (loading) return <div>Loading...</div>;

  return (
    <ClientPhoneGrid
      phones={phones}
      filters={filters}
      parsed={parsed}
      availableFilters={availableFilters}
    />
  );
}

