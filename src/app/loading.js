export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full min-h-[600px]">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute w-24 h-24 border-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
        <img
          src="/images/loader.gif"
          alt="Loading"
          className="w-12 h-12 z-10"
        />
      </div>
    </div>
  );
}
