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

  const readableFilters = filters
    .map((f) => f.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(", ");

  const baseUrl = "https://www.mobile42.com/mobiles";
  const canonicalUrl = filters.length
    ? `${baseUrl}/${filters.join("/")}`
    : baseUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: readableFilters ? `${readableFilters}` : "Latest Mobile Phones",
    description: readableFilters
      ? `Compare ${readableFilters} by price, specs, and features`
      : "Compare the latest mobile phones worldwide",
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Mobile42",
      url: "https://www.mobile42.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.mobile42.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Phones",
          item: canonicalUrl,
        },
      ],
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPhoneGrid
        phones={phones}
        filters={filters}
        parsed={parsed}
        availableFilters={availableFilters}
      />
    </>
  );
}

export function generateMetadata({ params }) {
  const filters = Array.isArray(params?.filters) ? params.filters : [];

  // Convert filters to readable text
  const readableFilters = filters
    .map((f) => f.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(", ");

  const baseUrl = "https://www.mobile42.com/mobiles";

  const canonicalUrl = filters.length
    ? `${baseUrl}/${filters.join("/")}`
    : baseUrl;

  const baseTitle =
    "Latest Mobile Phones - Compare Specs, Features & Prices | Mobile42";

  const title = readableFilters
    ? `${readableFilters} Mobile Phones - Compare Specs, Features & Prices | Mobile42`
    : baseTitle;

  const description = readableFilters
    ? `Compare ${readableFilters} mobile phones by price, specs, performance, battery, camera, and display. Find the best phone that matches your needs.`
    : "Explore and compare the latest mobile phones worldwide. Filter by price, RAM, storage, camera, battery, and features to find the best phone for your needs.";

  // Generate dynamic OG image URL
  const ogImageUrl = readableFilters
    ? `https://www.mobile42.com/api/og?filters=${encodeURIComponent(
        readableFilters
      )}`
    : "https://www.mobile42.com/og-image-default.jpg";

  // Generate keywords
  const keywords = readableFilters
    ? `${readableFilters} phones, mobile comparison, phone specs, ${readableFilters} price`
    : "mobile phones, smartphone comparison, phone specs, mobile prices, latest phones";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: readableFilters
            ? `${readableFilters} mobile phones comparison`
            : "Mobile phones comparison",
        },
      ],
      siteName: "Mobile42",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      site: "@mobile42", // Add your Twitter handle
      creator: "@mobile42",
    },
  };
}
