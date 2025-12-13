export default function ColorSelector({ selectedColor }) {
  return (
    <div className="flex items-center justify-center mt-2">
      <div className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded border border-gray-300 shadow-md hover:shadow-lg transition-all flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-gray-900"></span>
        <span className="text-xs font-medium text-gray-500">Color: </span>
        <span className="text-xs font-bold text-gray-900">{selectedColor}</span>
      </div>
    </div>
  );
}
