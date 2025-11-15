import HomeContent from "../components/HomeContent";
import { homePageData } from "./services/phones";
export default async function HomeClientWrapper() {
const homePageMobiles = await homePageData();
console.log("Home Page Mobiles Data:", homePageMobiles);
  return (
    <HomeContent homePageData = {homePageMobiles}/>
  );
}
