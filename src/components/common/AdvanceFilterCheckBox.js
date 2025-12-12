export default function AdvanceFilterCheckBox({
  filter,
  val,
  selectedOptions,
  setSelectedOptions,
}) {
  const toggleOption = (slug, option) => {
    setSelectedOptions((prev) => {
      const prevSelected = prev[slug] || [];
      const newSelected = prevSelected.includes(option)
        ? prevSelected.filter((o) => o !== option)
        : [...prevSelected, option];
      return { ...prev, [slug]: newSelected };
    });
  };

  const isChecked = selectedOptions[filter.slug]?.includes(val.value) || false;

  return (
    <div className="flex items-center justify-between border border-gray-300 p-2 rounded hover:border-gray-400 transition-colors bg-white group cursor-pointer">
      <span className="text-sm font-medium text-gray-900">{val.value}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={() => toggleOption(filter.slug, val.value)}
        />
        <div className="w-8 h-4 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
        <div className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-full"></div>
      </label>
    </div>
  );
}
