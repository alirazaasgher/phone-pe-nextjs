import { Check, X, Gamepad2, Smartphone, Clock } from "lucide-react";
export default function OverviewTab({ phone, activeTab }) {
    console.log(phone.overview.highlights);
    return (
        <>
            {activeTab === "overview" && (
                    <div className="space-y-10">
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 
                      rounded-3xl shadow-2xl p-10 
                      border border-purple-500/20 
                      backdrop-blur-md overflow-hidden">

        {/* Enhanced Decorative Background Effects */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-purple-400/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl"></div>

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">

          {/* Left - Info */}
          <div>
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight">
              {phone.overview.name}
            </h2>
            <p className="text-xl text-slate-300 mt-4 leading-relaxed">{phone.overview.tagline}</p>

            {/* Enhanced Highlights */}
            <div className="flex flex-wrap gap-3 mt-6">
              {phone.overview.highlights.map((item, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm
                           text-cyan-300 px-5 py-2.5 rounded-full text-sm font-semibold 
                           border border-purple-400/30 shadow-lg
                           hover:shadow-xl hover:scale-105 hover:border-cyan-400/50
                           transition-all duration-300 cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-12 bg-gradient-to-tr from-cyan-500/40 via-purple-500/40 to-pink-500/40 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -inset-6 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-2xl blur-xl"></div>
              <img
                src={phone.overview.image}
                alt={phone.overview.name}
                className="relative z-10 w-64 md:w-80 rounded-2xl shadow-2xl 
                         transition-all duration-700 hover:scale-110 hover:rotate-2
                         border border-purple-400/20"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 relative z-10">
          {/* Pros */}
          <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-sm
                          rounded-2xl p-8 shadow-xl border border-emerald-400/30 
                          hover:shadow-2xl hover:border-emerald-400/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <h3 className="font-bold text-2xl text-emerald-300">Pros</h3>
            </div>
            <ul className="space-y-4">
              {phone.overview.pros.map((item, index) => (
                <li key={index} className="flex items-start text-slate-200 leading-relaxed">
                  <span className="text-emerald-400 mr-3 mt-1 text-lg">●</span> 
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-gradient-to-br from-rose-900/40 to-pink-900/40 backdrop-blur-sm
                          rounded-2xl p-8 shadow-xl border border-rose-400/30 
                          hover:shadow-2xl hover:border-rose-400/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✕</span>
              </div>
              <h3 className="font-bold text-2xl text-rose-300">Cons</h3>
            </div>
            <ul className="space-y-4">
              {phone.overview.cons.map((item, index) => (
                <li key={index} className="flex items-start text-slate-200 leading-relaxed">
                  <span className="text-rose-400 mr-3 mt-1 text-lg">●</span> 
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-12 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full opacity-60"></div>
      </div>
    </div>

            )}

        </>
    )
}