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
    default: "Mobile42 - Latest & Upcoming Mobile Phones",
    template: "%s | Mobile42",
  },
  description:
    "Discover the latest and upcoming mobile phones with detailed specifications, prices, comparisons, and expert reviews at Mobile42.",
  keywords: [
    "mobile phones",
    "smartphones",
    "latest mobiles",
    "upcoming phones",
    "mobile prices",
    "phone specs",
    "mobile reviews",
    "compare mobiles"
  ],
  alternates: {
    canonical: "https://www.mobile42.com/",
  },
  openGraph: {
    title: "Mobile42 - Latest & Upcoming Mobile Phones",
    description:
      "Explore latest and upcoming mobile phones with specs, prices, comparisons and reviews.",
    url: "https://www.mobile42.com/",
    siteName: "Mobile42",
    type: "website",
    images: [
      {
        url: "https://www.mobile42.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mobile42 - Latest & Upcoming Mobile Phones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile42 - Latest & Upcoming Mobile Phones",
    description:
      "Discover the latest and upcoming mobile phones with detailed specs, comparisons, and reviews.",
    images: ["https://www.mobile42.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico?v=1",
    apple: "/apple-touch-icon.png?v=1",
  },
};


export const viewport = {
  width: "device-width",
  initialScale: 1,
};
const GA_MEASUREMENT_ID = "G-KRGHF7G70Y"; // Replace with your GA4 ID

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`flex flex-col min-h-screen ${poppins.className} bg-gray-50`}
      >
        {/* Google Analytics Scripts */}
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
                "https://twitter.com/mobile42"
              ]
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
                target: "https://www.mobile42.com/search?q={search_term_string}",
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
