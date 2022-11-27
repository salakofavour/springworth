import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

import { Oval } from "react-loader-spinner";

export default function CarouselItem() {
  async function fetchProducts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getCheapestProductApi`
    );
    return res.json();
  }

  const { data } = useSWR("cheapestProduct", fetchProducts);

  if (!data)
    return (
      <div className="h-96 w-full flex items-center justify-center">
        <Oval height={"50"} color="black" secondaryColor="#696969" />
      </div>
    );

  if (!data?.product) return <p>No products</p>;

  return (
    <Link href={`/${data.product.slug}`}>
      <div className="flex flex-wrap py-5 px-5 lg:px-20 item-start lg:justify-center gap-x-20">
        <div className="relative w-96 h-56 lg:h-96">
          <Image
            sizes="20vw"
            priority
            className="w-full h-full object-contain"
            fill
            src={data.product.imgUrl}
            alt="images"
          />
        </div>
        <div className="py-2 flex flex-col lg:mt-20 items-start">
          <p className=" bg-black/50 text-white rounded-md px-2 py-1 text-xs lg:text-[16px] ">
            Cheapest Book
          </p>
          <h3 className="text-xl  lg:pb-2 text-left lg:text-5xl font-bold w-full lg:w-full lg:leading-[3.5rem]">
            {data.product.name}
          </h3>
          <p className="text-[16px] lg:text-xl font-medium">
            Price ${data.product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
