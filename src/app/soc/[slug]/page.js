import { notFound } from "next/navigation";
import ChipsetDetails from "./ChipsetDetails";
import { getChipsetBySlug } from "@/app/services/phones";

export default async function Page({ params }) {
  const { slug } = await params;
  const chipset = await getChipsetBySlug(slug);
  if (!chipset) {
    notFound();
  }
  return <ChipsetDetails chipset={chipset} />;
}
