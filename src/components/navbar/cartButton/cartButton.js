import React from "react";
import Link from "next/link";

import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useCart } from "react-use-cart";

export default function CartButton() {
  const { totalUniqueItems } = useCart();
  return (
    <Link href="/my-books">
      <div className="flex gap-x-1 items-end navBorder">
        {totalUniqueItems > 0 && (
          <p className="  bg-orange-400 rounded-full px-2">
            {totalUniqueItems}
          </p>
        )}
        <BookOpenIcon className="text-white w-8" />
        <p className="font-semibold text-white">book</p>
      </div>
    </Link>
  );
}
