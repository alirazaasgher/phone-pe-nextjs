import "./globals.css";
import { Inter, Bebas_Neue } from "next/font/google";
import ClientLayout from "./ClientLayout";
import AnalyticsTracker from "./AnalyticsTracker";
import Script from "next/script";

// ✅ Optimized: Added display: 'swap' and adjustSubset
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap", // Shows fallback font immediately
  preload: true,
  adjustFontFallback: true, // Reduces layout shift
});

export const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500"],
//   display: "swap",
//   preload: true,
//   adjustFontFallback: true,
// });

export const metadata = {
  metadataBase: new URL("https://www.mobile42.com"),

  title: {
    default: `Mobile42 - Latest Mobile Phones ${new Date().getFullYear()} | Specs, Prices & Reviews`,
    template: "%s | Mobile42",
  },

  description:
    "Explore 1000+ latest and upcoming mobile phones with detailed specifications, expert reviews, price comparisons, and buying guides. Find your perfect smartphone at Mobile42. Updated daily.",

  keywords: [
    "mobile phones",
    `smartphones ${new Date().getFullYear()}`,
    "latest mobile phones",
    `upcoming phones ${new Date().getFullYear()}`,
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
    title: `Mobile42 - Latest Mobile Phones ${new Date().getFullYear()} | Specs, Prices & Reviews`,
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
    title: `Mobile42 - Latest Mobile Phones ${new Date().getFullYear()} | Specs, Prices & Reviews`,
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
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  category: "technology",
  other: {
    "msapplication-TileColor": "#da532c",
    "theme-color": "#ffffff",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const GA_MEASUREMENT_ID = "G-KRGHF7G70Y";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable}`}>
      <body
        className={`flex flex-col min-h-screen ${inter.className} bg-gray-50`}
      >
        {/* ✅ Moved to afterInteractive for better performance */}
        {/* {process.env.NODE_ENV === "production" && ( */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
            `}
            </Script>
            <AnalyticsTracker />
          </>
        )}
        <ClientLayout>
          <div className="relative flex-1 sm:min-h-screen w-full">
            {children}
          </div>
        </ClientLayout>

        {/* ✅ Consolidated JSON-LD schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.mobile42.com/#website",
                  name: "Mobile42",
                  alternateName: "Mobile42",
                  url: "https://www.mobile42.com/",
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.mobile42.com/#organization",
                  name: "Mobile42",
                  url: "https://www.mobile42.com/",
                  logo: "https://www.mobile42.com/logo.png",
                  sameAs: [
                    "https://www.facebook.com/@mobile42official",
                    "https://www.twitter.com/@Mobile42offical",
                    "https://www.youtube.com/@mobile42official",
                  ],
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.mobile42.com/#webpage",
                  name: "Mobile42 - Latest & Upcoming Mobile Phones",
                  url: "https://www.mobile42.com/",
                  description:
                    "Discover the latest and upcoming mobile phones with full specs, prices, and reviews.",
                  isPartOf: {
                    "@id": "https://www.mobile42.com/#website",
                  },
                  about: {
                    "@id": "https://www.mobile42.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
