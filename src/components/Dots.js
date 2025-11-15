export default function Dots({ count, active, onClick }) {
    return (
        <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => onClick(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active
                      ? "bg-blue-600 w-8 h-2.5"
                      : "bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-500 ml-2">
              {active + 1} / {count}
            </span>
          </div>
    );
}