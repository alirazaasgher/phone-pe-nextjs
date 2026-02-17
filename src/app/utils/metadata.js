// utils/metadata.ts
export function buildPhoneMetadata(phone) {
  console.log(phone);
  if (!phone) return { title: "Phone Not Found" };
  const title = phone.name
    .toLowerCase()
    .startsWith(phone.brand.name.toLowerCase())
    ? `${phone.name} - Full Specs, Price & Review`
    : `${phone.brand.name} ${phone.name} - Full Specs, Price & Review`;
  // Helper to find a spec section by key
  const getSpec = (specifications, key) =>
    specifications?.find((spec) => spec[key])?.[key];

  const build = getSpec(phone.specifications, "build");
  const display = getSpec(phone.specifications, "display");
  const performance = getSpec(phone.specifications, "performance");
  const main_camera = getSpec(phone.specifications, "main_camera");
  const battery = getSpec(phone.specifications, "battery");
  console.log(main_camera.setup);
  const pkrPrice = phone.searchIndex.min_price
    ? `Rs. ${phone.searchIndex.min_price}`
    : null;
  const usdPrice = phone.searchIndex.min_price_usd
    ? `$${phone.searchIndex.min_price_usd}`
    : null;

  // Combine them into a clean string: "Rs. 54,999 ($168)"
  const priceString = [pkrPrice, usdPrice ? `(${usdPrice})` : null]
    .filter(Boolean)
    .join(" ");
  const cameraStr = main_camera?.setup
    ? `${main_camera.setup
        .split(",")[0]
        .replace(/\(.*?\)/g, "")
        .trim()} camera`
    : null;
  const description =
    [
      `${phone.brand?.name ?? ""} ${phone.name ?? ""}`.trim(),
      priceString ? `Price: ${priceString}` : null, // Moved to the second position
      display?.size ? `${display.size} display` : null,
      performance?.chipset ? `${performance.chipset}` : null,
      cameraStr ? `${cameraStr}` : null,
      battery?.capacity ? `${battery.capacity} battery` : null,
      build?.ip_rating ?? null,
    ]
      .filter(Boolean)
      .join(", ") + ". Full specs & price.";
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
  const hasPrice = !!phone.searchIndex?.min_price;

  const priceValidUntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1),
  )
    .toISOString()
    .split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: phone.name.toLowerCase().startsWith(phone.brand.name.toLowerCase())
      ? phone.name
      : `${phone.brand.name} ${phone.name}`,
    sku: phone.slug,
    image: {
      "@type": "ImageObject",
      url: phone.primary_image,
    },
    description:
      phone.description ||
      `Detailed specifications and features of the ${phone.brand.name} ${phone.name}.`,
    brand: {
      "@type": "Brand",
      name: phone.brand.name,
    },
    ...(hasPrice && {
      offers: {
        "@type": "Offer",
        price: phone.searchIndex.min_price.replace(/,/g, ""),
        priceCurrency: "PKR",
        priceValidUntil,
        itemCondition: "https://schema.org/NewCondition",
        url: `https://www.mobile42.com/${phone.slug}`,
      },
    }),
  };
}
