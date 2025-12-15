import { getComparePhoneBySlugs } from "@/app/services/phones";
import QuickCompare from "../../../components/QuickCompare";


export default async function Page({ params }) {
    const { slug } = await params;
    const phoneSlugs = slug.split("-vs-");
    const phone = await getComparePhoneBySlugs(phoneSlugs);
    return (
        <QuickCompare />
    )
}