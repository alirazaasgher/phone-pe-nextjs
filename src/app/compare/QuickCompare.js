import { useState } from "react";

const QuickCompare = () => {
  const [selectedPhones, setSelectedPhones] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [showDropdown, setShowDropdown] = useState(null);

  // Sample phone data
  const availablePhones = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "$999",
      image: "/images/iphone15.webp",
    },
    {
      id: 2,
      name: "Samsung S24 Ultra",
      price: "$1199",
      image: "/images/s24.webp",
    },
    {
      id: 3,
      name: "Google Pixel 8",
      price: "$699",
      image: "/images/pixel8.webp",
    },
    {
      id: 4,
      name: "OnePlus 12",
      price: "$799",
      image: "/images/oneplus12.webp",
    },
    { id: 5, name: "Xiaomi 14", price: "$649", image: "/images/xiaomi14.webp" },
    {
      id: 6,
      name: "Nothing Phone 2",
      price: "$599",
      image: "/images/nothing2.webp",
    },
  ];

  const handlePhoneSelect = (slotIndex, phone) => {
    const newSelection = [...selectedPhones];
    newSelection[slotIndex] = phone;
    setSelectedPhones(newSelection);
    setShowDropdown(null);
  };

  const removePhone = (slotIndex) => {
    const newSelection = [...selectedPhones];
    newSelection[slotIndex] = null;
    setSelectedPhones(newSelection);
  };

  const getAvailablePhones = () => {
    const selectedIds = selectedPhones
      .filter((phone) => phone)
      .map((phone) => phone.id);
    return availablePhones.filter((phone) => !selectedIds.includes(phone.id));
  };

  const canCompare = selectedPhones.filter((phone) => phone).length >= 2;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">⚡ Quick Compare</h2>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Build Your Own Comparison
          </h3>
          <p className="text-gray-600 text-sm">
            Select up to 4 phones to compare side by side
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {selectedPhones.map((phone, index) => (
            <div key={index} className="relative">
              {phone ? (
                // Selected phone slot
                <div className="bg-white rounded-xl border-2 border-indigo-400 p-4 text-center relative">
                  <button
                    onClick={() => removePhone(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition"
                  >
                    ×
                  </button>
                  <img
                    src={phone.image}
                    className="h-16 object-contain mx-auto mb-2"
                    alt={phone.name}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIGZpbGw9IiM5Q0E3QkYiLz4KPC9zdmc+";
                    }}
                  />
                  <p className="text-xs font-medium">{phone.name}</p>
                  <p className="text-xs text-indigo-600 font-semibold">
                    {phone.price}
                  </p>
                </div>
              ) : (
                // Empty slot
                <div className="relative">
                  <div
                    onClick={() =>
                      setShowDropdown(showDropdown === index ? null : index)
                    }
                    className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                  >
                    <div className="text-gray-400 mb-2">📱</div>
                    <p className="text-sm text-gray-500">
                      Add Phone {index + 1}
                    </p>
                  </div>

                  {/* Dropdown */}
                  {showDropdown === index && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-48 overflow-y-auto">
                      {getAvailablePhones().map((phone) => (
                        <div
                          key={phone.id}
                          onClick={() => handlePhoneSelect(index, phone)}
                          className="p-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                        >
                          <img
                            src={phone.image}
                            className="h-8 w-8 object-contain"
                            alt={phone.name}
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMCAxMEgyMlYyMkgxMFYxMFoiIGZpbGw9IiM5Q0E3QkYiLz4KPC9zdmc+";
                            }}
                          />
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium">{phone.name}</p>
                            <p className="text-xs text-gray-500">
                              {phone.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Click outside to close dropdown */}
        {showDropdown !== null && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setShowDropdown(null)}
          ></div>
        )}

        <div className="text-center">
          <button
            className={`px-8 py-3 rounded-xl shadow-lg font-medium transition ${
              canCompare
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!canCompare}
          >
            {canCompare ? "Start Comparing" : "Select at least 2 phones"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickCompare;
