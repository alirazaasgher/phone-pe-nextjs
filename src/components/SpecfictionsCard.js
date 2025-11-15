export default function SpecCard({ icon, label, value, subValue }) {
  return (
    //   <div className="flex items-center gap-3 p-1 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
    //   <div className="flex-shrink-0">
    //     {icon}
    //   </div>
    //   <div className="flex-1 min-w-0">
    //     <p className="text-xs text-gray-500 font-medium">{label}</p>
    //     <p className="text-xs text-gray-600 font-semibold truncate">{value}</p>
    //     {subValue && (
    //       <p className="text-xs text-gray-400 mt-0.5">{subValue}</p>
    //     )}
    //   </div>
    // </div>

  <div className="bg-gradient-to-br from-white/80 to-indigo-50/60 backdrop-blur-md rounded-xl p-4 border border-indigo-200 shadow-sm hover:shadow-md transition">
  <div className="flex items-center gap-2 text-indigo-600 mb-1">
    {icon}
    <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
  </div>
  <p className="text-sm font-semibold text-gray-700">{value}</p>
</div>

  );
}