import { signRequest } from "@/utils/helpers";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// services/phones.ts
export async function getPhoneById(id) {
  const path = `/api/phones/${id}`;
  const headers = signRequest("GET", path);
  const res = await fetch(`https://api.mobile42.com${path}`, {
    method: "GET",
    headers: headers,
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data; // return phone object
}

export async function getPhoneBySlug(slug) {
  const path = `/api/phones/${slug}`;
  const headers = signRequest("GET", path);
  const res = await fetch(`https://api.mobile42.com${path}`, {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) return null;
  const json = await res.json();
  console.log(json);
  return json; // return phone object
}

export async function homePageData() {
  const path = "/api/homepage";
  const headers = signRequest("GET", path);
  const res = await fetch(`https://api.mobile42.com${path}`, {
    method: "GET",
    headers: headers,
  });
  const json = await res.json();
  return json.data; // return phone object
}

export async function getAllPhoneSlugs() {
  const path = "/api/getPhoneBySlug";
  const headers = signRequest("GET", path);
  const res = await fetch(`https://api.mobile42.com${path}`, {
    method: "GET",
    headers: headers,
  });
  const json = await res.json();
  return json.data; // return phone object
}

export async function mobilePageData(filters = []) {
  const path = `/api/phones`;
  const body = { filters };
  const headers = signRequest("POST", path, body);
  const res = await fetch(`https://api.mobile42.com${path}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  return json.data; // return phone object
}
export async function getComparePhoneBySlugs(slugs = []) {
  if (!Array.isArray(slugs) || slugs.length === 0) return [];
  const path = `/api/phones/compare`;
  const body = { slugs };
  const headers = signRequest("POST", path, body);
  const res = await fetch(`https://api.mobile42.com${path}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  // Log response details
  // console.log("Status:", res.status);
  // console.log("Status Text:", res.statusText);
  // console.log("Headers:", Object.fromEntries(res.headers.entries()));
  if (!res.ok) return [];
  const json = await res.json();
  return json.data; // array of phone objects
}

export async function searchPhones(query) {
  if (!query) return [];
  const path = "/api/search";
  const queryString = `?q=${encodeURIComponent(query)}`;
  const headers = signRequest("GET", path);
  const res = await fetch(`https://api.mobile42.com${path}${queryString}`, {
    method: "GET",
    headers: headers,
  });
  const json = await res.json();
  return json.data;
}

export async function getAllPhoneCount() {
  const path = "/api/count";
  const headers = signRequest("GET", path);
  const res = await fetch(`https://api.mobile42.com${path}`, {
    method: "GET",
    headers: headers,
  });

  const json = await res.json();
  return json.count; // return phone object
}

export async function fetchPhones(offset, limit) {
  const path = `/api/phones`;
  const queryString = `?page=${offset}&perPage=${limit}`;
  const headers = signRequest("POST", path);
  const res = await fetch(`https://api.mobile42.com${path}${queryString}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json.data; // return phone object
}

export async function fetchCompareSlugs() {
  const path = "/api/getAllCompareSlugs";
  const headers = signRequest("GET", path);
  const res = await fetch(`https://api.mobile42.com${path}`, {
    method: "GET",
    headers: headers,
  });
  const json = await res.json();
  return json.data;
}

export async function fetchBrands() {
  const path = "/api/brands";
  const headers = signRequest("GET", path);
  const res = await fetch(`https://api.mobile42.com${path}`, {
    method: "GET",
    headers: headers,
  });
  const json = await res.json();
  return json.data;
}
