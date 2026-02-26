import ClientChipsetGrid from "@/components/ClientChipsetGrid";
import { socPageData } from "../services/phones";

export default async function Page({}) {
  const chipsets = await socPageData();
  return <ClientChipsetGrid chipsets={chipsets} />;
}
