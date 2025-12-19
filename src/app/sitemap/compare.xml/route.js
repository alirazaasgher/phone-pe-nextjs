import { fetchCompareSlugs } from "@/app/services/phones";
import { NextResponse } from "next/server";

const BASE_URL = "https://www.mobile42.com";

export async function GET() {
  try {
    const slugs = await fetchCompareSlugs();

    if (!slugs || slugs.length === 0) {
      return new NextResponse("No comparison pages found", { status: 404 });
    }

    // Build XML entries
    const urlEntries = slugs.map(
      (slug) => `
  <url>
    <loc>${BASE_URL}/compare/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    );

    // Full XML document
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error generating compare sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
