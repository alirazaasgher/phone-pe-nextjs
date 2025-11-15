import { Battery, Zap, Shield, Check, Smartphone, Wifi, Gamepad2, Clock, ArrowUp, Play, Pause,Monitor } from 'lucide-react';
export default function BatteryTab({ phone, activeTab }) {
    return (
        <>
            {activeTab === "battery" && (
                <div className="space-y-8">
                    {/* Hero Battery Section */}
                   {/* <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 p-8 shadow-2xl">
                        
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-32 -left-40 w-72 h-72 bg-gradient-to-tr from-teal-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>

                           
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-2 h-2 bg-green-400/60 rounded-full animate-ping"
                                    style={{
                                        top: `${20 + i * 15}%`,
                                        left: `${10 + i * 12}%`,
                                        animationDelay: `${i * 0.8}s`,
                                        animationDuration: '2s'
                                    }}
                                ></div>
                            ))}
                        </div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                         
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="relative w-72 h-[580px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3.5rem] p-3 shadow-2xl transform hover:scale-105 transition-all duration-700 hover:shadow-green-500/25">
                                      
                                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[3rem] relative overflow-hidden">
                                           
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                                                
                                                <div className="relative mb-8">
                                                    <div className="w-24 h-40 border-4 border-green-400 rounded-xl bg-gradient-to-t from-green-500/20 to-green-400/10 relative">
                                                       
                                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-400 to-green-300 rounded-lg transition-all duration-2000 animate-pulse"
                                                            style={{ height: '85%' }}></div>
                                                       
                                                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-green-400 rounded-sm"></div>
                                                       
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <Zap className="w-8 h-8 text-white animate-bounce" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-center space-y-2">
                                                    <div className="text-4xl font-bold text-green-400">85%</div>
                                                    <div className="text-lg text-green-300">Charging...</div>
                                                    <div className="text-sm text-gray-400">2 hours remaining</div>
                                                </div>

                                                <div className="absolute bottom-8 left-4 right-4 bg-black/30 backdrop-blur-sm rounded-2xl p-4">
                                                    <div className="grid grid-cols-3 gap-4 text-center">
                                                        <div>
                                                            <div className="text-xs text-gray-400">Screen</div>
                                                            <div className="text-sm font-bold text-white">6h 24m</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-gray-400">Standby</div>
                                                            <div className="text-sm font-bold text-white">18h 45m</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-gray-400">Gaming</div>
                                                            <div className="text-sm font-bold text-white">4h 12m</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute -top-6 -left-6 bg-green-500/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg animate-float text-white font-bold text-sm">
                                        ⚡ Fast Charging
                                    </div>
                                    <div className="absolute -bottom-6 -right-6 bg-blue-500/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg animate-float text-white font-bold text-sm" style={{ animationDelay: '1s' }}>
                                        🔋 All-Day Power
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        Unstoppable Power
                                    </h3>
                                    <p className="text-green-200 text-lg opacity-90">
                                        Experience freedom from the charger with intelligent power management
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    {[
                                        {
                                            icon: <Battery className="w-6 h-6" />,
                                            label: "Battery Capacity",
                                            value: phone.specs.battery,
                                            subtitle: "Premium Li-ion technology",
                                            gradient: "from-green-500 to-emerald-500",
                                            pulse: true
                                        },
                                        {
                                            icon: <Zap className="w-6 h-6" />,
                                            label: "Charging Speed",
                                            value: phone.specs.charging_speed || "Fast Charging",
                                            subtitle: "0-50% in 30 minutes",
                                            gradient: "from-yellow-500 to-orange-500",
                                            pulse: false
                                        },
                                        {
                                            icon: <Shield className="w-6 h-6" />,
                                            label: "Battery Health",
                                            value: "Smart Protection",
                                            subtitle: "1000+ charge cycles",
                                            gradient: "from-blue-500 to-cyan-500",
                                            pulse: false
                                        },
                                        {
                                            icon: <Wifi className="w-6 h-6" />,
                                            label: "Wireless Charging",
                                            value: phone.specs.charging_speed?.includes("Wireless") ? "15W Wireless" : "Available",
                                            subtitle: "Qi-compatible",
                                            gradient: "from-purple-500 to-pink-500",
                                            pulse: true
                                        }
                                    ].map((spec, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center p-6 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-500 cursor-pointer"
                                            style={{ animationDelay: `${index * 0.15}s` }}
                                        >
                                            <div className={`p-4 bg-gradient-to-r ${spec.gradient} rounded-xl mr-5 group-hover:scale-110 transition-all duration-300 ${spec.pulse ? 'animate-pulse' : ''}`}>
                                                <div className="text-white">
                                                    {spec.icon}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-white mb-1 text-lg">{spec.label}</div>
                                                <div className="text-green-200 font-semibold text-base mb-1">{spec.value}</div>
                                                <div className="text-green-300/70 text-sm">{spec.subtitle}</div>
                                            </div>
                                            <ArrowUp className="w-5 h-5 text-white/50 group-hover:text-white/80 group-hover:-translate-y-1 transition-all duration-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div> */}
 
                    {/* Usage Scenarios Cards */}
                    {/* <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Gaming Marathon",
                                hours: "6-8 Hours",
                                description: "Intense gaming with high refresh rate and maximum brightness",
                                icon: <Gamepad2 className="w-8 h-8" />,
                                gradient: "from-red-500 via-pink-500 to-purple-600",
                                bgGradient: "from-red-50 to-pink-50",
                                activities: ["120Hz Gaming", "Max Brightness", "5G Connected", "Bluetooth Audio"]
                            },
                            {
                                title: "Productivity Power",
                                hours: "12-14 Hours",
                                description: "Work, browse, and communicate throughout your entire day",
                                icon: <Smartphone className="w-8 h-8" />,
                                gradient: "from-blue-500 via-cyan-500 to-teal-600",
                                bgGradient: "from-blue-50 to-cyan-50",
                                activities: ["Video Calls", "Document Editing", "Email & Messages", "Light Gaming"]
                            },
                            {
                                title: "Standby Champion",
                                hours: "24+ Hours",
                                description: "Always ready when you need it with intelligent power saving",
                                icon: <Clock className="w-8 h-8" />,
                                gradient: "from-green-500 via-emerald-500 to-teal-600",
                                bgGradient: "from-green-50 to-emerald-50",
                                activities: ["Always-On Display", "Background Sync", "Emergency Ready", "Smart Standby"]
                            }
                        ].map((scenario, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-700 hover:scale-[1.03]"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${scenario.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-700`}></div>

                                <div className="relative z-10 p-8">
                                    <div className="flex items-center mb-6">
                                        <div className={`p-4 bg-gradient-to-r ${scenario.gradient} rounded-2xl mr-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                                            <div className="text-white">
                                                {scenario.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                                                {scenario.title}
                                            </h4>
                                            <div className={`text-2xl font-bold bg-gradient-to-r ${scenario.gradient} bg-clip-text text-transparent`}>
                                                {scenario.hours}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {scenario.description}
                                    </p>

                                    <div className="space-y-3">
                                        {scenario.activities.map((activity, i) => (
                                            <div key={i} className="flex items-center gap-3 group/item hover:bg-gray-50 rounded-lg p-2 transition-all duration-300">
                                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${scenario.gradient} group-hover/item:scale-125 transition-transform duration-300`}></div>
                                                <span className="text-gray-700 font-medium text-sm">{activity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}

                    {/* Interactive Charging Simulation */}
                    <div className="bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=40 height=40 viewBox=0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="%23ffffff" fillOpacity="0.03" d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z opacity-50"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-2">Charging Technology</h3>
                                    <p className="text-gray-300">Advanced power delivery systems</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="p-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl border border-green-500/30 transition-colors text-green-400">
                                        <Play className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-colors text-white">
                                        <Pause className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Charging Speed Comparison */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                {[
                                    {
                                        type: "Wired Charging",
                                        speed: phone.specs.charging_speed?.match(/\d+W/)?.[0] || "45W",
                                        time: "0-50% in 30min",
                                        icon: <Zap className="w-6 h-6" />,
                                        color: "yellow",
                                        percentage: 95
                                    },
                                    {
                                        type: "Wireless Charging",
                                        speed: "15W",
                                        time: "0-50% in 60min",
                                        icon: <Wifi className="w-6 h-6" />,
                                        color: "blue",
                                        percentage: 75
                                    },
                                    {
                                        type: "Reverse Charging",
                                        speed: "5W",
                                        time: "Share your power",
                                        icon: <ArrowUp className="w-6 h-6" />,
                                        color: "purple",
                                        percentage: 45
                                    },{
                                        type: "Reverse Charging",
                                        speed: "5W",
                                        time: "Share your power",
                                        icon: <ArrowUp className="w-6 h-6" />,
                                        color: "purple",
                                        percentage: 45
                                    },{
                                        type: "Reverse Charging",
                                        speed: "5W",
                                        time: "Share your power",
                                        icon: <ArrowUp className="w-6 h-6" />,
                                        color: "purple",
                                        percentage: 45
                                    },{
                                        type: "Reverse Charging",
                                        speed: "5W",
                                        time: "Share your power",
                                        icon: <ArrowUp className="w-6 h-6" />,
                                        color: "purple",
                                        percentage: 45
                                    }
                                ].map((charging, index) => (
                                    <div key={index} className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500">
                                        <div className={`inline-flex p-3 bg-gradient-to-r from-${charging.color}-500 to-${charging.color}-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <div className="text-white">{charging.icon}</div>
                                        </div>

                                        <h4 className="font-bold text-white mb-1">{charging.type}</h4>
                                        <div className="text-2xl font-bold text-green-400 mb-1">{charging.speed}</div>
                                        <p className="text-gray-300 text-sm mb-4">{charging.time}</p>

                                        {/* Speed indicator */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs text-gray-400">
                                                <span>Speed</span>
                                                <span>{charging.percentage}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r from-${charging.color}-500 to-${charging.color}-400 rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                                                    style={{ width: `${charging.percentage}%`, animationDelay: `${index * 0.3}s` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Live Charging Animation */}
                            {/* <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-ping"></div>
                                    Live Charging Simulation
                                </h4>

                                <div className="grid md:grid-cols-5 gap-4 text-center">
                                    {[
                                        { time: "0 min", level: 15, color: "red" },
                                        { time: "15 min", level: 35, color: "orange" },
                                        { time: "30 min", level: 55, color: "yellow" },
                                        { time: "45 min", level: 75, color: "green" },
                                        { time: "60 min", level: 95, color: "emerald" }
                                    ].map((stage, index) => (
                                        <div key={index} className="group cursor-pointer">
                                            <div className="relative mb-3">
                                                <div className="w-16 h-24 mx-auto border-2 border-gray-600 rounded-lg bg-gray-800 relative overflow-hidden">
                                                    <div
                                                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-${stage.color}-500 to-${stage.color}-400 transition-all duration-1000 group-hover:animate-pulse rounded-sm`}
                                                        style={{
                                                            height: `${stage.level}%`,
                                                            animationDelay: `${index * 0.2}s`
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm">
                                                    {stage.level}%
                                                </div>
                                            </div>
                                            <div className="text-white font-semibold text-sm">{stage.time}</div>
                                            <div className="text-gray-400 text-xs">{stage.level}% charged</div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Battery Intelligence Features */}
                    {/* <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/50 rounded-3xl p-8 shadow-xl border border-white/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-200/30 to-transparent rounded-full blur-2xl"></div>

                            <div className="relative z-10">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mr-4">
                                        <Shield className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">AI Battery Care</h4>
                                        <p className="text-gray-600">Intelligent health optimization</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        "Adaptive charging learns your routine",
                                        "Temperature-aware power management",
                                        "Predictive battery health monitoring",
                                        "Smart app background optimization"
                                    ].map((feature, i) => (
                                        <div key={i} className="group flex items-center gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300">
                                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                            <Check className="w-5 h-5 text-green-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 rounded-3xl p-8 shadow-xl border border-white/50 relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-200/30 to-transparent rounded-full blur-2xl"></div>

                            <div className="relative z-10">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mr-4">
                                        <Battery className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">Power Efficiency</h4>
                                        <p className="text-gray-600">Maximum performance per watt</p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {[
                                        { label: "Processor Efficiency", percentage: 92, color: "emerald" },
                                        { label: "Display Optimization", percentage: 88, color: "green" },
                                        { label: "Network Management", percentage: 85, color: "teal" },
                                        { label: "Background Apps", percentage: 95, color: "cyan" }
                                    ].map((metric, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700 font-semibold text-sm">{metric.label}</span>
                                                <span className="text-gray-600 font-bold">{metric.percentage}%</span>
                                            </div>
                                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-full relative overflow-hidden">
                                                    <div
                                                        className={`absolute inset-0 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                                                        style={{
                                                            width: `${metric.percentage}%`,
                                                            animationDelay: `${i * 0.2}s`
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Battery Tips & Tricks */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 border border-gray-200 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
                            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mr-3">
                                <Battery className="w-6 h-6 text-white" />
                            </div>
                            Maximize Your Battery Life
                        </h3>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    tip: "Optimize Display",
                                    description: "Use adaptive brightness and reduce screen timeout",
                                    icon: <Monitor className="w-5 h-5" />,
                                    color: "blue"
                                },
                                {
                                    tip: "Smart Charging",
                                    description: "Enable adaptive charging to protect battery health",
                                    icon: <Zap className="w-5 h-5" />,
                                    color: "yellow"
                                },
                                {
                                    tip: "Background Control",
                                    description: "Limit background app refresh for unused apps",
                                    icon: <Smartphone className="w-5 h-5" />,
                                    color: "purple"
                                },
                                {
                                    tip: "Power Modes",
                                    description: "Switch to power saving mode when needed",
                                    icon: <Shield className="w-5 h-5" />,
                                    color: "green"
                                }
                            ].map((tip, index) => (
                                <div key={index} className="group text-center hover:bg-white rounded-2xl p-6 transition-all duration-500 hover:shadow-xl border border-transparent hover:border-gray-100">
                                    <div className={`inline-flex p-4 bg-gradient-to-r from-${tip.color}-500 to-${tip.color}-600 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                                        <div className="text-white">{tip.icon}</div>
                                    </div>
                                    <h5 className="font-bold text-gray-900 mb-2">{tip.tip}</h5>
                                    <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-12px); }
      }
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `}</style>
                </div>
            )}
        </>
    )
}