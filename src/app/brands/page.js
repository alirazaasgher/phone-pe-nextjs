import { Smartphone, Apple, Square, Circle, Star as StarIcon, ChevronLeft, ChevronRight, Diamond, Scale, Flame, Lightbulb, Phone } from "lucide-react";
import Container from "@/components/Container";
export default function BrandsPage() {
    const brands = [
  { name: "Samsung",url:"/mobiles/samsung-mobile-phones", logo: "/images/Brands/Samsung/Samsung_Orig_Wordmark_BLUE_RGB.png", color: "bg-blue-50", count: 520 },
  { name: "Apple", url:"/mobiles/apple-mobile-phones",logo: "/images/Brands/Apple/apple-seeklogo.png", color: "bg-gray-50", count: 220 },
  { name: "OnePlus", url:"/mobiles/oneplus-mobile-phones",logo: "/images/Brands/OnePlus/oneplus-seeklogo.png", color: "bg-red-50", count: 120 },
  { name: "Xiaomi", url:"/mobiles/xiaomi-mobile-phones",logo: "/images/Brands/Xiaomi/xiaomi-seeklogo.png", color: "bg-orange-50", count: 2000 },
  { name: "Vivo", url:"/mobiles/vivo-mobile-phones",logo: "/images/Brands/Vivo/vivo-seeklogo.png", color: "bg-cyan-50", count: 200 },
  { name: "Oppo", url:"/mobiles/oppo-mobile-phones",logo: "/images/Brands/Oppo/oppo-logo.png", color: "bg-green-50", count: 20 },
  { name: "Realme", url:"/mobiles/realme-mobile-phones",logo: "/images/Brands/Realme/realme-logo.png", color: "bg-yellow-50", count: 150 },
  { name: "Motorola", url:"/mobiles/motorola-mobile-phones",logo: "/images/Brands/Motorola/motorola-logo.png", color: "bg-indigo-50", count: 80 },
  { name: "Nokia", url:"/mobiles/nokia-mobile-phones",logo: "/images/Brands/Nokia/nokia-logo.jpg", color: "bg-blue-100", count: 90 },
  { name: "Google", url:"/mobiles/google-mobile-phones",logo: "/images/Brands/Google/google-pixel-logo.png", color: "bg-gray-100", count: 60 },
  { name: "Huawei", url:"/mobiles/huawei-mobile-phones",logo: "/images/Brands/Huawei/huawei-logo.png", color: "bg-red-100", count: 110 },
  { name: "Honor", url:"/mobiles/honor-mobile-phones",logo: "/images/Brands/Honor/honor-logo.png", color: "bg-white", count: 110 },
  { name: "LG", url:"/mobiles/lg-mobile-phones",logo: "/images/Brands/LG/lg-logo.png", color: "bg-pink-50", count: 30 },
  { name: "Sony", url:"/mobiles/sony-mobile-phones",logo: "/images/Brands/Sony/sony-logo.png", color: "bg-gray-200", count: 40 },
  { name: "Infinix", url:"/mobiles/infinix-mobile-phones",logo: "/images/Brands/Infinix/infinix-logo.png", color: "bg-green-100", count: 65 },
  { name: "Tecno", url:"/mobiles/tecno-mobile-phones",logo: "/images/Brands/Tecno/tecno-logo.png", color: "bg-yellow-100", count: 50 },
  { name: "Lenovo", url:"/mobiles/lenovo-mobile-phones",logo: "/images/Brands/Lenovo/lenovo-logo.png", color: "bg-red-100", count: 50 },
];

    return (
        <Container>
            <h2 className="text-sm sm:text-2xl font-bold text-gray-800 mb-6">All Brands</h2>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {brands.map((brand) => (
                    <a
                        key={brand.name}
                        href={brand.url}
                        className={`flex flex-col items-center border border-gray-200 rounded-xl p-4 group min-w-[50px] min-h-[20px] sm:min-w-[130px] transition-transform transform hover:scale-105 hover:border-blue-400 hover:shadow-lg ${brand.color}`}
                    >
                        <div className="w-10 h-10 sm:w-14 sm:h-14 mb-3 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="w-10 h-10 object-contain"
                                loading="lazy"
                            />
                        </div>
                        <p className="font-sans text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {brand.name}
                        </p>
                        <span className="font-mono text-xs text-gray-500 mt-1">
                            {brand.count} models
                        </span>
                    </a>
                ))}
            </div>
        </Container>
    );
}