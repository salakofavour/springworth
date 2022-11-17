import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { deleteProduct } from "../../lib/postProductsFunctions";
import moment from "moment";

export default function UserProductCard({
  product,
  setEditProductModal,
  setSelectedProduct,
  index,
}) {
  const [loading, setLoading] = useState(false);

  function handleEdit() {
    setSelectedProduct(index);
    setEditProductModal(true);
  }

  async function handleDeleteClick(id) {
    setLoading(true);
    await deleteProduct(id);
    window.location.reload();
    setLoading(false);
  }

  return (
    <div className="flex gap-x-5 py-3 px-1 lg:px-5 col-span-12 lg:col-span-4 border rounded-md border-gray-200">
      <Link href={`/${product.slug}`}>
        <div className="relative w-36 h-36">
          <Image
            className="w-full h-full object-contain"
            fill
            sizes="12vh"
            src={product.imgUrl}
            alt={product.name}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-y-1">
        <p className=" font-medium">{product.name}</p>
        <p className="text-[15px]">$ {product.price}</p>
        <div className="flex gap-x-2 mt-1 text-[13px]">
          <button
            onClick={handleEdit}
            className={` bg-orange-500 text-white px-2 py-1  rounded-md`}
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(product.id)}
            className="px-2 py-1 bg-myYellow rounded-md"
          >
            {loading ? "Wait" : "Delete"}
          </button>
        </div>
        <p className="text-[13px] text-gray-600 mt-2">
          {" "}
          {moment(product.createdAt.seconds * 1000).format(
            "dddd, MMMM Do YYYY h:mm:ss a"
          )}
        </p>
      </div>
    </div>
  );
}
