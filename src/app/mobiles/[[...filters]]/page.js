import { mobilePageData } from "../../services/phones";
import ClientPhoneGrid from "@/components/ClientPhoneGrid";
import SideBarData from "@/data/SideBarData";
import Head from "next/head";
// utils inside the same file
export default async function Page({ params, searchParams }) {
  const awaitedParams = await params;
  const awaitedsearchParams = await searchParams;
  const sortValue = awaitedsearchParams.sort || "newest"; // fallback if not provided
  const filters = awaitedParams.filters || [];

  // params.filters will be undefined if no filters in URL
  const parsed = {
    category: null,
    priceRange: null,
    brands: [],
    ram: [],
    storage: [],
    features: [],
  };

  filters.forEach((f) => {
    if (f.startsWith("price-")) {
      // e.g., "price-100-to-500" => [100, 500]
      parsed.priceRange = f.replace("price-", "").split("-to-").map(Number); // convert to numbers
    } else if (f.endsWith("gb-ram")) {
      // e.g., "6gb-ram" => [6]
      const value = parseInt(f.replace("-ram", ""), 10);
      if (!isNaN(value)) parsed.ram.push(value);
    } else if (f.endsWith("gb-storage")) {
      // e.g., "256gb-storage" => [256]
      const value = parseInt(f.replace("-storage", ""), 10);
      if (!isNaN(value)) parsed.storage.push(value);
    } else if (f.includes("phones") || f.includes("mobile")) {
      // e.g., "apple-phones" or "samsung-mobile" => ["Apple", "Samsung"]
      const brandsArray = f
        .replace(/-phones$/, "")
        .replace(/-mobile$/, "")
        .split("-")
        .map((b) => b.charAt(0).toUpperCase() + b.slice(1));
      parsed.brands.push(...brandsArray);
    } else {
      // e.g., "smartphones" => "Smartphones"
      parsed.category = f.charAt(0).toUpperCase() + f.slice(1);
    }
  });
  const phones = await mobilePageData(parsed, sortValue);
  const availableFilters = SideBarData.reduce((acc, item) => {
    acc[item.slug] = item.values || [];
    return acc;
  }, {});
  return (
    <ClientPhoneGrid
      phones={phones}
      filters={filters}
      parsed={parsed}
      availableFilters={availableFilters}
    />
  );
}

export async function generateMetadata({ params, searchParams }) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  const filters = awaitedParams.filters || [];

  // Parse filters readable for metadata
  const titleFilters = filters
    .map((f) => f.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(", ");

  const title =
    "Latest Mobiles - Compare Specs & Prices in Pakistan | Mobile42";

  const description = titleFilters
    ? `Compare ${titleFilters} mobile phones at the best prices in Pakistan. View specs, RAM, storage, battery, display, and performance details to choose the best phone for your needs.`
    : "Explore and compare latest mobile phones in Pakistan. Filter by RAM, storage, camera, battery and price to find the best phone for your needs.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mobile42.com/phones`,
      images: [
        {
          url: "https://mobile42.com/og-image-default.jpg",
          width: 1200,
          height: 630,
          alt: "Mobile comparison",
        },
      ],
      siteName: "Mobile42",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://mobile42.com/og-image-default.jpg"],
    },
  };
}
