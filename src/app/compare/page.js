export default function ComparePage() {
  const comingSoon = true; // toggle when ready

  if (comingSoon) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="backdrop-blur-lg rounded-3xl shadow-lg p-8 sm:p-12 w-full max-w-md text-center animate-fadeIn bg-white/0">
          {/* Optional: Replace this with a nicer icon or Lottie animation */}
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-gray-800 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m4-2h.01M12 8v.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900">
            Compare Page
          </h1>
          <p className="text-gray-700 mb-8 text-base sm:text-lg">
            This feature is coming soon! 🚀
          </p>
          <a
            href="/mobiles"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transition"
          >
            Go Back to Mobiles
          </a>
        </div>
      </div>
    );
  }

  return <div>{/* Your actual compare page content here */}</div>;
}
