import { motion } from "framer-motion";
export default function ColorSelector({ selectedColor}) {
  console.log(selectedColor)
  return (
    <div className="flex items-center justify-center mt-2">
      <div className="px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm">
    <span className="text-xs font-medium text-gray-600">Selected Color: </span>
    <span className="text-xs font-bold text-gray-900">{selectedColor}</span>
  </div>
      {/* <div className="flex justify-center gap-3 mt-2 sm:mt-2">
        {colors.map((color) => {
          const isActive = selectedColor === color.name;
          return (
            <button
              key={color.name}
              onClick={() => onSelect(color.name)}
              style={{ backgroundColor: color.hex }}
              className={`group relative w-4 h-4 rounded-full transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-blue-500 ring-offset-2 scale-110"
                  : "ring-2 ring-gray-200 hover:ring-gray-300 hover:scale-105"
              }`}
              aria-label={`Select ${color.name}`}
            >
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                </motion.div>
              )}
            </button>
          );
        })}
      </div> */}
    </div>
  );
}
