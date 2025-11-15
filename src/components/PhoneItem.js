export default function PhoneItem({ phone }) {
      const getBadgeColor = (badge) => {
    const colors = {
      'New': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Popular': 'bg-blue-100 text-blue-700 border-blue-200',
      'AI Focus': 'bg-purple-100 text-purple-700 border-purple-200',
      'Performance': 'bg-red-100 text-red-700 border-red-200',
      'Reliable': 'bg-gray-100 text-gray-700 border-gray-200',
      'Value': 'bg-orange-100 text-orange-700 border-orange-200',
      'Budget': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'Unique': 'bg-slate-100 text-slate-700 border-slate-200',
      'Global': 'bg-pink-100 text-pink-700 border-pink-200',
      'Gaming': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Proven': 'bg-green-100 text-green-700 border-green-200',
      'Camera': 'bg-rose-100 text-rose-700 border-rose-200'
    };
    return colors[badge] || 'bg-gray-100 text-gray-700 border-gray-200';
  };
    return (
        <div className="flex flex-col items-center text-center flex-1 relative">
            <img
                src={phone.image}
                alt={phone.name}
                className="w-16 h-16 rounded-xl object-contain drop-shadow-md group-hover:scale-105 transition-transform"
            />

            {/* Optional Badge */}
            {phone.badge && (
                <span
                    className={`absolute -top-2 right-2 px-2 py-0.5 text-xs font-semibold rounded-full border shadow-sm ${getBadgeColor(
                        phone.badge
                    )}`}
                >
                    {phone.badge}
                </span>
            )}

            <span className="font-semibold text-slate-900 mt-3">{phone.name}</span>
            <span className="mt-1 inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 shadow-sm">
                {phone.price}
            </span>
        </div>
    );
}