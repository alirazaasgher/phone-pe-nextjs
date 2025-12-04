import { getPhoneBySlug } from "../services/phones";
import { buildPhoneMetadata } from "../utils/metadata";
import { notFound } from 'next/navigation';
import Details from "./Details";
export default async function DetailsPage({ params }) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  if (!phone) {
    notFound(); // Better than returning JSX for 404
  }

  return (
        <Details phoneDetails={phone} />
  );
}

// Add metadata generation for better SEO
export async function generateMetadata({ params }) {
  const { slug } =  await params;
  const phone = await getPhoneBySlug(slug);
  
  if (!phone) {
    return {
      title: 'Phone Not Found',
    };
  }

  const metadata = buildPhoneMetadata(phone);
  
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [phone.primary_image],
    },
  };
}