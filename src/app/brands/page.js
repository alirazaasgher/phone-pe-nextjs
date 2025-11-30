import Link from "next/link";
import BrandsData from "@/data/BrandsData";
export const metadata = {
  title: "Mobile Brands: Compare Specs & Prices | Mobile42",
  description:
    "Compare 50+ mobile brands including Samsung, Apple, Xiaomi, OnePlus & Vivo. Find detailed specs, latest prices, and expert reviews to choose your perfect phone.",
  openGraph: {
    title: "All Mobile Brands - Specs, Prices & Comparisons",
    description:
      "Explore popular mobile brands with detailed specs and price comparisons.",
    type: "website",
    url: "https://mobile42.com/brands",
    images: [{ url: "/og-brands.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Mobile Brands | Mobile42",
    description: "Compare specs and prices across 50+ mobile brands",
  },
  alternates: {
    canonical: "https://mobile42.com/brands",
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

      {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 6 columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
        {BrandsData.map((brand) => (
          <Link
            key={brand.name}
            href={brand.url}
            className={`group relative flex flex-col items-center justify-center border-2 border-gray-200 rounded-2xl p-4 sm:p-6
              hover:border-blue-400
              ${brand.color}`}
          >
            {/* Brand Logo Container */}
            <div
              className="relative w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 flex items-center justify-center
              bg-white rounded-xl shadow-sm"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                loading="lazy"
              />
            </div>

            {/* Brand Name */}
            <h3 className="text-sm sm:text-base font-bold text-gray-900 text-center mb-1">
              {brand.name}
            </h3>

            {/* Model Count */}
            <div className="flex items-center gap-1">
              {/* <span className="text-xs sm:text-sm font-medium text-gray-500 group-hover:text-blue-500 transition-colors">
                {brand.count}
              </span> */}
              {/* <span className="text-xs sm:text-sm text-gray-400">models</span> */}
            </div>
          </Link>
        ))}
      </div>
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
