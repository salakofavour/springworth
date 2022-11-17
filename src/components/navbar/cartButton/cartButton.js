import React from "react";
import Link from "next/link";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "react-use-cart";

export default function CartButton() {
  const { totalUniqueItems } = useCart();
  return (
    <Link href="/my-books">
      <div className="flex items-end navBorder">
        <p className="  bg-orange-400 rounded-full px-2">{totalUniqueItems}</p>
        <ShoppingCartIcon className="text-white w-8" />
        <p className="font-semibold text-white">My Books</p>
      </div>
    </Link>
  );
}
