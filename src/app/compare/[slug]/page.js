import { getComparePhoneBySlugs } from "@/app/services/phones";
import PhoneComparison from "@/components/PhoneCompersion";
import { notFound } from "next/navigation";
export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const phoneSlugs = slug.split("-vs-");
  // get query param
  const usage = searchParams?.usage || "balanced";
  const phone = await getComparePhoneBySlugs(phoneSlugs, usage);
  if (!phone || phone.length === 0) {
    notFound();
  }
  return (
    <PhoneComparison phones={phone.data} comparisonData={phone.comparison} />
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const phoneSlugs = slug.split("-vs-");

  try {
    const phones = await getComparePhoneBySlugs(phoneSlugs);
    // Handle case where phones aren't found
    if (!phones?.success || !phones?.data?.length) {
      return {
        title: "Phone Comparison Not Found | Mobile42",
        description:
          "The requested phone comparison could not be found. Browse our phone database to compare your favorite devices.",
        alternates: {
          canonical: "https://www.mobile42.com/compare",
        },
      };
    }

    // Extract phone details
    const phoneNames = Array.isArray(phones?.data)
      ? phones.data
          .map((phone) =>
            `${phone.brand?.name ?? ""} ${phone.name ?? ""}`.trim(),
          )
          .join(" vs ")
      : "";
    // Create rich description with key specs (if available)
    const description = `Compare ${phoneNames} side by side. Detailed comparison of specifications, features, camera, battery, performance, price, and design. Find the perfect phone for your needs.`;
    // Create comprehensive title
    const title = `${phoneNames} Comparison - Specs, Features & Price`;

    const keywords = Array.isArray(phones?.data)
      ? [
          ...phones.data.map((p) => p.name).filter(Boolean),
          ...phones.data.map((p) => p.brand?.name).filter(Boolean),
          "comparison",
          "specs",
          "features",
          "price",
          "review",
        ].join(", ")
      : "";

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `https://www.mobile42.com/compare/${slug}`,
        siteName: "Mobile42",
        type: "website",
        images:
          phones[0]?.primary_image || phones[0]?.image
            ? [
                {
                  url: phones[0].primary_image || phones[0].image,
                  width: 1200,
                  height: 630,
                  alt: `${phoneNames} side by side comparison`,
                },
              ]
            : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          phones[0]?.primary_image || phones[0]?.image
            ? [phones[0].primary_image || phones[0].image]
            : [],
        creator: "@mobile42", // Add your Twitter handle if you have one
      },
      alternates: {
        canonical: `https://www.mobile42.com/compare/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      // Additional structured data hints
      other: {
        "article:publisher": "Mobile42",
        "og:locale": "en_US",
      },
    };
  } catch (error) {
    console.error("Error generating comparison metadata:", error);

    return {
      title: "Phone Comparison | Mobile42",
      description:
        "Compare smartphones side by side to find the perfect device for you.",
      alternates: {
        canonical: "https://www.mobile42.com/compare",
      },
    };
  }
}
