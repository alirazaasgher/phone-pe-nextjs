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
