import React from "react";
import useSWR from "swr";
import { ProductCard } from "../../components";

export default function TopProductsContainer() {
  async function fetchProducts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getTop10ExpensiveProductsApi`
    );
    return res.json();
  }

  const { data } = useSWR("topExpensiveProducts", fetchProducts);

  if (!data)
    return (
      <div className="bg-gray-100 py-3  lg:py-1 mt-20 lg:mt-14 px-5 ">
        Loading...
      </div>
    );

  return (
    <div className="bg-gray-100 py-3 lg:py-1 mt-24 lg:mt-14">
      <div className="px-2 lg:px-5 py-3 mt-14 sm:mt-0">
        <p className="text-2xl font-medium">Top Products</p>
        <div className="grid grid-cols-12 gap-2 lg:gap-5 my-5">
          {data.products?.map((item) => (
            <div className="col-span-6 lg:col-span-3" key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
