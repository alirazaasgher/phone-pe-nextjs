import Image from "next/image";

export default function Thumbnails({ colors, active, onClick }) {
  return (
    <ul className="flex items-center justify-center gap-1 mt-2 flex-wrap">
      {colors.map((c, i) => {
        const hasImage = !!c.images?.[0]?.url;

        return (
          <li key={i}>
            <button
              onClick={() => hasImage && onClick(i)}
              disabled={!hasImage}
              className={`group flex flex-col items-center focus:outline-none rounded-lg transition-transform duration-300
          ${!hasImage ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div
                className={`relative rounded-lg border-2 overflow-hidden transition-all duration-300 transform
            ${i === active && hasImage
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-400 hover:scale-105"
                  }`}
                style={{ width: "56px", height: "56px" }}
              >
                <div className="flex items-center justify-center w-full h-full p-1">
                  <Image
                    src={
                      c.images?.[0]?.url || "images/default_placeholder.webp"
                    }
                    alt={c.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                    loading="lazy"
                  />
                </div>

                {/* <span className={`absolute bottom-0 left-0 right-0 text-[9px] font-medium 
                                 text-white bg-black/60 text-center py-[1px] opacity-100`}>
                  {c.name}
                </span> */}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
