"use client";
import {TrendingUp,Home,Layers,GitCompare, DollarSign, Sparkles, Wifi,Smartphone } from "lucide-react";
export default function MobileHeader(){
    return (
        <>
        <div className="sm:hidden sticky top-0 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
          <nav className="flex justify-around py-2">
            {[
                { href: "/", label: "Home" ,icon: Home},
                { href: "/mobiles", label: "Mobiles" , icon: Smartphone },
                { href: "/brands", label: "Brands", icon: Layers },
                { href: "/compare", label: "Compare", icon: GitCompare },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
              >
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </div>
        {/* <div className="sm:hidden p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Explore Phones</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>
        
          <div className="grid grid-cols-2 gap-3">
            {[
              { 
                icon: TrendingUp, 
                label: 'Trending Phones', 
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50'
              },
              { 
                icon: DollarSign, 
                label: 'Budget Phones', 
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50'
              },
              { 
                icon: Sparkles, 
                label: 'Flagship Phones', 
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50'
              },
              { 
                icon: Wifi, 
                label: '5G Phones', 
                gradient: 'from-indigo-500 to-violet-500',
                bgGradient: 'from-indigo-50 to-violet-50'
              }
            ].map((item, index) => (
              <a 
                key={index}
                className="group relative flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
               
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
              
                <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                
                
                <p className="relative z-10 text-sm font-semibold text-gray-800 text-center group-hover:text-gray-900 transition-colors">
                  {item.label}
                </p>
                
                
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div> */}
        </>
    )
}