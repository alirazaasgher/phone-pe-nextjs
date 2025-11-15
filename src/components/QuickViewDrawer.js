"use client";
import { useState } from "react";
import { Eye } from "lucide-react";

export default function QuickViewDrawer ({ phone, open, setOpen }) {
  if (!open) return null; // no animation, just render when open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Phone Image */}
        <img
          src={phone.image}
          alt={phone.name}
          className="rounded-lg mb-4 w-full h-52 object-cover"
        />

        {/* Phone Details */}
        <h2 className="text-xl font-bold text-gray-800">{phone.name}</h2>
        <p className="text-blue-600 font-semibold text-2xl mb-4">
          ${phone.price}
        </p>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
          <div className="bg-gray-100 p-2 rounded-lg">🔋 {phone.battery}</div>
          <div className="bg-gray-100 p-2 rounded-lg">📱 {phone.display}</div>
          <div className="bg-gray-100 p-2 rounded-lg">💾 {phone.ram} + {phone.storage}</div>
          <div className="bg-gray-100 p-2 rounded-lg">📸 {phone.camera}</div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-200 rounded-lg py-2 font-medium">
            Add to Compare
          </button>
          <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}