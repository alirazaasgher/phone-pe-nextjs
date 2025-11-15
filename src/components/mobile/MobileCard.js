import Link from 'next/link'
import Image from 'next/image'

export default function MobileCard({ mobile }) {
  const {
    id,
    name,
    brand,
    image,
    price,
    expectedPrice,
    launchDate,
    status, // 'launched', 'upcoming', 'rumored'
    keySpecs,
    rating,
    isNew
  } = mobile

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Image Section */}
      <div className="relative aspect-[3/4] sm:aspect-square">
        <Image
          src={image || '/placeholder-mobile.jpg'}
          alt={`${brand} ${name}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        
        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            status === 'launched' ? 'bg-green-100 text-green-800' :
            status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {status === 'launched' ? 'Available' : 
             status === 'upcoming' ? 'Upcoming' : 'Rumored'}
          </span>
        </div>

        {/* New Badge */}
        {isNew && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded-full">
              New
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 flex space-x-1">
          <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors">
            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors">
            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Brand & Name */}
        <div className="mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide">{brand}</p>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{name}</h3>
        </div>

        {/* Price */}
        <div className="mb-3">
          {price ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">₹{price.toLocaleString()}</span>
              {expectedPrice && expectedPrice !== price && (
                <span className="text-sm text-gray-500 line-through">₹{expectedPrice.toLocaleString()}</span>
              )}
            </div>
          ) : expectedPrice ? (
            <span className="text-lg font-bold text-blue-600">₹{expectedPrice.toLocaleString()}*</span>
          ) : (
            <span className="text-sm text-gray-500">Price not announced</span>
          )}
        </div>

        {/* Key Specs */}
        <div className="mb-3 space-y-1">
          {keySpecs?.slice(0, 3).map((spec, index) => (
            <p key={index} className="text-xs text-gray-600">{spec}</p>
          ))}
        </div>

        {/* Rating & Launch Date */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          {rating && (
            <div className="flex items-center">
              <span className="text-yellow-500">⭐</span>
              <span className="ml-1">{rating}</span>
            </div>
          )}
          {launchDate && (
            <span>{status === 'launched' ? 'Launched' : 'Expected'}: {launchDate}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/mobile/${id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium text-center hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Compare
          </button>
        </div>
      </div>
    </div>
  )
}