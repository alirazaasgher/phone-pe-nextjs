import { Monitor, Zap, Shield, ArrowRight, Sparkles, Eye, Play, Pause, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DisplayTab({ phone, activeTab }) {
  return (
    <>
      {activeTab === "display" && (
        <div className="space-y-8">
          {/* Hero Display Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-8 shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-32 -left-40 w-72 h-72 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Phone Mockup */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Phone Frame */}
                  <div className="relative w-64 h-[520px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl transform hover:scale-105 transition-all duration-700 hover:shadow-cyan-500/25">
                    {/* Screen */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-[2.5rem] relative overflow-hidden">
                      {/* Screen Content Animation */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/90 via-blue-500/90 to-purple-600/90 animate-pulse"></div>
                      <div className="absolute inset-4 bg-black/20 rounded-[2rem] flex items-center justify-center">
                        <div className="text-white/90 text-center">
                          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                            <Monitor className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-lg font-bold mb-2">Premium Display</div>
                          <div className="text-sm opacity-80">
                            {phone.specs.display.includes("120Hz") ? "120Hz" : "High Refresh"}
                          </div>
                        </div>
                      </div>

                      {/* Floating UI elements */}
                      <div className="absolute top-6 left-6 w-3 h-3 bg-white/60 rounded-full animate-ping"></div>
                      <div className="absolute top-6 right-6 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white/40 rounded-full"></div>
                    </div>

                    {/* Screen reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-[3rem] pointer-events-none"></div>
                  </div>

                  {/* Floating specs around phone */}
                  <div className="absolute -top-4 -left-8 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-white/50 animate-float">
                    <div className="text-xs font-semibold text-cyan-600">AMOLED</div>
                  </div>
                  <div className="absolute -bottom-4 -right-8 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-white/50 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="text-xs font-semibold text-purple-600">HDR10+</div>
                  </div>
                  <div className="absolute top-1/2 -right-12 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-white/50 animate-float" style={{ animationDelay: '2s' }}>
                    <div className="text-xs font-semibold text-green-600">120Hz</div>
                  </div>
                </div>
              </div>

              {/* Interactive Specs Panel */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Next-Level Visual Experience
                  </h3>
                  <p className="text-cyan-200 text-lg opacity-90">
                    Immerse yourself in stunning clarity and fluid motion
                  </p>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      icon: <Monitor className="w-6 h-6" />,
                      label: "Display Type",
                      value: phone.specs.display.split(",")[0],
                      gradient: "from-blue-500 to-cyan-500"
                    },
                    {
                      icon: <Zap className="w-6 h-6" />,
                      label: "Refresh Rate",
                      value: phone.specs.display.includes("120Hz") ? "120Hz Adaptive" :
                        phone.specs.display.includes("90Hz") ? "90Hz Smooth" : "60Hz Standard",
                      gradient: "from-yellow-500 to-orange-500"
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      label: "Protection",
                      value: phone.specs.display.includes("Gorilla") ?
                        phone.specs.display.match(/Gorilla Glass \w+/)?.[0] || "Gorilla Glass Victus" :
                        "Advanced Protection",
                      gradient: "from-green-500 to-emerald-500"
                    },
                    {
                      icon: <ArrowRight className="w-6 h-6" />,
                      label: "Resolution",
                      value: phone.specs.display.includes("QHD") ? "QHD+ (3200×1440)" :
                        phone.specs.display.includes("FHD") ? "FHD+ (2400×1080)" :
                          phone.specs.display.includes("1080") ? "FHD+ (2400×1080)" : "HD+ Enhanced",
                      gradient: "from-purple-500 to-pink-500"
                    }
                  ].map((spec, index) => (
                    <div
                      key={index}
                      className="group flex items-center p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`p-3 bg-gradient-to-r ${spec.gradient} rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {spec.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white/90 mb-1">{spec.label}</div>
                        <div className="text-cyan-200 font-medium">{spec.value}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Visual Excellence",
                description: "Experience true-to-life colors with 100% DCI-P3 coverage",
                icon: <Sparkles className="w-8 h-8" />,
                gradient: "from-pink-500 via-purple-500 to-indigo-500",
                features: ["Billion+ Colors", "HDR10+ Certified", "Cinema-grade accuracy"]
              },
              {
                title: "Smooth Performance",
                description: "Adaptive refresh rate technology for optimal battery life",
                icon: <Zap className="w-8 h-8" />,
                gradient: "from-yellow-400 via-orange-500 to-red-500",
                features: ["120Hz Gaming", "1-120Hz Adaptive", "Touch Responsive"]
              },
              {
                title: "Eye Comfort",
                description: "Advanced blue light filtering and flicker-free technology",
                icon: <Eye className="w-8 h-8" />,
                gradient: "from-green-400 via-teal-500 to-cyan-500",
                features: ["Blue Light Filter", "DC Dimming", "Always-On Display"]
              }
            ].map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative p-6">
                  <div className={`inline-flex p-3 bg-gradient-to-r ${card.gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {card.icon}
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="space-y-2">
                    {card.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient}`}></div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-url('data:image/svg+xml,%3Csvg width=60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="none" fillRule="evenodd" fillOpacity="0.05" cx="30" cy="30" r="1"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Technical Specifications</h3>
                  <p className="text-gray-300">Deep dive into the display technology</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Play className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    metric: phone.specs.display.includes("6.8") ? "6.8″" :
                      phone.specs.display.includes("6.7") ? "6.7″" :
                        phone.specs.display.includes("6.6") ? "6.6″" : "6.5″+",
                    label: "Screen Size",
                    subtext: "Edge-to-edge",
                    color: "text-cyan-400",
                    bg: "bg-cyan-500/20"
                  },
                  {
                    metric: phone.specs.display.includes("QHD") ? "3200×1440" :
                      phone.specs.display.includes("FHD") ? "2400×1080" : "2340×1080",
                    label: "Resolution",
                    subtext: "Ultra Sharp",
                    color: "text-purple-400",
                    bg: "bg-purple-500/20"
                  },
                  {
                    metric: phone.specs.display.includes("120Hz") ? "120Hz" :
                      phone.specs.display.includes("90Hz") ? "90Hz" : "60Hz",
                    label: "Refresh Rate",
                    subtext: "Adaptive",
                    color: "text-yellow-400",
                    bg: "bg-yellow-500/20"
                  },
                  {
                    metric: "1750+",
                    label: "Peak Brightness",
                    subtext: "Nits",
                    color: "text-green-400",
                    bg: "bg-green-500/20"
                  }
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-500"
                  >
                    <div className={`absolute inset-0 ${spec.bg} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      <div className={`text-3xl font-bold ${spec.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                        {spec.metric}
                      </div>
                      <div className="text-white font-semibold mb-1">{spec.label}</div>
                      <div className="text-gray-400 text-sm">{spec.subtext}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Cards with Animations */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Color Science Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-700">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200/50 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mr-4 group-hover:rotate-12 transition-transform duration-500">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Color Science</h4>
                    <p className="text-gray-600">Professional-grade accuracy</p>
                  </div>
                </div>

                {/* Color spectrum visualization */}
                <div className="mb-6">
                  <div className="h-4 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 to-purple-500 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-500"></div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>sRGB</span>
                    <span>DCI-P3</span>
                    <span>Rec.2020</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {["100% DCI-P3 Wide Color Gamut", "Delta E < 1 Color Accuracy", "True 10-bit Color Depth"].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 group/item hover:bg-gray-50 rounded-lg p-2 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full group-hover/item:scale-150 transition-transform"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-700">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-200/50 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mr-4 group-hover:rotate-12 transition-transform duration-500">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Fluid Motion</h4>
                    <p className="text-gray-600">Silky smooth interactions</p>
                  </div>
                </div>

                {/* Performance bars */}
                <div className="space-y-4 mb-6">
                  {[
                    { label: "Touch Response", percentage: 95, color: "bg-cyan-500" },
                    { label: "Gaming Performance", percentage: phone.specs.display.includes("120Hz") ? 98 : 85, color: "bg-blue-500" },
                    { label: "Scrolling Fluidity", percentage: 100, color: "bg-purple-500" }
                  ].map((bar, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{bar.label}</span>
                        <span className="text-gray-600">{bar.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${bar.color} rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                          style={{ width: `${bar.percentage}%`, animationDelay: `${i * 0.2}s` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Pro Tip:</span> Higher refresh rates make scrolling and animations incredibly smooth
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features Timeline */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Advanced Display Technologies</h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>

              <div className="space-y-12">
                {[
                  {
                    title: "Adaptive Brightness",
                    description: "AI-powered brightness adjustment based on ambient light and content",
                    side: "left",
                    icon: <Eye className="w-6 h-6" />,
                    color: "cyan"
                  },
                  {
                    title: "Variable Refresh Rate",
                    description: "Intelligent switching between 1Hz-120Hz for optimal battery life",
                    side: "right",
                    icon: <Zap className="w-6 h-6" />,
                    color: "purple"
                  },
                  {
                    title: "Always-On Display",
                    description: "Glanceable information with ultra-low power consumption",
                    side: "left",
                    icon: <Monitor className="w-6 h-6" />,
                    color: "pink"
                  }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center ${item.side === 'right' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-1/2 ${item.side === 'right' ? 'pl-8' : 'pr-8'}`}>
                      <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-500">
                        <div className="flex items-center mb-3">
                          <div className={`p-2 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300`}>
                            <div className="text-white">{item.icon}</div>
                          </div>
                          <h5 className="font-bold text-gray-900">{item.title}</h5>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className={`w-4 h-4 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full border-4 border-white shadow-lg z-10 relative`}>
                      <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full animate-ping`}></div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    `}</style>
        </div>

      )
      }
    </>
  )
}