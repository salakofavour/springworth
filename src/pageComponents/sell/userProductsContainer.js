import React, { useState } from "react";
import useSWR from "swr";

import UserProductCard from "./userProductCard";
import EditProductModal from "./editProductModal";

export default function UserProductsContainer({ user }) {
  const [editProductModal, setEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);

  async function fetchUserProducts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getUserProducts?id=${user.uid}`
    );
    return res.json();
  }

  const { data } = useSWR("user-products", fetchUserProducts);

  if (!data) return <div className="mt-5">Loading...</div>;

  return (
    <div className="mt-5">
      <div>
        <p className="my-5 font-semibold">
          Total Products: {data?.products?.length}
        </p>
      </div>
      <div className="grid grid-cols-12 gap-5 mb-10">
        {data.products?.map((item, i) => (
          <div
            className="col-span-12 lg:col-span-4 2xl:col-span-3"
            key={item.name}
          >
            <UserProductCard
              user={user}
              index={i}
              setEditProductModal={setEditProductModal}
              product={item}
              setSelectedProduct={setSelectedProduct}
            />
          </div>
        ))}
      </div>
      {editProductModal && (
        <EditProductModal
          user={user}
          setEditProductModal={setEditProductModal}
          product={data.products[selectedProduct]}
        />
      )}
    </div>
  );
}
