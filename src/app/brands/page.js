import Link from "next/link";
import BrandsData from "@/data/BrandsData";
export const metadata = {
  title: "Mobile Brands: Compare Specs & Prices | Mobile42",
  description:
    "Compare 15+ mobile brands including Samsung, Apple, Xiaomi, OnePlus & Vivo. Find detailed specs, latest prices, and expert reviews to choose your perfect phone.",
  openGraph: {
    title: "All Mobile Brands - Specs, Prices & Comparisons",
    description:
      "Explore popular mobile brands with detailed specs and price comparisons.",
    type: "website",
    url: "https://www.mobile42.com/brands",
    images: [{ url: "/og-brands.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Mobile Brands | Mobile42",
    description: "Compare specs and prices across 15+ mobile brands",
  },
  alternates: {
    canonical: "https://www.mobile42.com/brands",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
export default function BrandsPage() {
  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
          All Brands
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Explore phones from {BrandsData.length}+ leading manufacturers
        </p>
      </div>

      <section aria-labelledby="brands-heading" className="mt-8">
        <h2 id="brands-heading" className="sr-only">
          Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {BrandsData.map((brand) => (
            <Link
              key={brand.name}
              href={brand.url}
              aria-label={`Visit ${brand.name} brand page`}
              className={`group relative flex flex-col items-center justify-center rounded-2xl p-5
        shadow-sm ${brand.color}`}
            >
              {/* Logo */}
              <div
                className={`relative mb-3 flex h-16 w-16 items-center justify-center rounded-xl
          bg-gray-50 ring-1 ring-gray-200 group-hover:ring-2 `}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Brand Name */}
              <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

// export function generateMetadata() {
//   const allMetadata = {};

//   BrandsData.forEach((brand) => {
//     // Use brand.value for proper capitalized name
//     const brandName = brand.value;

//     allMetadata[brand.name] = {
//       title: `${brandName} Mobile Phones - Specs, Prices & Reviews | Mobile42`,
//       description: `Explore ${brandName} smartphones with detailed specifications, latest prices, and reviews. Compare ${brandName} models easily and find the perfect phone on Mobile42.`,
//       keywords: `${brandName} phones, ${brandName} mobiles, ${brandName} specs, ${brandName} prices, compare ${brandName} phones, smartphones`,
//       icons: {
//         icon: "/favicon.ico",
//         apple: "/apple-touch-icon.png",
//       },
//     };
//   });
//   console.log(allMetadata);
//   return allMetadata;
// }
