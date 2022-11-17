import React from "react";
import useSWR from "swr";
import { Oval } from "react-loader-spinner";

import { ProductCard } from "../../components";

export default function CarouselProductsContainer() {
  async function fetchProducts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getLatest3ProductsApi`
    );
    return res.json();
  }

  const { data } = useSWR("latest3Products", fetchProducts);

  if (!data)
    return (
      <div className="absolute mt-5 lg:top-[25rem] gap-x-2 md:gap-x-5 left-0 w-full flex padding overflow-auto items-center justify-center ">
        <Oval height={"30"} />
      </div>
    );

  return (
    <div className="absolute mt-5 lg:top-[25rem] gap-x-2 md:gap-x-5 left-0 w-full flex padding overflow-auto">
      {data.products.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </div>
  );
}
