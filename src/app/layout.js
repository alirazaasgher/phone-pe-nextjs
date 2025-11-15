import './globals.css'
import { Inter, Poppins } from 'next/font/google';
import ClientLayout from './ClientLayout';
// Module-scope declaration
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
import { Arimo, Roboto_Mono } from 'next/font/google';

// Primary font for headings & labels
const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // regular, medium, bold
  variable: '--font-arimo',       // optional CSS variable
});

// Optional monospace font for numbers / specs
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto-mono',
});
export const metadata = {
  title: 'MobileFinder - Latest & Upcoming Mobile Phones',
  description: 'Discover the latest and upcoming mobile phones with detailed specs, prices, and reviews',
  keywords: 'mobile phones, smartphones, latest mobiles, upcoming phones, phone specs, mobile reviews',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    // <html lang="en" className={inter.className}>
    //   <body className={`flex flex-col min-h-screen ${poppins.className} bg-gray-50`}>
    //     <ClientLayout>{children}</ClientLayout>
    //   </body>
    // </html>
    <html lang="en" className={inter.className}>
  <body className={`flex flex-col min-h-screen ${poppins.className} bg-gray-50`}>
    <ClientLayout>
      <div className="w-full max-w-7xl mx-auto">
        {children}
      </div>
    </ClientLayout>
  </body>
</html>
  )
}