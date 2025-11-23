import { getPhoneBySlug } from "../services/phones";
import { buildPhoneMetadata } from "../utils/metadata";
import Head from 'next/head';
import { notFound } from 'next/navigation';
import Details from "./Details";
export default async function DetailsPage({ params }) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  if (!phone) {
    notFound(); // Better than returning JSX for 404
  }

  const metadata = buildPhoneMetadata(phone);
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={phone.primary_image} />
        <meta property="og:url" content={`https://mobile42.com/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
        <Details phoneDetails={phone} />
    </>
  );
}


// Add metadata generation for better SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  
  if (!phone) {
    return {
      title: 'Phone Not Found',
    };
  }

  const metadata = buildPhoneMetadata(phone);
  
  return {
    title: metadata.title,
    description: metadata.title,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [phone.primary_image],
    },
  };
}