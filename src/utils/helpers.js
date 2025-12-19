const MOBILE_STATUS = ["new", "upcoming"];
import CryptoJS from "crypto-js";

export function getActiveTags(parsed, availableFilters) {
  const tags = [];
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // Mobile Status
  if (
    parsed.mobileStatus &&
    availableFilters.mobileStatus?.includes(parsed.mobileStatus)
  ) {
    tags.push(capitalize(parsed.mobileStatus));
  }
  // Brands
  if (Array.isArray(parsed.brands)) {
    parsed.brands.forEach((b) => {
      const cleaned = b
        .replace(/-mobile$/, "")
        .split("-")
        .filter(Boolean);
      cleaned.forEach((name) => {
        if (
          availableFilters.brands.some(
            (brand) => brand.name.toLowerCase() === name.toLowerCase()
          )
        ) {
          tags.push(capitalize(name));
        }
      });
    });
  }

  // Price Range
  // Ensure priceRange is an array of ranges
  if (Array.isArray(parsed.priceRange)) {
    const ranges = Array.isArray(parsed.priceRange[0])
      ? parsed.priceRange // [[min, max], ...]
      : [parsed.priceRange]; // [min, max]

    ranges.forEach(([min, max]) => {
      if (min != null && max != null) {
        tags.push(`${formatNumber(min)} - ${formatNumber(max)}`);
      } else if (min != null) {
        tags.push(`${formatNumber(min)}`);
      } else if (max != null) {
        tags.push(`${formatNumber(max)}`);
      }
    });
  }
  // Screen Size
  if (Array.isArray(parsed.screenSize)) {
    parsed.screenSize.forEach((range) => {
      let tag = range;

      // Match "min-to-max" formats like "4.5to5.0" or "5.0to5.5"
      const match = range.match(/^(\d+(\.\d+)?)to(\d+(\.\d+)?)$/);
      if (match) {
        const min = match[1];
        const max = match[3];
        tag = `${min} - ${max} inch`; // human-readable format
      } else if (!isNaN(Number(range))) {
        // Single number, e.g., "6"
        tag = `${range} inch`;
      }

      // Push to tags array
      tags.push(tag);
    });
  }

  // RAM & Storage
  const specMappings = [
    { key: "ram", label: "GB RAM" },
    { key: "storage", label: "GB Storage" },
  ];

  specMappings.forEach(({ key, label }) => {
    if (Array.isArray(parsed[key])) {
      parsed[key].filter(Boolean).forEach((v) => {
        // Match with availableFilters[key] objects by 'name' or 'value'
        const match = availableFilters[key]?.find(
          (f) => f.name === `${v}gb` || f.value === `${v} GB`
        );

        if (match) {
          tags.push(`${v}${label}`);
        }
      });
    }
  });

  if (Array.isArray(parsed.batteryCapacity)) {
    parsed.batteryCapacity.forEach((batt) => {
      let tag = batt;

      // Match numeric values with optional "mAh" suffix
      const match = batt.match(/^(\d+)(mAh)?$/i);
      if (match) {
        const value = match[1];
        tag = `${value} mAh`; // human-readable format
      }

      // Push to tags array
      tags.push(tag);
    });
  }

  return tags;
}

export function tagToFilter(tag) {
  const cleanTag = tag.trim().toLowerCase();
  // Screen size range: e.g., "4.5to5.0 inch", "5.0-5.5 inch"
  if (/^\d+(\.\d+)?\s*(to|-)\s*\d+(\.\d+)?\s*inch$/i.test(cleanTag)) {
    const parts = cleanTag
      .replace(/\s*inch\s*$/i, "")
      .split(/\s*(?:to|-)\s*/)
      .map((s) => s.trim());
    return `${parts[0]}to${parts[1]}-screen-size`;
  }

  // Battery: must contain "mAh" to differentiate from price
  // e.g., "3000 mAh", "3000-4000 mAh"
  if (/^\d+(\s*(?:to|-)\s*\d+)?\s*mAh$/i.test(cleanTag)) {
    const value = cleanTag
      .replace(/\s*mAh\s*$/i, "")
      .replace(/\s*(?:to|-)\s*/g, (match) =>
        match.includes("to") ? "to" : "-"
      )
      .trim();
    return `${value}mAh-battery`;
  }

  // RAM: e.g., "6 RAM", "8GB RAM"
  if (/^\d+\s*(?:gb\s*)?ram$/i.test(cleanTag)) {
    return `${cleanTag.replace(/\s*(?:gb\s*)?ram$/i, "").trim()}gb-ram`;
  }

  // Storage: e.g., "128 Storage", "256GB Storage"
  if (/^\d+\s*(?:gb\s*)?storage$/i.test(cleanTag)) {
    return `${cleanTag.replace(/\s*(?:gb\s*)?storage$/i, "").trim()}gb-storage`;
  }

  // Price: single number (no units)
  if (/^\d+$/.test(cleanTag)) {
    return `price-${cleanTag}`;
  }

  // Default: replace spaces with dash
  return cleanTag.replace(/\s+/g, "-");
}

export function parseFilters (filters) {
  const parsed = {
    brands: [],
    ram: [],
    storage: [],
    batteryCapacity: [],
    screenSize: [],
    priceRange: [],
    mobileStatus: ""
  };

  const ignoredCategories = [
    "mid-range-phones",
    "budget-phones",
    "flagship-phones",
  ];

  filters.forEach((item) => {
    if (!item) return;

    item = item.toLowerCase().trim();

    if (MOBILE_STATUS.includes(item)) {
      parsed.mobileStatus = item;
    }
    // Ignore irrelevant categories
    if (ignoredCategories.includes(item)) return;

    // Brands
    if (
      item.endsWith("-mobile-phones") ||
      item.endsWith("-mobile") ||
      item.endsWith("-phones")
    ) {
      const brands = item
        .replace(/-(mobile-phones|mobile|phones)$/, "")
        .split("-")
        .map((b) => b.charAt(0).toUpperCase() + b.slice(1));
      parsed.brands.push(...brands);
      return;
    }

    // RAM
    if (item.includes("ram")) {
      parsed.ram.push(item.replace("gb-ram", ""));
      return;
    }

    // Storage
    if (item.includes("storage")) {
      parsed.storage.push(item.replace("gb-storage", ""));
      return;
    }

    // Battery
    if (item.includes("battery")) {
      parsed.batteryCapacity.push(item.replace("-battery", ""));
      return;
    }

    // Screen Size: "4.5to5.0" or "1.0to4.5-screen-size"
    if (item.includes("to")) {
      if (item.includes("screen-size")) {
        parsed.screenSize.push(item.replace("-screen-size", ""));
        return;
      }
    }

    if (/^\d+-to-\d+$/.test(item)) {
      parsed.priceRange = item.split("-to-").map(Number);
      return;
    }

    // Price: 15000-20000
    if (/^\d+-\d+$/.test(item)) {
      parsed.priceRange = item.split("-").map(Number);
      return;
    }

    // Price: price-from-10000
    if (item.startsWith("price-from-")) {
      parsed.priceRange = [item.slice(11), null];
      return;
    }

    // Price: price-up-to-10000
    if (item.startsWith("price-up-to-")) {
      parsed.priceRange = [null, +item.slice(12)];
      return;
    }

    // Price: single number
    if (/^\d+$/.test(item)) {
      parsed.priceRange = [+item, null]; // Treat single number as minimum
      return;
    }
  });

  return parsed;
};


export function signRequest(method, path, body = null) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomUUID();
  // Only stringify if body exists and isn't empty
  const bodyString = body ? JSON.stringify(body) : "";
  const payload = method + path + timestamp + nonce + bodyString;
 
  const signature = CryptoJS.HmacSHA256(
    payload,
    process.env.NEXT_PUBLIC_API_SECRET
  ).toString(CryptoJS.enc.Hex);
  //  console.log('JS Method:', method);
  // console.log('JS Path:', path);
  // console.log('JS Timestamp:', timestamp);
  // console.log('JS Nonce:', nonce);
  // console.log('JS Body:', bodyString);
  // console.log('JS Payload:', payload);
  // console.log('JS signature:', signature);
  return {
    "X-CLIENT-ID": "web_app",
    "X-TIMESTAMP": timestamp.toString(),
    "X-NONCE": nonce,
    "X-SIGNATURE": signature,
    "Content-Type" : "application/json"
  };
}