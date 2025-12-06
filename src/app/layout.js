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
  metadataBase: new URL("https://mobile42.com"),
  title: "Mobile42 - Latest & Upcoming Mobile Phones",
  description:
    "Discover the latest and upcoming mobile phones with detailed specs, prices, and reviews",
  keywords:
    "mobile phones, smartphones, latest mobiles, upcoming phones, phone specs, mobile reviews",
  icons: {
    icon: "/favicon.ico?v=1",
    apple: "/apple-touch-icon.png?v=1",
  },
  alternates: {
    canonical: "/",
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
      </body>
    </html>
  );
}
