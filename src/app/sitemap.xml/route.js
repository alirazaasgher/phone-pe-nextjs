import { getAllPhoneCount } from "../services/phones";

// app/sitemap.xml/route.js
const PHONES_PER_SITEMAP = 1000; // must match your phones sitemap per-page
const baseUrl = "https://www.mobile42.com";
export async function GET() {
  // 1. Fetch total phone count from API
  const totalPhones = await getAllPhoneCount() || 0;;

  // 2. Calculate total phone sitemap pages
  const totalPages = Math.ceil(totalPhones / PHONES_PER_SITEMAP);
  const phoneSitemaps = Array.from(
    { length: totalPages },
    (_, i) => `
  <sitemap>
    <loc>${baseUrl}/sitemap/phones/${i + 1}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
  ).join("");
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap/static.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap/brands.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  ${phoneSitemaps}
  <sitemap>
    <loc>${baseUrl}/sitemap/compare.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
