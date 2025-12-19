// app/sitemap/static.xml/route.js
export async function GET() {
  const baseUrl = "https://www.mobile42.com";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1.0,
      changefreq: "daily",
    },
    {
      url: `${baseUrl}/mobiles`,
      lastModified: new Date(),
      priority: 0.9,
      changefreq: "daily",
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      priority: 0.8,
      changefreq: "weekly",
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      priority: 0.8,
      changefreq: "weekly",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
