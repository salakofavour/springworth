import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useCart } from "react-use-cart";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ProductCard({ product, fromCart }) {
  const { addItem, getItem } = useCart();
  const cartItem = getItem(product?.id);
  const router = useRouter();

  function handleAddBook() {
    addItem(product, 1);
    toast.success(`${product.name} is added to My book`);
  }

  function goToMyBook() {
    router.push("/my-books");
  }

  return (
    <div className=" cursor-pointer rounded-md px-2 py-2 items-center flex flex-col w-full  bg-white">
      <Link href={`/${product.slug}`}>
        <div className="relative w-36 h-36 lg:w-56">
          <Image
            priority
            sizes="20vw"
            fill
            alt="image"
            src={product.imgUrl}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
      <div className="flex w-full px-1 xl:px-5 py-3 items-center justify-between">
        <p className="text-[16px] w-20 lg:w-full lg:text-xl font-semibold  truncate">
          {product.name}
        </p>
        <p className="font-semibold text-xs lg:text-[16px]">${product.price}</p>
      </div>
      <button
        onClick={cartItem ? goToMyBook : handleAddBook}
        className={` bg-orange-500 text-white rounded-sm w-full py-1 my-3  font-semibold`}
      >
        {cartItem && !fromCart
          ? "Go to My Books"
          : cartItem && fromCart
          ? "Chat  Now"
          : "Add to My books"}
      </button>
    </div>
  );
}
