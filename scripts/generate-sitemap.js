// scripts/generate-sitemap.js
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://mobile42.com";

const pages = [
  { path: "", priority: "1.0", changefreq: "daily" }, // Homepage
  { path: "mobiles", priority: "0.9", changefreq: "daily" }, // Main section
  { path: "brands", priority: "0.8", changefreq: "daily" }, // Main section
  { path: "compare", priority: "0.7", changefreq: "weekly" }, // Tool page
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${BASE_URL}/${page.path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap);
console.log("🚀 Sitemap generated successfully!");
