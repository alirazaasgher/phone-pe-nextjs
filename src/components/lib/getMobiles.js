import { homePageData } from "../../app/services/phones";
export async function getMobiles() {
  let results = await homePageData();
  // Example: filter by RAM
  const ramFilter = filters.find(f => f.includes("ram"));
  if (ramFilter) {
    const ramValue = ramFilter.replace("gb-ram", "");
    results = results.filter(p => p.ram.startsWith(ramValue));
  }

  // Example: filter by storage
  const storageFilter = filters.find(f => f.includes("storage"));
  if (storageFilter) {
    const storageValue = storageFilter.replace("gb-storage", "");
    results = results.filter(p => p.storage.startsWith(storageValue));
  }

  return results;
}
