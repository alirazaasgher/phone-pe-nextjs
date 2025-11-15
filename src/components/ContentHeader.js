import { Plus } from 'lucide-react';
import Link from "next/link";
export default function ContentHeader({ phone }) {
    const handleCompareNow = () => {
        router.push(`/compare/${phone.slug}`);
    };
    return (
        <div className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <nav className="hidden md:flex text-sm text-gray-500 space-x-2">
                            <span><Link href='/'>Home</Link></span>
                            <span className="text-gray-400">›</span>
                            <span><Link href='/mobiles'>Mobiles</Link></span>
                            <span className="text-gray-400">›</span>
                            <span><Link href={`/mobiles/${phone.brand}`}>{phone.brand}</Link></span>
                            <span className="text-gray-400">›</span>
                            <span className="text-gray-900 font-medium">{phone.model}</span>
                        </nav>
                        <h1 className="md:hidden text-xl font-bold text-gray-900">
                            {phone.brand} {phone.model}
                        </h1>
                    </div>


                    <div className="flex justify-center">
                        <button
                            className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-medium shadow-md hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer"
                            onClick={handleCompareNow}
                        >
                            <Plus className="w-5 h-5" />
                            <span>Compare Now</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}