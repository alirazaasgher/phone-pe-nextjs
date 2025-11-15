// src/components/SkeletonCard.js
const SkeletonCard = () => (
  <div className="bg-gray-200 rounded-2xl shadow-lg p-4 animate-pulse h-80">
    <div className="bg-gray-300 w-full h-32 rounded-lg mb-4"></div>
    <div className="bg-gray-300 h-6 rounded-md w-3/4 mb-2"></div>
    <div className="bg-gray-300 h-4 rounded-md w-1/2 mb-4"></div>
    <div className="bg-gray-300 h-8 rounded-full w-full"></div>
  </div>
);

export default SkeletonCard;