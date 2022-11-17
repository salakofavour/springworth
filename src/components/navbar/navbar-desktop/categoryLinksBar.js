/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { categories } from "../../../data/data";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function CategoryLinksBar({ setToggleDrawer }) {
  const btnRef = useRef();
  useEffect(() => {
    function cloaseDrawer(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setToggleDrawer(false);
      }
    }

    document.body.addEventListener("click", cloaseDrawer);

    return () => document.body.removeEventListener("click", cloaseDrawer);
  }, []);

  return (
    <div
      className={` bg-green-500 flex items-center gap-x-3 mt-[4rem]  px-3 py-1 w-full`}
    >
      <button
        ref={btnRef}
        onClick={() => setToggleDrawer(true)}
        className="flex items-center gap-x-1 text-white navBorder2"
      >
        <Bars3Icon className="w-6 " />
      </button>

      {categories.map((item) => (
        <Link href={`/category/${item.id}`} key={item.name}>
          <p className="text-white font-medium text-[14px] navBorder2">
            {item.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
