import { useState, useMemo } from "react";

const SideBarCard = ({
  sideBarContent = [],
  className = "",
  title = "",
  icon: Icon,
  addContent = false,
  onSelect,
  selectedValues = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on search term
  const filteredContent = useMemo(() => {
    if (!searchTerm.trim()) return sideBarContent;
    return sideBarContent.filter((item) =>
      item.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sideBarContent]);

  return (
    <div className="pb-4">
  {/* Title */}
  <div className="flex items-center gap-2 mb-3">
    {Icon && <Icon size={18} className="text-gray-600" />}
    <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
      {title}
    </p>
  </div>

  {/* Filter Buttons */}
  <div className={`grid ${className} gap-2 max-h-60 overflow-y-auto overflow-x-hidden pr-1`}>
    {filteredContent.length > 0 ? (
      filteredContent.map((item) => {
        const { key, value } = normalize(item);
        const active = selectedValues.includes(value);

        return (
          <button
            key={item.id}
            onClick={() => onSelect(value)}
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-xl border transition-all duration-150
              ${
                active
                  ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white border-orange-600 shadow-md"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
              }`}
          >
            {item?.value?.includes("/") ? (
              <div className="flex flex-col items-center text-center leading-tight">
                {item.value.split("/").map((part, i) => (
                  <span
                    key={i}
                    className={`text-xs ${active ? "text-white" : "text-gray-600"}`}
                  >
                    {part}
                  </span>
                ))}
              </div>
            ) : (
              <span className="truncate">{item.value}</span>
            )}
          </button>
        );
      })
    ) : (
      <p className="text-sm text-gray-400 italic text-center py-4 col-span-full">
        No results found
      </p>
    )}
  </div>

  {/* View All Brands Link */}
  {addContent && (
    <div className="flex justify-center mt-4">
        <a
        href="/brands"
        className="text-orange-600 font-medium text-sm hover:underline hover:text-orange-700 transition"
      >
        View All Brands
      </a>
    </div>
  )}
</div>
  );
};

const normalize = (item) => {
    if (item == null) return { key: Math.random().toString(36), value: "" };
    if (typeof item === "string") return { key: item, value: item };
    return { key: item.id ?? item.value ?? JSON.stringify(item), value: item.name ?? String(item) };
};
export default SideBarCard;