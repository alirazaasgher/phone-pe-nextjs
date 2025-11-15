import React, { useState } from "react";
export default function Phone3DViewer({ modelPath }) {
   const [index, setIndex] = useState(0);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col items-center">
      <img
        src={images[index]}
        alt="360 view"
        className="h-80 object-contain"
      />
      <div className="flex space-x-4 mt-2">
        <button onClick={prevImage} className="px-3 py-2 bg-gray-200 rounded-full">⬅️</button>
        <button onClick={nextImage} className="px-3 py-2 bg-gray-200 rounded-full">➡️</button>
      </div>
      <p className="mt-2 text-xs text-gray-500">Click arrows or drag to rotate</p>
    </div>
  );
}
