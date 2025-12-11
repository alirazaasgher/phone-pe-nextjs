// app/sitemap/brands.xml/route.js
export async function GET() {
  const baseUrl = "https://www.mobile42.com";

  // Fetch brands (should be relatively small list)
  const brands = await fetchBrands();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${brands
  .map(
    (brand) => `  <url>
    <loc>${baseUrl}/mobiles/${brand.slug}-mobile-phones</loc>
    <lastmod>${new Date(brand.created_at).toISOString()}</lastmod>
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

async function fetchBrands() {
  // Your database query
  const res = await fetch(`https://api.mobile42.com/api/brands`);
  const json = await res.json();
  return json.data;
}
