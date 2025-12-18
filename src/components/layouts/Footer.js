// components/Footer.tsx
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">Mobile42</h2>
            <p className="text-sm text-gray-400">
              Compare, explore & discover the latest smartphones with ease.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mobiles/new"
                  className="hover:text-white transition-colors"
                  title="Browse latest mobile phones released in 2025"
                >
                  New Mobiles
                </Link>
              </li>
              <li>
                <Link
                  href="/mobiles/upcoming"
                  className="hover:text-white transition-colors"
                  title="Explore upcoming mobile phone launches and releases"
                >
                  Upcoming Mobiles
                </Link>
              </li>
            </ul>
          </nav>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Support
            </h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <Link aria-label="Facebook" href="https://facebook.com" className="hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link aria-label="Twitter" href="https://twitter.com" className="hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link aria-label="Instagram" href="https://instagram.com" className="hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link aria-label="Youtube" href="https://youtube.com" className="hover:text-white">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Mobile42. All rights reserved.</p>
          {/* <p className="mt-2 sm:mt-0">Made with ❤️ for mobile lovers</p> */}
        </div>
      </div>
    </footer>
  );
}
