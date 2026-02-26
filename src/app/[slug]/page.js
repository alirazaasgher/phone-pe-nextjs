import { getPhoneBySlug, getAllPhoneSlugs } from "../services/phones";
import {
  buildPhoneMetadata,
  generateProductSchema,
  generateFAQSchema,
} from "../utils/metadata";
import { notFound } from "next/navigation";
import Details from "./Details";
// For spec database: longer revalidation since specs don't change often
export const revalidate = 172800; // 24 hours (specs are mostly static)
// Allow new phone pages to be generated on-demand
export const dynamicParams = true;
// Pre-generate pages for all phones at build time
export async function generateStaticParams() {
  const phones = await getAllPhoneSlugs();
  return phones.map((phone) => ({
    slug: typeof phone === "string" ? phone : phone.slug,
  }));
}

export default async function DetailsPage({ params }) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  if (!phone) {
    notFound();
  }
  const productSchema = generateProductSchema(phone.data);
  const faqSchema = generateFAQSchema(phone.data);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Details
        phoneDetails={phone.data}
        similarMobiles={phone.similarMobiles}
        compatibility={phone.compatibility}
      />
    </>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let phone = await getPhoneBySlug(slug);

  if (!phone) {
    return {
      title: "Phone Not Found - Mobile42",
      alternates: { canonical: "https://www.mobile42.com" },
    };
  }

  phone = phone.data;
  const metadata = buildPhoneMetadata(phone);

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://www.mobile42.com/${phone.slug}`,
      siteName: "Mobile42",
      images: [
        {
          url: phone.primary_image,
          width: 1200,
          height: 630,
          alt: `${phone.brand.name} ${phone.name} specifications`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [phone.primary_image],
    },
    alternates: {
      canonical: `https://www.mobile42.com/${phone.slug}`,
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
  };
}
