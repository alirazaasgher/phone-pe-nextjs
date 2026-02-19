// utils/metadata.ts
const getSpec = (specifications, key) =>
  specifications?.find((spec) => spec[key])?.[key];

export function buildPhoneMetadata(phone) {
  if (!phone) return { title: "Phone Not Found" };
  const title = phone.name
    .toLowerCase()
    .startsWith(phone.brand.name.toLowerCase())
    ? `${phone.name} - Full Specs, Price & Review`
    : `${phone.brand.name} ${phone.name} - Full Specs, Price & Review`;
  // Helper to find a spec section by key
  const build = getSpec(phone.specifications, "build");
  const display = getSpec(phone.specifications, "display");
  const performance = getSpec(phone.specifications, "performance");
  const main_camera = getSpec(phone.specifications, "main_camera");
  const battery = getSpec(phone.specifications, "battery");
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
      type: "og:product",
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
  const hasUSD = !!phone.searchIndex?.min_price_usd;
  const priceValidUntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1),
  )
    .toISOString()
    .split("T")[0];

  const offerBase = {
    "@type": "Offer",
    priceValidUntil,
    itemCondition: "https://schema.org/NewCondition",
    url: `https://www.mobile42.com/${phone.slug}`,
  };

  // Build offers array
  const offers = [];

  if (hasPrice) {
    offers.push({
      ...offerBase,
      price: phone.searchIndex.min_price.replace(/,/g, ""),
      priceCurrency: "PKR",
    });
  }

  if (hasUSD) {
    offers.push({
      ...offerBase,
      price: phone.searchIndex.min_price_usd,
      priceCurrency: "USD",
    });
  }

  // Fallback if no price at all
  if (offers.length === 0) {
    offers.push({
      ...offerBase,
      priceCurrency: "PKR",
      availability: "https://schema.org/PreOrder",
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: phone.name.toLowerCase().startsWith(phone.brand.name.toLowerCase())
      ? phone.name
      : `${phone.brand.name} ${phone.name}`,
    sku: phone.slug,
    image: {
      "@type": "ImageObject",
      url: `https://cdn.mobile42.com/${phone.primary_image}`,
    },
    description:
      phone.description ||
      `Detailed specifications and features of the ${phone.brand.name} ${phone.name}.`,
    brand: {
      "@type": "Brand",
      name: phone.brand.name,
    },
    offers: offers.length === 1 ? offers[0] : offers,
  };
}

export function generateFAQSchema(phone) {
  const build = getSpec(phone.specifications, "build");
  const display = getSpec(phone.specifications, "display");
  const performance = getSpec(phone.specifications, "performance");
  const main_camera = getSpec(phone.specifications, "main_camera");
  const battery = getSpec(phone.specifications, "battery");
  const memory = getSpec(phone.specifications, "memory");
  const pkrPrice = phone.searchIndex?.min_price
    ? `Rs. ${phone.searchIndex.min_price}`
    : null;
  const usdPrice = phone.searchIndex?.min_price_usd
    ? `$${phone.searchIndex.min_price_usd}`
    : null;
  const cameraStr = main_camera?.setup
    ? `${main_camera.setup
        .split(",")[0]
        .replace(/\(.*?\)/g, "")
        .trim()} camera`
    : null;
  const faqs = [
    // ✅ Pakistan Focused
    pkrPrice && {
      question: `What is ${phone.name} price in Pakistan?`,
      answer: `${phone.name} price in Pakistan is ${pkrPrice}${usdPrice ? ` (${usdPrice})` : ""}.`,
    },
    pkrPrice && {
      question: `What is the official price of ${phone.name} in Pakistan?`,
      answer: `The official price of ${phone.name} in Pakistan is ${pkrPrice}.`,
    },

    // ✅ Global Focused
    usdPrice && {
      question: `What is ${phone.name} price?`,
      answer: `${phone.name} price is ${usdPrice}${pkrPrice ? ` (${pkrPrice} in Pakistan)` : ""}.`,
    },
    !pkrPrice &&
      !usdPrice && {
        question: `What is ${phone.name} price?`,
        answer: `${phone.name} price has not been officially announced yet.`,
      },

    // ✅ Display — both markets
    display?.size && {
      question: `What is ${phone.name} screen size?`,
      answer: `${phone.name} has a ${display.size} display${display.type ? ` with ${display.type} panel` : ""}.`,
    },

    // ✅ Performance — both markets
    performance?.chipset && {
      question: `What processor does ${phone.name} use?`,
      answer: `${phone.name} is powered by ${performance.chipset}.`,
    },

    // ✅ Camera — both markets
    cameraStr && {
      question: `What is ${phone.name} camera?`,
      answer: `${phone.name} features a ${cameraStr}.`,
    },

    // ✅ Battery — both markets
    battery?.capacity && {
      question: `What is ${phone.name} battery capacity?`,
      answer: `${phone.name} has a ${battery.capacity} battery${battery.charging ? ` with ${battery.charging} charging` : ""}.`,
    },

    // ✅ Waterproof — both markets
    {
      question: `Is ${phone.name} waterproof?`,
      answer: build?.ip_rating
        ? `Yes, ${phone.name} is rated ${build.ip_rating}.`
        : `${phone.name} does not have an official IP rating.`,
    },

    // ✅ RAM/Storage — both markets
    memory?.ram && {
      question: `How much RAM does ${phone.name} have?`,
      answer: `${phone.name} comes with ${memory.ram} RAM${memory.storage ? ` and ${memory.storage} storage` : ""}.`,
    },

    // ✅ Pakistan specific — availability
    {
      question: `Is ${phone.name} available in Pakistan?`,
      answer: pkrPrice
        ? `Yes, ${phone.name} is available in Pakistan at ${pkrPrice}.`
        : `${phone.name} availability in Pakistan has not been confirmed yet.`,
    },

    // ✅ Global specific — release
    phone.release_date && {
      question: `When was ${phone.name} released?`,
      answer: `${phone.name} was released in ${phone.release_date}.`,
    },
  ]
    .filter(Boolean)
    .filter(
      (faq) =>
        faq.answer &&
        !faq.answer.includes("undefined") &&
        !faq.answer.includes("null"),
    );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
