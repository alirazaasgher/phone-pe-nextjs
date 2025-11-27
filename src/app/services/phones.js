// services/phones.ts
export async function getPhoneById(id) {
  // call your DB or external API directly
  const res = await fetch(`http://127.0.0.1:8000/api/phones/${id}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data; // return phone object
}

export async function getPhoneBySlug(slug) {
  // call your DB or external API directly
  const res = await fetch(`http://127.0.0.1:8000/api/phones/${slug}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data; // return phone object
}

export async function homePageData() {
  // call your DB or external API directly
  const res = await fetch(`http://127.0.0.1:8000/api/homepage`);
  const json = await res.json();

  return json.data; // return phone object
}

export async function getAllPhoneSlugs() {
  // call your DB or external API directly
  const res = await fetch(`http://127.0.0.1:8000/api/getPhoneBySlug`);
  const json = await res.json();
  return json.data; // return phone object
}

export async function mobilePageData(filters = [], sortValue) {
  const body = {
    filters, // your parsed filters
    sort: sortValue,
  };
  const res = await fetch("http://127.0.0.1:8000/api/phones", {
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
