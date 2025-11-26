export default function Thumbnails({ colors, active, onClick }) {
  return (
    <ul className="flex items-center justify-center gap-1 mt-2 flex-wrap">
      {colors.map((c, i) => (
        <li key={i}>
          <button
            onClick={() => onClick(i)}
            className="group flex flex-col items-center focus:outline-none rounded-lg transition-transform duration-300"
          >
            <div
              className={`relative rounded-lg border-2 overflow-hidden transition-all duration-300 transform
                ${
                  i === active
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-400 hover:scale-105"
                }`}
              style={{ width: "56px", height: "56px" }}
            >
              <div className="flex items-center justify-center w-full h-full p-1">
                <img
                  src={c.images?.[0]?.url || "/placeholder.jpg"} // always safe
                  alt={c.name}
                  className="object-contain max-h-full max-w-full"
                />
              </div>

              <span className="absolute bottom-0 left-0 right-0 text-[10px] font-medium text-white bg-black/60 text-center py-[1px] opacity-100">
                {c.name}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
