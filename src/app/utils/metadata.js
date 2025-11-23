// utils/metadata.ts
export function buildPhoneMetadata(phone) {
  if (!phone) return { title: "Phone Not Found" };

  return {
    title: `${phone.name} - Specs, Price, Features`,
    description: `Check full specifications, features, and price of ${phone.brand.name} ${phone.name}.`,
    openGraph: {
      title: `${phone.brand} ${phone.name}`,
      description: `${phone.brand} ${phone.name} features and specs.`,
      url: `https://example.com/${phone.slug}`,
      images: [phone.image_url],
    },
  };
}
