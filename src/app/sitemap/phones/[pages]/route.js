import { fetchPhones } from "@/app/services/phones";

// app/sitemap/phones-[page].xml/route.js
const PHONES_PER_SITEMAP = 1000; // Max 50k URLs per sitemap, but 1000 is safer

export async function GET(request, { params }) {
  const baseUrl = "https://www.mobile42.com";
  const page = parseInt(params.page, 10) || 1;
  // Fetch paginated phones
  const phones = await fetchPhones(page, PHONES_PER_SITEMAP);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${phones
  .map(
    (phone) => `  <url>
    <loc>${baseUrl}/${phone.slug}</loc>
    <lastmod>${new Date(phone.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
