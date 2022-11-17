import React from "react";
import Link from "next/link";
import { categories } from "../../../data/data";

export default function CategoryLinkBar() {
  return (
    <div className="flex items-center gap-x-5 px-3 py-1 text-white overflow-x-scroll">
      <p>
        <span className="text-xs font-medium">Shop By</span> <br />
        <span className="font-semibold -mt-5">Category</span>
      </p>
      {categories.map((item) => (
        <Link key={item.id} href={`/category/${item.id}`}>
          <div className="whitespace-nowrap">
            <h2>{item.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
