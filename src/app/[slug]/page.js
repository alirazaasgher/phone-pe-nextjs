import { getPhoneBySlug } from "../services/phones";
import { buildPhoneMetadata } from "../utils/metadata";
import { notFound } from "next/navigation";
import Details from "./Details";
export default async function DetailsPage({ params }) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  if (!phone) {
    notFound(); // Better than returning JSX for 404
  }

  return <Details phoneDetails={phone} />;
}

// Add metadata generation for better SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);

  if (!phone) {
    return {
      title: "Phone Not Found",
      alternates: { canonical: "https://www.mobile42.com" },
    };
  }

  const metadata = buildPhoneMetadata(phone);

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://www.mobile42.com/phones/${phone.slug}`,
      siteName: "Mobile42",
      images: [
        {
          url: phone.primary_image,
          width: 1200,
          height: 630,
          alt: `${phone.brand.name} ${phone.name}`,
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
      canonical: `https://www.mobile42.com/phones/${phone.slug}`,
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
