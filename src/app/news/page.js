import React from "react";
import { Clock, TrendingUp, Sparkles } from 'lucide-react';

export default function NewsPage() {

    const newsData = [
        {
            title: "Apple Unveils iPhone 17 with Holographic Display",
            date: "October 9, 2025",
            summary: "Apple's latest iPhone 17 introduces a stunning holographic interface and enhanced AI integration, marking a major step toward spatial computing.",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            link: "#",
            category: "Mobile",
            trending: true
        },
        {
            title: "Elon Musk's Neuralink Achieves First Human Memory Upload",
            date: "October 8, 2025",
            summary: "Neuralink successfully transfers short-term memory data into digital storage, opening discussions about human-machine consciousness.",
            image: "images/images (1).jpg",
            link: "#",
            category: "AI & Biotech",
            trending: true
        },
        {
            title: "Samsung Galaxy S25 to Feature Transparent Display",
            date: "October 7, 2025",
            summary: "Samsung teases the Galaxy S25's next-gen transparent OLED display that blends seamlessly with the environment around you.",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
            link: "#",
            category: "Mobile"
        },
        {
            title: "Quantum Internet Launches in Japan",
            date: "October 6, 2025",
            summary: "Japan becomes the first country to roll out a quantum-encrypted internet for public use — making data breaches virtually impossible.",
            image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
            link: "#",
            category: "Internet"
        },
        {
            title: "AI Robots Now Learning Emotions via Facial Feedback",
            date: "October 5, 2025",
            summary: "A new robotics breakthrough allows humanoid bots to interpret emotional context using facial micro-expressions in real time.",
            image: "images/imagesai.jpg",
            link: "#",
            category: "Robotics"
        },{
            title: "Samsung Galaxy S25 to Feature Transparent Display",
            date: "October 7, 2025",
            summary: "Samsung teases the Galaxy S25's next-gen transparent OLED display that blends seamlessly with the environment around you.",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
            link: "#",
            category: "Mobile"
        },{
            title: "Quantum Internet Launches in Japan",
            date: "October 6, 2025",
            summary: "Japan becomes the first country to roll out a quantum-encrypted internet for public use — making data breaches virtually impossible.",
            image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
            link: "#",
            category: "Internet"
        },
    ];

    return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

            {/* News Grid */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {newsData.map((news, idx) => (
                        <article
                            key={idx}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl 
                                     transition-all duration-500 overflow-hidden flex flex-col
                                     border border-transparent hover:border-blue-200
                                     transform hover:-translate-y-2"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                        {news.category}
                                    </span>
                                </div>

                                {/* Trending Badge */}
                                {news.trending && (
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            Trending
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow p-6">
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-3 transition-colors duration-300">
                                    {news.title}
                                </h2>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <Clock className="w-4 h-4" />
                                    <span>{news.date}</span>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                    {news.summary}
                                </p>

                                {/* Read More Button */}
                                <a
                                    href={news.link}
                                    className="mt-auto inline-flex items-center gap-2 text-blue-600 font-semibold text-sm 
                                             group-hover:gap-3 transition-all duration-300"
                                >
                                    Read full story
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}