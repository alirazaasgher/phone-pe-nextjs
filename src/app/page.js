import HomeContent from "@/components/HomeContent";
import { homePageData } from "./services/phones";
export const dynamic = 'force-dynamic';
export default async function Home() {
  const homePageDataResponse = await homePageData();
  return (
      <HomeContent homePageResponse = {homePageDataResponse}/>
  );
}


