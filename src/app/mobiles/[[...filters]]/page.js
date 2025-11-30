import { mobilePageData } from "../../services/phones";
import ClientPhoneGrid from "@/components/ClientPhoneGrid";
import SideBarData from "@/data/SideBarData";
const parseFilters = (filters) => {
  const parsed = {
    brands: [],
    ram: [],
    storage: [],
    batteryCapacity: [],
    screenSize: [],
    priceRange: [],
  };

  const ignoredCategories = [
    "mid-range-phones",
    "budget-phones",
    "flagship-phones",
  ];

  filters.forEach((item) => {
    if (!item) return;

    item = item.toLowerCase().trim();

    // Ignore irrelevant categories
    if (ignoredCategories.includes(item)) return;

    // Brands
    if (
      item.endsWith("-mobile-phones") ||
      item.endsWith("-mobile") ||
      item.endsWith("-phones")
    ) {
      const brands = item
        .replace(/-(mobile-phones|mobile|phones)$/, "")
        .split("-")
        .map((b) => b.charAt(0).toUpperCase() + b.slice(1));
      parsed.brands.push(...brands);
      return;
    }

    // RAM
    if (item.includes("ram")) {
      parsed.ram.push(item.replace("gb-ram", ""));
      return;
    }

    // Storage
    if (item.includes("storage")) {
      parsed.storage.push(item.replace("gb-storage", ""));
      return;
    }

    // Battery
    if (item.includes("battery")) {
      parsed.batteryCapacity.push(item.replace("-battery", ""));
      return;
    }

    // Screen Size: "4.5to5.0" or "1.0to4.5-screen-size"
    if (item.includes("to")) {
      if (item.includes("screen-size")) {
        parsed.screenSize.push(item.replace("-screen-size", ""));
        return;
      }
      // Price: 1500-to-20000
      if (/^\d+-to-\d+$/.test(item)) {
        parsed.priceRange.push(item.split("-to-").map(Number));
        return;
      }
      // Price: 15000-20000
      if (/^\d+-\d+$/.test(item)) {
        parsed.priceRange.push(item.split("-").map(Number));
        return;
      }
    }

    // Price: price-from-10000
    if (item.startsWith("price-from-")) {
      parsed.priceRange.push([Number(item.replace("price-from-", ""))]);
      return;
    }

    // Price: price-up-to-10000
    if (item.startsWith("price-up-to-")) {
      parsed.priceRange.push([null, Number(item.replace("price-up-to-", ""))]);
      return;
    }

    // Price: single number
    if (/^\d+$/.test(item)) {
      parsed.priceRange.push([Number(item)]);
      return;
    }
  });

  return parsed;
};

// utils inside the same file
export default async function Page({ params, searchParams }) {
  const awaitedParams = await params;
  const awaitedsearchParams = await searchParams;
  const sortValue = awaitedsearchParams.sort || "newest"; // fallback if not provided
  const filters = awaitedParams.filters || [];
  const parsed = parseFilters(filters);
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
