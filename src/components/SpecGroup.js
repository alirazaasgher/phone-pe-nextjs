import { useState, useMemo } from "react";
import {
  Shield,
  Smartphone,
  Camera,
  Cpu,
  Battery,
  Info,
  Wifi,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
export default function SpecGroup({
  title,
  specs,
  isExpandable = false,
  max_visible,
  searchQuery,
}) {
  const [parentOpen, setParentOpen] = useState(max_visible ? true : false);
  const [isOpen, setIsOpen] = useState(false);

  // Memoize entries to prevent re-renders
  const entries = useMemo(() => Object.entries(specs || {}), [specs]);

  const hasMore = max_visible ? entries.length > max_visible : false;
  // Category icons
  const icons = {
    display: Smartphone,
    performance: Cpu,
    battery: Battery,
    main_camera: Camera,
    selfie_camera: Camera,
    network: Wifi,
    security: Shield,
  };

  const Icon = icons[title.toLowerCase()] || Info;

  // Text utilities
  const formatText = (text = "") =>
    typeof text === "string"
      ? text.charAt(0).toUpperCase() + text.slice(1).replaceAll("_", " ")
      : "";

  const highlightText = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span
          key={i}
          className="bg-sky-100 text-sky-800 font-semibold px-0.5 rounded-sm"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Collapsed parent view — only show first row
  if (!parentOpen) {
    const [firstLabel, firstValue] = entries[0] || ["", ""];
    return (
      <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-sky-200">
        <table className="table-fixed w-full border-collapse">
          <tbody>
            <tr className="hover:bg-gray-50 border-b border-gray-100 relative">
              <th className="font-poppins w-28 sm:w-36 text-left px-2 py-2 font-medium text-gray-900 text-[12px] lg:text-[16px] bg-gray-100/70 border-r border-gray-100">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-sky-600" />
                  <span className="font-poppins font-medium text-gray-1000 text-[12px]">
                    {formatText(title)}
                  </span>
                </div>
              </th>

              {firstLabel && (
                <>
                  <td className="w-[12%]  sm:w-[15%] lg:px-5 lg:py-0.5 font-medium text-gray-800 text-[12px] font-inter overflow-hidden whitespace-nowrap text-ellipsis">
                    {highlightText(formatText(firstLabel))}
                  </td>
                  <td className="w-[42%] sm:w-[55%] px-1 py-1 lg:px-1 lg:py-0.5">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: highlightText(firstValue),
                      }}
                      className="prose-content font-medium text-gray-800 text-[12px] font-sans
               overflow-hidden whitespace-nowrap text-ellipsis"
                    />
                  </td>
                </>
              )}

              {isExpandable && (
                <td
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={() => setParentOpen(true)}
                >
                  <ChevronDown className="w-4 h-4 text-gray-500 hover:text-sky-600" />
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Expanded parent view
  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-sky-200 transition-all overflow-hidden">
      <div className="px-2 py-2">
        {/* Category Header with collapse/expand icon */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={isExpandable ? () => setParentOpen(false) : undefined}
        >
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-sky-600" />
            <span className="font-heading font-medium text-blue-600 text-[15px] lg:text-[15px]">
              {formatText(title).toUpperCase()}
            </span>
          </div>
          {isExpandable ? (
            <ChevronUp className="w-4 h-4 text-gray-500 hover:text-sky-600" />
          ) : null}
        </div>

        {/* Only render table if parent is open */}
        <div className="w-full">
          <table className="min-w-full border-collapse text-sm">
            <tbody>
              {(max_visible ? entries.slice(0, max_visible) : entries).map(
                ([label, value], i) => {
                  let showSubExpand =
                    max_visible > 0 &&
                    i === max_visible - 1 &&
                    hasMore === true;
                  return (
                    <tr
                      key={i}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-all relative"
                    >
                      <td className="w-[22%] pr-4 lg:px-5 lg:py-0.5 font-medium text-gray-900 text-[12px] sm:text-[13px] font-inter whitespace-normal break-words">
                        {highlightText(formatText(label))}
                      </td>

                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(value),
                        }}
                        className="prose-content w-[70%] pl-4 px-1 py-1 lg:px-1 lg:py-0.5 text-gray-700 text-[12px] sm:text-[13px] font-sans whitespace-normal break-words"
                      ></td>

                      {/* Sub-expand icon */}
                      {showSubExpand && (
                        <td
                          className="absolute right-3 top-2 cursor-pointer"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-500 hover:text-sky-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500 hover:text-sky-600" />
                          )}
                        </td>
                      )}
                    </tr>
                  );
                }
              )}

              {/* Hidden / expandable rows */}
              {isOpen &&
                entries.slice(max_visible).map(([label, value], i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                  >
                    <td className="w-[22%] pr-4 lg:px-5 lg:py-0.5 font-medium text-gray-800 text-[12px] font-inter whitespace-normal break-words">
                      {highlightText(formatText(label))}
                    </td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: highlightText(value),
                      }}
                      className="prose-content w-[70%] pl-4 px-1 py-1 lg:px-1 lg:py-0.5 text-gray-700 text-[12px] font-sans whitespace-normal break-words"
                    ></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
