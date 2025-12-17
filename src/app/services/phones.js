const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// services/phones.ts
export async function getPhoneById(id) {
  // call your DB or external API directly
  const res = await fetch(`https://api.mobile42.com/api/phones/${id}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data; // return phone object
}

export async function getPhoneBySlug(slug) {
  // call your DB or external API directly
  const res = await fetch(`https://api.mobile42.com/api/phones/${slug}`, {
    // next: { revalidate: 86400 }, // Cache for 1 hour
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json; // return phone object
}

export async function homePageData() {
  // call your DB or external API directly
  const res = await fetch(`https://api.mobile42.com/api/homepage`);
  const json = await res.json();
  return json.data; // return phone object
}

export async function getAllPhoneSlugs() {
  // call your DB or external API directly
  const res = await fetch(`https://api.mobile42.com/api/getPhoneBySlug`);
  const json = await res.json();
  return json.data; // return phone object
}

export async function mobilePageData(filters = [], sortValue) {
  const body = {
    filters, // your parsed filters
    sort: sortValue,
  };
  const res = await fetch(`https://api.mobile42.com/api/phones`, {
    method: "POST", // or "GET" if your backend expects query params
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(JSON.stringify(body));
  const json = await res.json();
  return json.data; // return phone object
}
export async function getComparePhoneBySlugs(slugs = []) {
  if (!Array.isArray(slugs) || slugs.length === 0) return [];
  const res = await fetch(`https://api.mobile42.com/api/phones/compare`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slugs }), // send array in body
  });
  if (!res.ok) return [];

  const json = await res.json();
  return json.data; // array of phone objects
}

export async function searchPhones(query) {
  if (!query) return [];
  const res = await fetch(
    `https://api.mobile42.com/api/search?q=${encodeURIComponent(query)}`
  );
  const json = await res.json();
  return json.data;
}
