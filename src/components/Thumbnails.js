export default function Thumbnails({ images, active, onClick,colors }) {
  return (
   <ul className="flex items-center justify-center gap-2 mt-3 flex-wrap">
  {images.map((img, i) => (
    <li key={i}>
      <button
        onClick={() => onClick(i)}
        aria-label={img.name}
        className={`group flex flex-col items-center focus:outline-none transition-all ${
          i === active ? "scale-105" : ""
        }`}
      >
        <div
  className={`relative rounded-lg border-2 overflow-hidden transition-all duration-300 ${
    i === active
      ? "border-blue-500 shadow-md"
      : "border-gray-200 hover:border-gray-400"
  }`}
  style={{ width: "50px", height: "50px" }}
>
  <div className="flex items-center justify-center w-full h-full">
    <img
      src={img.url}
      alt={img.name}
      className="object-contain max-h-[75%] max-w-[75%]"
    />
  </div>
</div>
      </button>
    </li>
  ))}
</ul>




  );
}