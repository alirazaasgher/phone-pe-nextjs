// utils/metadata.ts
export function buildPhoneMetadata(phone) {
  if (!phone) return { title: "Phone Not Found" };
  const title = `${phone.brand.name} ${phone.name} - Full Specs, Price & Review`;
  const description = `Explore ${phone.brand.name} ${phone.name} complete specifications, features, price, camera, battery, display, and user reviews. Get all details before you buy.`;

  return {
    title: title,
    description: description,
    keywords: [
      phone.name,
      phone.brand.name,
      `${phone.brand.name} ${phone.name} specs`,
      `${phone.brand.name} ${phone.name} price`,
      "smartphone specifications",
      "mobile phone review",
    ],
    openGraph: {
      title: title,
      description: description,
      url: `https://www.mobile42.com/${phone.slug}`,
      siteName: "Mobile42",
      images: [
        {
          url: `https://cdn.mobile42.com/${phone.primary_image}`,
          width: 1200,
          height: 630,
          alt: `${phone.brand.name} ${phone.name}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`https://cdn.mobile42.com/${phone.primary_image}`],
    },
    alternates: {
      canonical: `https://www.mobile42.com/${phone.slug}`,
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
  };
}

// lib/schema.js or utils/schema.js
export function generateProductSchema(phone) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${phone.brand.name} ${phone.name}`,
    image: phone.primary_image,
    description:
      phone.description ||
      `${phone.brand.name} ${phone.name} specifications and features`,
    brand: {
      "@type": "Brand",
      name: phone.brand.name,
    },
    offers: {
      "@type": "Offer",
      url: `https://www.mobile42.com/${phone.slug}`,
      priceCurrency: "USD", // Adjust if you have price
      price: phone.price || "0",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: phone.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: phone.rating,
          reviewCount: phone.review_count || 1,
        }
      : undefined,
    additionalProperty: [
      phone.display?.type && {
        "@type": "PropertyValue",
        name: "Display Type",
        value: phone.display.type,
      },
      phone.display?.size && {
        "@type": "PropertyValue",
        name: "Display Size",
        value: phone.display.size,
      },
      phone.water_resistance && {
        "@type": "PropertyValue",
        name: "Water Resistance",
        value: phone.water_resistance,
      },
      phone.battery?.capacity && {
        "@type": "PropertyValue",
        name: "Battery Capacity",
        value: `${phone.battery.capacity}mAh`,
      },
      phone.build && {
        "@type": "PropertyValue",
        name: "Build",
        value: phone.build,
      },
    ].filter(Boolean), // Remove undefined values
  };
}
