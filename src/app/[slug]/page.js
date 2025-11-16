import { getPhoneBySlug, getAllPhoneSlugs } from "../services/phones";
import { buildPhoneMetadata } from "../utils/metadata";
import Head from 'next/head';
import { notFound } from 'next/navigation';
import Details from "./Details";
export default async function DetailsPage({ params }) {
  const { slug } = await params;
  
  // Use slug instead of hardcoded ID
  const phone = await getPhoneBySlug(slug);
  console.log("Fetched phone data:", phone);
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
        <meta property="og:image" content={phone.image} />
        <meta property="og:url" content={`https://yoursite.com/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

        
        {/* <DetailsClient 
          phoneDetails={phone} 
          normalizedSpecs={normalizedSpecs} 
        /> */}

      
        <Details phoneDetails={phone} />
    </>
  );
}

// Generate static paths for better performance
export async function generateStaticParams() {
  const slugs = await getAllPhoneSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
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
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [phone.image],
    },
  };
}