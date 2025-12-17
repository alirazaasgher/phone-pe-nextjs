import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import ClientLayout from "./ClientLayout";
import AnalyticsTracker from "./AnalyticsTracker"; // we'll create this next
import Script from "next/script";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});
export const metadata = {
  metadataBase: new URL("https://www.mobile42.com"),

  title: {
    default: "Mobile42 - Latest Mobile Phones 2025 | Specs, Prices & Reviews",
    template: "%s | Mobile42",
  },

  description:
    "Explore 1000+ latest and upcoming mobile phones with detailed specifications, expert reviews, price comparisons, and buying guides. Find your perfect smartphone at Mobile42. Updated daily.",

  keywords: [
    "mobile phones",
    "smartphones 2025",
    "latest mobile phones",
    "upcoming phones 2026",
    "mobile phone prices",
    "phone specifications",
    "mobile reviews",
    "compare smartphones",
    "best mobile phones",
    "phone comparison",
    "flagship phones",
    "budget smartphones",
    "camera phones",
    "gaming phones",
    "5G phones",
    "mobile phone buying guide",
    "smartphone deals",
    "phone price in Pakistan",
    "Android phones",
    "iPhone models",
  ],

  authors: [{ name: "Mobile42 Team" }],

  creator: "Mobile42",
  publisher: "Mobile42",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: "https://www.mobile42.com/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mobile42.com/",
    siteName: "Mobile42",
    title: "Mobile42 - Latest Mobile Phones 2025 | Specs, Prices & Reviews",
    description:
      "Explore 1000+ latest and upcoming mobile phones with detailed specs, expert reviews, and price comparisons. Find your perfect smartphone.",
    images: [
      {
        url: "https://www.mobile42.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mobile42 - Latest Mobile Phones, Specs, Prices & Reviews",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mobile42 - Latest Mobile Phones 2025 | Specs, Prices & Reviews",
    description:
      "Explore 1000+ latest and upcoming mobile phones with detailed specs, expert reviews, and price comparisons.",
    images: ["https://www.mobile42.com/og-image.jpg"],
    creator: "@mobile42",
    site: "@mobile42",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  category: "technology",
  other: {
    "msapplication-TileColor": "#da532c",
    "theme-color": "#ffffff",
  },
};

// Add this JSON-LD schema to your root layout
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mobile42",
  url: "https://www.mobile42.com",
  description:
    "Explore latest and upcoming mobile phones with detailed specifications, prices, comparisons and expert reviews.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.mobile42.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "Mobile42",
    url: "https://www.mobile42.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.mobile42.com/logo.png",
      width: 600,
      height: 60,
    },
    sameAs: [
      "https://www.facebook.com/mobile42official",
      "https://www.twitter.com/@Mobile42offical",
      // "https://www.instagram.com/mobile42",
      "https://www.youtube.com/@mobile42official",
    ],
  },
};

const GA_MEASUREMENT_ID = "G-KRGHF7G70Y"; // Replace with your GA4 ID

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`flex flex-col min-h-screen ${poppins.className} bg-gray-50`}
      >
        {/* Google Analytics Scripts */}
        {/* <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <AnalyticsTracker /> */}

        <ClientLayout>
          <div className="relative flex-1 sm:min-h-screen w-full">
            {children}
          </div>
        </ClientLayout>
        {/* JSON-LD SCHEMAS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mobile42",
              url: "https://www.mobile42.com/",
              logo: "https://www.mobile42.com/logo.png",
              sameAs: [
                "https://facebook.com/mobile42",
                "https://instagram.com/mobile42",
                "https://twitter.com/mobile42",
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mobile42",
              url: "https://www.mobile42.com/",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.mobile42.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Mobile42 - Latest & Upcoming Mobile Phones",
              url: "https://www.mobile42.com/",
              description:
                "Discover the latest and upcoming mobile phones with full specs, prices, and reviews.",
            }),
          }}
        />
      </body>
    </html>
  );
}
