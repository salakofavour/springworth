import Link from "next/link";
import React from "react";
import { slugify } from "../../../lib/helper";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SearchTab({
  setShowSearchTab,
  searchResult,
  searhText,
}) {
  return (
    <div className="absolute z-40 bg-gray-100 w-full h-56 flex flex-col p-5 overflow-scroll">
      <div className="flex justify-end">
        <XMarkIcon
          className="w-6 cursor-pointer"
          onClick={() => setShowSearchTab(false)}
        />
      </div>
      <div className="flex flex-col gap-y-1 ">
        {searchResult?.map((item, i) => (
          <Link key={i} href={`/${slugify(item.name)}`}>
            {searhText && (
              <p className=" hover:text-orange-500 hover:underline">
                {item.name}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
