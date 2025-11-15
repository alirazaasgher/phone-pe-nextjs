import { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

export default function MultiSelectSearch ({ label, options, placeholder = "Search..." }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const filteredOptions = options.filter(
    (opt) =>
      opt.toLowerCase().includes(search.toLowerCase()) &&
      !selected.includes(opt)
  );

  const toggleSelect = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((s) => s !== option));
    } else {
      setSelected([...selected, option]);
      setSearch("");
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Label */}
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div
        onClick={() => setOpen(!open)}
        className={`flex flex-wrap items-center gap-1 min-h-[44px] w-full border ${
          open ? "border-sky-500 ring-2 ring-sky-200" : "border-gray-200"
        } rounded-xl px-3 py-2 bg-white cursor-text transition-all`}
      >
        {selected.length === 0 && (
          <span className="text-gray-400 text-sm">{placeholder}</span>
        )}

        {/* Selected items */}
        {selected.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1 bg-sky-100 text-sky-700 text-xs font-medium px-2 py-1 rounded-full"
          >
            {item}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSelect(item);
              }}
              className="text-sky-500 hover:text-sky-700"
            >
              <X size={14} />
            </button>
          </span>
        ))}

        {/* Dropdown Icon */}
        <div className="ml-auto text-gray-400">
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      {/* Dropdown List */}
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          <div className="flex items-center px-3 py-2 border-b border-gray-100">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search..."
              className="w-full text-sm outline-none"
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt}
                onClick={() => toggleSelect(opt)}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 cursor-pointer transition-colors"
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400">
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
};