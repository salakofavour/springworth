import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CarouselItem({ product }) {
  return (
    <Link href={`/${product.slug}`}>
      <div className="flex flex-wrap lg:flex-nowrap py-5 px-5 lg:px-20 item-start lg:justify-center gap-x-20">
        <div className="relative w-96 h-56 lg:h-96 ">
          <Image
            sizes="20vw"
            priority
            className="w-full h-full object-contain"
            fill
            src={product.imgUrl}
            alt="images"
          />
        </div>
        <div className="py-2 flex flex-col lg:mt-20 items-start">
          <p className=" bg-black/50 text-white rounded-md px-2 py-1 text-xs lg:text-[16px] ">
            Cheapest Book
          </p>
          <h3 className="text-xl  lg:pb-2 text-left lg:text-4xl font-bold w-72 lg:w-[35rem] whitespace-pre truncate lg:leading-[3.5rem]">
            {product.name}
          </h3>
          <p className="text-[16px] lg:text-xl font-medium">
            Price ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
