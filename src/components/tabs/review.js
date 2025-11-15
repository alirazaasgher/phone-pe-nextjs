
export default function ReviewTab({ phone, activeTab }) {
  return (
    <>
      {activeTab === "reviews" && (
        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(phone.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-3xl font-bold text-gray-900 ml-2">
                  {phone.rating}
                </span>
                <span className="text-gray-600">/ 5</span>
              </div>
              <p className="text-gray-600 mb-6">
                Based on {phone.reviews_count.toLocaleString()} verified
                reviews
              </p>

              {/* Rating Distribution */}
              <div className="max-w-md mx-auto space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-3">
                    <span className="text-sm w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${Math.random() * 80 + 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12">
                      {Math.floor(Math.random() * 500)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Review */}
            <div className="border-t pt-8">
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">A</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Alex Thompson
                        </p>
                        <p className="text-sm text-gray-500">
                          Verified Purchase • 2 weeks ago
                        </p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      <Star className="fill-current w-5 h-5" />
                      <Star className="fill-current w-5 h-5" />
                      <Star className="fill-current w-5 h-5" />
                      <Star className="fill-current w-5 h-5" />
                      <Star className="fill-current w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "The camera quality on this phone is absolutely incredible.
                    The AI photography features make every shot look
                    professional. Battery easily lasts me through a full day of
                    heavy usage. The S Pen functionality is a game-changer for
                    productivity. Highly recommend!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}