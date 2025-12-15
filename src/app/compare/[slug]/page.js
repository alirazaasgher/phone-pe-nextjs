import { getComparePhoneBySlugs } from "@/app/services/phones";
import QuickCompare from "../../../components/QuickCompare";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const phoneSlugs = slug.split("-vs-");
  const phones = await getComparePhoneBySlugs(phoneSlugs);

  // Extract phone names
  const phoneNames = phones.map((phone) => phone.name).join(" vs ");

  // Create description
  const description = `Compare ${phoneNames}. See detailed specifications, features, pricing, and differences to help you choose the best phone.`;

  // Create title
  const title = `${phoneNames} - Phone Comparison | Mobile42`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: phones[0]?.image
        ? [
            {
              url: phones[0].image,
              width: 1200,
              height: 630,
              alt: `${phoneNames} comparison`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: phones[0]?.image ? [phones[0].image] : [],
    },
    alternates: {
      canonical: `/compare/${slug}`,
    },
  };
}
export default async function Page({ params }) {
  const { slug } = await params;
  const phoneSlugs = slug.split("-vs-");
  const phone = await getComparePhoneBySlugs(phoneSlugs);
  return <QuickCompare phones={phone} />;
}
