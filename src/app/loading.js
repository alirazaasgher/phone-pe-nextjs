import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full min-h-[600px]">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute w-24 h-24 border-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
        <Image
  src="/images/loader.gif"
  alt="Loading"
  width={48} 
  height={48} 
  priority 
/>
      </div>
    </div>
  );
}
