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
  const res = await fetch(`http://api.mobile42.com/api/phones/${slug}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data; // return phone object
}

export async function homePageData() {
  // call your DB or external API directly
  const res = await fetch(`http://api.mobile42.com/api/homepage`);
  const json = await res.json();
  return json.data; // return phone object
}

export async function getAllPhoneSlugs() {
  // call your DB or external API directly
  const res = await fetch(`http://api.mobile42.com/api/getPhoneBySlug`);
  const json = await res.json();
  return json.data; // return phone object
}

export async function mobilePageData(filters = [], sortValue) {
  const body = {
    filters, // your parsed filters
    // sort: sortValue
  };
  console.log(JSON.stringify(body));
  const res = await fetch("http://api.mobile42.com/api/phones", {
    method: "POST", // or "GET" if your backend expects query params
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  return json.data; // return phone object
}
