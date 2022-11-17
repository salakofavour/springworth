import React from "react";

import Link from "next/link";
import Image from "next/image";

export default function CategoryProductCard({ item }) {
  return (
    <Link href={`/${item.slug}`}>
      <div className="border cursor-pointer">
        <div className="grid grid-cols-12 gap-x-5 lg:gap-x-5  bg-white">
          {/* Image */}
          <div className="col-span-6 lg:col-span-4 h-56 py-5 px-2 bg-gray-100">
            <div className=" relative w-full h-full">
              <Image
                sizes="20vw"
                priority
                fill
                alt={item.name}
                className="w-full h-full object-contain"
                src={item.imgUrl}
              />
            </div>
          </div>
          <div className="py-5 flex items-start flex-col col-span-6 lg:col-span-8 gap-y-1">
            <h5 className="text-[16px] md:text-xl lg:text-2xl"> {item.name}</h5>

            <div className="flex flex-wrap gap-y-1 items-end gap-x-1 mt-1">
              <p className="text-xl lg:text-2xl">${item.price}</p>
            </div>
            <p className="text-green-700 font-medium">In stock</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
