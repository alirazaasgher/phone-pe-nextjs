const homepage = {
    "status": "success",
    "data": {
        "topUpcomingFlagship": [
            {
                "id": 101,
                "name": "Galaxy Z Fold 6",
                "brand": "Samsung",
                "releaseDate": "2025-09-15",
                "price": 2499,
                "currency": "USD",
                "image": "/images/xiaomi-16-pro.webp",
                "features": ["Face ID", "Wireless Charging", "5G Ready", "Water Resistant"],
                "specs": {
                    "ram": "12GB",
                    "storage": "512GB",
                    "display": "7.6 inch AMOLED",
                    "camera": "50MP+12MP+10MP"
                }
            },
            {
                "id": 102,
                "name": "iPhone 16 Pro Max",
                "brand": "Apple",
                "releaseDate": "2025-09-20",
                "price": 2199,
                "currency": "USD",
                "image": "https://example.com/images/iphone16promax.jpg",
                "features": ["Face ID", "Wireless Charging", "5G Ready", "Water Resistant"],
                "specs": {
                    "ram": "8GB",
                    "storage": "1TB",
                    "display": "6.7 inch OLED",
                    "camera": "48MP+12MP+12MP"
                }
            },
            {
                "id": 103,
                "name": "Pixel 10 Pro",
                "brand": "Google",
                "releaseDate": "2025-10-01",
                "price": 1399,
                "currency": "USD",
                "image": "https://example.com/images/pixel10pro.jpg",
                "features": ["Face ID", "Wireless Charging", "5G Ready", "Water Resistant"],
                "specs": {
                    "ram": "12GB",
                    "storage": "256GB",
                    "display": "6.9 inch OLED",
                    "camera": "50MP+48MP+12MP"
                }
            },
            {
                "id": 104,
                "name": "OnePlus 13 Pro",
                "brand": "OnePlus",
                "releaseDate": "2025-10-10",
                "price": 1199,
                "currency": "USD",
                "image": "https://example.com/images/oneplus13pro.jpg",
                "features": ["Face ID", "Wireless Charging", "5G Ready", "Water Resistant"],
                "specs": {
                    "ram": "12GB",
                    "storage": "512GB",
                    "display": "6.8 inch AMOLED",
                    "camera": "48MP+50MP+8MP"
                }
            }
        ],
        "topNewMobiles": [
            {
                id: 1,
                brand: "Apple",
                model: "iPhone 15 Pro",
                price: 1192,
                release_date: "2023-09-20",
                image_url: "/images/apple-iphone-16-pro-max-1.jpg",
                slug: "apple-iphone-15-pro-max",
                tags: ["5G", "Dimensity 9400 Plus", "6.7 AMOLED", "48MP", "5000 mAh"],
                "features": ["Face ID", "Wireless Charging", "5G Ready", "Water Resistant"],
                storage: "256gb",
                ram: "12GB",
                is_new: true,
                display_buttons: true,
                colors: ["red", "green", "black"],
                specs: {
                    display: "6.1-inch OLED",
                    chip: "A17 Bionic",
                    camera: "48MP Triple",
                    battery: "3200mAh",
                    charging_speed: "55W",
                },
            },
            {
    id: 2,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 1399,
    release_date: "2024-01-10",
    image_url: "/images/1.webp",
    tags:["5G","Snapdragon","6.7 AMOLED","48MP","5000 mAh"],
    storage:"256gb",
    ram:"12GB",
    display_buttons:true,
    colors : ["red","green","black"],
    is_upcoming:true,
    "features": ["Face ID", "Wireless Charging", "5G Ready", "Water Resistant"],
    specs: {
      display: "6.8-inch AMOLED",
      chip: "Snapdragon 8 Gen 3",
      camera: "200MP Quad",
      battery: "5000mAh",
      charging_speed:"55W"
    },
  },
            {
    id: 3,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 1399,
    release_date: "2024-01-10",
    image_url: "/images/2.webp",
    tags:["5G","Snapdragon","6.7 AMOLED","48MP","5000 mAh"],
    "features": ["Face ID", "Wireless Charging", "5G Ready", "Water Resistant"],
    storage:"256gb",
    ram:"12GB",
    colors : ["red","green","black"],
    is_popular:true,
    display_buttons:true,
    specs: {
      display: "6.8-inch AMOLED",
      chip: "Snapdragon 8 Gen 3",
      camera: "200MP Quad",
      battery: "5000mAh",
      charging_speed:"55W"
    },
  },
           {
    id: 4,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 1399,
    is_upcoming: true,
    release_date: "2024-01-10",
    image_url: "/images/3.webp",
    tags:["5G","Snapdragon","6.7 AMOLED","48MP","5000 mAh"],
    "features": ["Face ID", "Wireless Charging", "5G Ready", "Water Resistant"],
    storage:"256gb",
    ram:"12GB",
    colors : ["red","green","black"],
    display_buttons:true,
    specs: {
      display: "6.8-inch AMOLED",
      chip: "Snapdragon 8 Gen 3",
      camera: "200MP Quad",
      battery: "5000mAh",
      charging_speed:"55W"
    },
  },
             {
    id: 5,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 20000,
    release_date: "2024-01-10",
    image_url: "/images/4.webp",
    tags:["5G","Snapdragon","6.7 AMOLED","48MP","5000 mAh"],
    storage:"256gb",
    ram:"12GB",
    display_buttons:true,
    colors : ["red","green","black"],
    specs: {
      display: "6.8-inch AMOLED",
      chip: "Snapdragon 8 Gen 3",
      camera: "200MP Quad",
      battery: "5000mAh",
      charging_speed:"55W"
    },
  },
             {
    id: 6,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 20000,
    release_date: "2024-01-10",
    image_url: "/images/samsung-galaxy-s24-ultra-5g-sm-s928-2.jpg",
    tags:["5G","Snapdragon","6.7 AMOLED","48MP","5000 mAh"],
    storage:"256gb",
    ram:"12GB",
    display_buttons:true,
    colors : ["red","green","black"],
    specs: {
      display: "6.8-inch AMOLED",
      chip: "Snapdragon 8 Gen 3",
      camera: "200MP Quad",
      battery: "5000mAh",
      charging_speed:"55W"
    },
  },
           {
    id: 7,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 20000,
    release_date: "2024-01-10",
    image_url: "/images/samsung-galaxy-s24-ultra-5g-sm-s928-2.jpg",
     tags:["5G","Snapdragon","6.7 AMOLED","48MP","5000 mAh"],
    storage:"256gb",
    ram:"12GB",
    colors : ["red","green","black"],
    display_buttons:true,
    specs: {
      display: "6.8-inch AMOLED",
      chip: "Snapdragon 8 Gen 3",
      camera: "200MP Quad",
      battery: "5000mAh",
      charging_speed:"55W"
    },
  },
            {
    id: 8,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 20000,
    release_date: "2024-01-10",
    image_url: "/images/samsung-galaxy-s24-ultra-5g-sm-s928-2.jpg",
     tags:["5G","Snapdragon","6.7 AMOLED","48MP","5000 mAh"],
    storage:"256gb",
    ram:"12GB",
    colors : ["red","green","black"],
    display_buttons:true,
    specs: {
      display: "6.8-inch AMOLED",
      chip: "Snapdragon 8 Gen 3",
      camera: "200MP Quad",
      battery: "5000mAh",
      charging_speed:"55W"
    },
  }
//   , {
//     id: 9,
//     brand: "Samsung",
//     model: "Galaxy S24 Ultra",
//     price: 10000,
//     is_upcoming: true,
//     release_date: "2024-01-10",
//     image_url: "/images/samsung-galaxy-s24-ultra-5g-sm-s928-2.jpg",
//      tags:["5G","Snapdragon","6.7 AMOLED","48MP","5000 mAh"],
//     storage:"256gb",
//     ram:"12GB",
//     colors : ["red","green","black"],
//     display_buttons:true,
//     specs: {
//       display: "6.8-inch AMOLED",
//       chip: "Snapdragon 8 Gen 3",
//       camera: "200MP Quad",
//       battery: "5000mAh",
//       charging_speed:"55W"
//     },
//   }
        ],
        "upcomingMobiles": [
            {
                "id": 301,
                "name": "Moto G Power 2025",
                "brand": "Motorola",
                "releaseDate": "2025-09-05",
                "price": 249,
                "currency": "USD",
                "image": "https://example.com/images/motogpower2025.jpg"
            },
            {
                "id": 302,
                "name": "Nokia X30",
                "brand": "Nokia",
                "releaseDate": "2025-09-12",
                "price": 349,
                "currency": "USD",
                "image": "https://example.com/images/nokia-x30.jpg"
            },
            {
                "id": 303,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            }
        ],
        "popularMobiles": [
            {
                "id": 301,
                "name": "Moto G Power 2025",
                "brand": "Motorola",
                "releaseDate": "2025-09-05",
                "price": 249,
                "currency": "USD",
                "image": "https://example.com/images/motogpower2025.jpg"
            },
            {
                "id": 302,
                "name": "Nokia X30",
                "brand": "Nokia",
                "releaseDate": "2025-09-12",
                "price": 349,
                "currency": "USD",
                "image": "https://example.com/images/nokia-x30.jpg"
            },
            {
                "id": 303,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            }
        ],
        "rangeUnedr25000": [
            {
                "id": 301,
                "name": "Moto G Power 2025",
                "brand": "Motorola",
                "releaseDate": "2025-09-05",
                "price": 249,
                "currency": "USD",
                "image": "https://example.com/images/motogpower2025.jpg"
            },
            {
                "id": 302,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            },
            {
                "id": 303,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            }
        ],
        "rangeUnedr25000To40000": [
            {
                "id": 301,
                "name": "Moto G Power 2025",
                "brand": "Motorola",
                "releaseDate": "2025-09-05",
                "price": 249,
                "currency": "USD",
                "image": "https://example.com/images/motogpower2025.jpg"
            },
            {
                "id": 302,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            },
            {
                "id": 303,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            }
        ]
        ,
        "rangeUnedr40000To60000": [
            {
                "id": 301,
                "name": "Moto G Power 2025",
                "brand": "Motorola",
                "releaseDate": "2025-09-05",
                "price": 249,
                "currency": "USD",
                "image": "https://example.com/images/motogpower2025.jpg"
            },
            {
                "id": 302,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            },
            {
                "id": 303,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            }
        ],
        "rangeUnedr60000AndMore": [
            {
                "id": 301,
                "name": "Moto G Power 2025",
                "brand": "Motorola",
                "releaseDate": "2025-09-05",
                "price": 249,
                "currency": "USD",
                "image": "https://example.com/images/motogpower2025.jpg"
            },
            {
                "id": 302,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            },
            {
                "id": 303,
                "name": "Realme 12 Pro",
                "brand": "Realme",
                "releaseDate": "2025-09-20",
                "price": 299,
                "currency": "USD",
                "image": "https://example.com/images/realme12pro.jpg"
            }
        ]
    }
}
export default homepage;
