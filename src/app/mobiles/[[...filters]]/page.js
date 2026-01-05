import { mobilePageData } from "../../services/phones";
import ClientPhoneGrid from "@/components/ClientPhoneGrid";
import SideBarData from "@/data/SideBarData";
import { getActiveTags, parseFilters } from "@/utils/helpers";
export const dynamic = "force-static";
export const revalidate = 172800; // 1 hour (ISR)
// utils inside the same file
export default async function Page({ params, searchParams }) {
  const awaitedParams = await params;
  const awaitedsearchParams = await searchParams;
  const sortValue = awaitedsearchParams.sort || "newest"; // fallback if not provided
  const filters = awaitedParams.filters || [];
  const parsed = parseFilters(filters);
  const availableFilters = SideBarData.reduce((acc, item) => {
    acc[item.slug] = item.values || [];
    return acc;
  }, {});

  const phones = await mobilePageData(parsed, sortValue);
  const activeTags = getActiveTags(parsed, availableFilters);
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
          name: "mobiles",
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
        activeTags={activeTags}
      />
    </>
  );
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const filters = Array.isArray(awaitedParams?.filters)
    ? awaitedParams.filters
    : [];

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
            ? `${readableFilters} mobile phonen`
            : "Mobile phones",
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
