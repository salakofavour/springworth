import Link from "next/link";
import Image from "next/image";

export default function AccountOptionCard({ item }) {
  return (
    <Link href={item.href}>
      <div className="border w-full h-28 rounded-md hover:bg-gray-200 cursor-pointer">
        <div className="flex items-start gap-x-4 px-4 py-2">
          <div className="relative w-16 h-16">
            <Image
              fill
              sizes="10vh"
              alt="image"
              className="w-full h-full object-contain"
              src={item.icon}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-[18px]">{item.name}</p>
            <p className="text-[15px] text-gray-600">{item.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
