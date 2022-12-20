import React from "react";
import CategoryProductCard from "./categoryProductCard";

export default function CategoryProductsContainer({ products }) {
  return (
    <>
      {products.map(
        (item) =>
          item.isShow && <CategoryProductCard item={item} key={item.slug} />
      )}
    </>
  );
}
