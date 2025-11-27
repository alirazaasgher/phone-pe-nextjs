import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import ClientLayout from "./ClientLayout";
import Script from "next/script";
import AnalyticsTracker from "./AnalyticsTracker"; // we'll create this next

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false, // optional
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

        {/* Track SPA Navigation */}
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
