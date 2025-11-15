import { Zap, Cpu, Download, Battery, Monitor,ArrowUp } from "lucide-react";
export default function PerformanceTab({ phone, activeTab }) {
    return (
        <>
            {activeTab === "performance" && (
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 p-8 shadow-2xl">
    {/* Animated performance energy background */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -left-40 w-72 h-72 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-white/5 to-transparent rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
      
      {/* Floating data particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400/70 rounded-full animate-ping"
          style={{
            top: `${15 + i * 12}%`,
            left: `${20 + i * 10}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: '2.2s'
          }}
        ></div>
      ))}
    </div>

    {/* Main Content */}
    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      {/* Phone Performance Mockup */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="relative w-72 h-[580px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3.5rem] p-3 shadow-2xl transform hover:scale-105 transition-all duration-700 hover:shadow-indigo-500/25">
            {/* Screen */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[3rem] relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                {/* Animated CPU Core Rings */}
                <div className="relative mb-10">
                  <div className="w-40 h-40 rounded-full border-4 border-indigo-500/40 flex items-center justify-center animate-spin-slow">
                    <div className="w-28 h-28 rounded-full border-4 border-purple-400/40 flex items-center justify-center animate-pulse">
                      <Cpu className="w-10 h-10 text-yellow-400 animate-bounce" />
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-indigo-400">{phone.specs.processor}</div>
                  <div className="text-lg text-purple-300">{phone.specs.ram} RAM</div>
                  <div className="text-sm text-gray-400">Optimized for gaming & multitasking</div>
                </div>

                {/* Benchmarks quick stats */}
                <div className="absolute bottom-8 left-4 right-4 bg-black/30 backdrop-blur-sm rounded-2xl p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xs text-gray-400">Geekbench</div>
                      <div className="text-sm font-bold text-white">5,250</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">AnTuTu</div>
                      <div className="text-sm font-bold text-white">1.6M</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">FPS</div>
                      <div className="text-sm font-bold text-white">120</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating highlights */}
          <div className="absolute -top-6 -left-6 bg-yellow-500/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg animate-float text-white font-bold text-sm">
            🚀 Flagship Speed
          </div>
          <div className="absolute -bottom-6 -right-6 bg-indigo-500/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg animate-float text-white font-bold text-sm" style={{ animationDelay: '1s' }}>
            🎮 Pro Gaming
          </div>
        </div>
      </div>

      {/* Power Stats Panel */}
      <div className="space-y-6">
        <div>
          <h3 className="text-3xl font-bold text-white mb-2">Blazing Performance</h3>
          <p className="text-indigo-200 text-lg opacity-90">
            Flagship hardware and optimized cooling for next-level speed
          </p>
        </div>

        {/* Dynamic Specs */}
        <div className="grid gap-4">
          {[
            {
              icon: <Cpu className="w-6 h-6" />,
              label: "Processor",
              value: phone.specs.processor,
              subtitle: "Snapdragon / Apple Silicon",
              gradient: "from-yellow-500 to-orange-500",
              pulse: true
            },
            {
              icon: <Zap className="w-6 h-6" />,
              label: "RAM",
              value: phone.specs.ram,
              subtitle: "Fast LPDDR5X Memory",
              gradient: "from-indigo-500 to-purple-500",
              pulse: false
            },
            {
              icon: <Download className="w-6 h-6" />,
              label: "Storage",
              value: phone.specs.storage,
              subtitle: "UFS 4.0 blazing speed",
              gradient: "from-pink-500 to-red-500",
              pulse: false
            },
            {
              icon: <Monitor className="w-6 h-6" />,
              label: "Display",
              value: phone.specs.display,
              subtitle: "120Hz adaptive refresh",
              gradient: "from-blue-500 to-cyan-500",
              pulse: true
            }
          ].map((spec, index) => (
            <div
              key={index}
              className="group flex items-center p-6 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`p-4 bg-gradient-to-r ${spec.gradient} rounded-xl mr-5 group-hover:scale-110 transition-all duration-300 ${spec.pulse ? 'animate-pulse' : ''}`}>
                <div className="text-white">{spec.icon}</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-white mb-1 text-lg">{spec.label}</div>
                <div className="text-indigo-200 font-semibold text-base mb-1">{spec.value}</div>
                <div className="text-indigo-300/70 text-sm">{spec.subtitle}</div>
              </div>
              <ArrowUp className="w-5 h-5 text-white/50 group-hover:text-white/80 group-hover:-translate-y-1 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

        </>
    )
}