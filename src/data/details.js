const phoneDetails = {
    name: "Samsung Galaxy S24 Ultra",
    tagline: "The ultimate Android flagship with AI-powered performance",
    image: "/images/1.webp",
    colors: [
        { name: "Nebula Black", hex: "#282F38", price: 2999 },
        { name: "Aurora White", hex: "#efefef", price: 32999 },
        { name: "Moon Titanium", hex: "#c3c0b8", price: 4999 },
        { name: "Tundra Green", hex: "#d1e7c4", price: 1199 },
    ],
    color_images: {
        nebula_black: ["/images/1.webp", "/images/2.webp", "/images/3.webp"],
        aurora_white: ["/images/2.webp", "/images/4.webp"],
        moon_titanium: ["/images/3.webp"],
        tundra_green: ["/images/4.webp"]
    },
    storage_options: [
        { size: "256GB", price: 1199 },
        { size: "512GB", price: 1299 },
        { size: "1TB", price: 1499 },
    ],
    specs: {
        network: {
            "technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
            "2G_bands": "GSM 850 / 900 / 1800 / 1900",
            "3G_bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
            "4G_bands": "LTE (various, worldwide)",
            "5G_bands": "Sub-6GHz & mmWave",
            "speed": "HSPA, LTE-A, 5G",
        },
        body: {
            "dimensions": "162.3 79  8.6 mm",
            "weight": "232 g",
            "materials": "Titanium frame, Gorilla Glass Armor front/back",
            "sim": "Nano-SIM + eSIM (dual SIM support)",
            "ip_rating": "IP68 water/dust resistant (1.5m for 30 min)",
            "stylus": "S Pen with 2.8ms latency, Bluetooth LE"
        },
        display: {
            "type": "Dynamic AMOLED 2X",
            "size": "6.8 inches",
            "resolution": "QHD+ (1440 × 3120), 505 ppi",
            "refresh_rate": "Adaptive 1–120Hz (LTPO)",
            "brightness": "2600 nits peak",
            "hdr": "HDR10+ certified, Dolby Vision support",
            "protection": "Corning Gorilla Glass Armor"
        },
        platform: {
            "os": "Android 14, One UI 6.1",
            "chipset": "Qualcomm Snapdragon 8 Gen 3 for Galaxy (4 nm)",
            "cpu": "Octa-core (1x3.39 GHz Cortex-X4 + 5x3.15 GHz Cortex-A720 + 2x2.3 GHz Cortex-A520)",
            "gpu": "Adreno 750"
        },
        memory: {
            "ram": "12GB",
            "internal": [{ size: "256GB", price: 1199 }, { size: "512GB", price: 1299 }, { size: "1TB", price: 1499 }],
            "expandable": "No microSD slot"
        },
        main_camera: {
            "quad": [
                "200 MP, f/1.7, wide, OIS",
                "12 MP, f/2.2, ultra-wide, 120°",
                "10 MP, f/2.4, 3x telephoto, OIS",
                "50 MP, f/3.5, 5x telephoto periscope, OIS"
            ],
            "features": ["Laser AF", "PDAF", "OIS", "Super Steady video", "HDR", "Panorama"],
            "video": ["8K@30fps", "4K@30/60fps", "1080p@30/60/240fps", "720p@960fps", "HDR10+"]
        },
        selfie_camera: {
            "single": "12 MP, f/2.2, wide, Dual Pixel PDAF",
            "features": ["HDR", "Night mode"],
            "video": ["4K@30/60fps", "1080p@30fps"]
        },
        sound: {
            "speakers": "Stereo speakers tuned by AKG",
            "dolby": "Dolby Atmos support",
            "jack": "No 3.5mm jack"
        },
        connectivity: {
            "wlan": "Wi-Fi 7 (802.11 a/b/g/n/ac/6e/7), dual-band, Wi-Fi Direct",
            "bluetooth": "5.3, A2DP, LE",
            "gps": "A-GPS, GLONASS, BDS, GALILEO",
            "nfc": "Yes",
            "usb": "USB Type-C 3.2, DisplayPort 1.4, OTG",
            "ir": "No"
        },
        battery: {
            "type": "Li-Ion 5000 mAh, non-removable",
            "charging": ["45W wired (~65% in 30 min)", "15W wireless", "4.5W reverse wireless"]
        },
        sensors: [
            "Ultrasonic fingerprint (under display)",
            "Accelerometer",
            "Gyroscope",
            "Proximity sensor",
            "Compass",
            "Barometer"
        ],
        misc: {
            "colors": ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
            "models": ["SM-S928B", "SM-S928U", "SM-S928N", "SM-S9280"]
        }
    }

}
export default phoneDetails;