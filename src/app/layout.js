import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import ClientLayout from "./ClientLayout";
import Script from "next/script";
// Module-scope declaration
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import { Arimo, Roboto_Mono } from "next/font/google";

// Primary font for headings & labels
const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // regular, medium, bold
  variable: "--font-arimo", // optional CSS variable
});

// Optional monospace font for numbers / specs
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
});
export const metadata = {
  title: "Mobile42 - Latest & Upcoming Mobile Phones",
  description:
    "Discover the latest and upcoming mobile phones with detailed specs, prices, and reviews",
  keywords:
    "mobile phones, smartphones, latest mobiles, upcoming phones, phone specs, mobile reviews",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Website schema for site name */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mobile42",
              alternateName: "Mobile 42",
              url: "https://mobile42.com/",
            }),
          }}
        />

        {/* Organization schema for brand and logo */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mobile42",
              url: "https://mobile42.com/",
              logo: "https://mobile42.com/mobile42.jpeg",
            }),
          }}
        />
      </head>
      <body
        className={`flex flex-col min-h-screen ${poppins.className} bg-gray-50`}
      >
        <ClientLayout>
          <div className="relative min-h-screen w-full max-w-7xl mx-auto">
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
