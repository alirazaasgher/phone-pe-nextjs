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
    <>
      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon size={18} className="text-gray-600" />}
        <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
          {title}
        </p>
      </div>

      {/* Filter Buttons */}
      <div
        className={`grid ${className} gap-2 max-h-60 overflow-visible max-md:max-h-60 max-md:overflow-y-auto`}
      >
        {filteredContent.length > 0 ? (
          filteredContent.map((item) => {
            const { key, value } = normalize(item);
            const active = selectedValues.includes(value);

            return (
              <button
                key={item.id}
                onClick={() => onSelect(value)}
                className={`group flex items-center gap-2 w-full px-3 py-2 rounded-lg border text-sm transition
                ${
                  active
                    ? "bg-orange-500/10 border-orange-500 text-orange-600 shadow-sm"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  readOnly
                  aria-label={item.value}
                  className="h-3 w-3 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />

                {item?.value?.includes("/") ? (
                  <div className="flex flex-col leading-tight">
                    {item.value.split("/").map((part, i) => (
                      <span key={i} className="text-xs">
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
    </>
  );
};

const normalize = (item) => {
  if (item == null) return { key: Math.random().toString(36), value: "" };
  if (typeof item === "string") return { key: item, value: item };
  return {
    key: item.id ?? item.value ?? JSON.stringify(item),
    value: item.name ?? String(item),
  };
};
export default SideBarCard;
