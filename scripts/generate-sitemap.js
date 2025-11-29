// scripts/generate-sitemap.js
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://mobile42.com"; // change it

const pages = [
  "", //
  "mobiles",
  "brands",
  "compare",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${BASE_URL}/${page}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap);
console.log("🚀 Sitemap generated successfully!");
