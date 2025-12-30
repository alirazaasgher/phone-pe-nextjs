import HomeContent from "@/components/HomeContent";
import { homePageData } from "./services/phones";
export const revalidate = 86400;
export default async function Home() {
  const homePageDataResponse = await homePageData();
  return <HomeContent homePageResponse={homePageDataResponse} />;
}
