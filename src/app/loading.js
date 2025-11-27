export default function Loader() {
  return (
     <div className="absolute inset-0 flex items-center justify-center z-50">
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Spinner */}
        <div className="absolute w-24 h-24 border-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>

        {/* Logo */}
        <img
          src="/images/loader.gif"
          alt="Logo"
          className="w-12 h-12 z-10"
        />
      </div>
    </div>
  );
}
