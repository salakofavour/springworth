/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import IconButton from "./iconButton";
import NavLogo from "../navLogo";
import { useCart } from "react-use-cart";

import {
  Bars3Icon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Header({ setToogleDrawer, user }) {
  const { totalUniqueItems } = useCart();
  const btnRef = useRef();
  useEffect(() => {
    function cloaseDrawer(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setToogleDrawer(false);
      }
    }

    document.body.addEventListener("click", cloaseDrawer);

    return () => document.body.removeEventListener("click", cloaseDrawer);
  }, []);

  return (
    <header className="flex justify-between items-center px-3 py-2 flex-wrap">
      <div ref={btnRef} className="flex items-center gap-x-1">
        <IconButton
          handleClick={() => setToogleDrawer(true)}
          Icon={Bars3Icon}
        />
        <NavLogo />
      </div>
      <div className="flex items-center gap-x-3">
        <div className="flex items-center">
          {user ? (
            <Link href={"/account"}>
              <p className="text-white text-[13px] truncate w-12">
                {user?.loading ? "Loading" : user.name} {">"}
              </p>
            </Link>
          ) : (
            <Link href={"/account/signin"}>
              <p className="text-white text-[13px]">Sign in {">"}</p>
            </Link>
          )}
          <IconButton Icon={UserIcon} />
        </div>

        <Link href={"/my-books"}>
          <button className="relative">
            <p className=" bg-orange-400  px-1 rounded-full absolute right-1 text-xs">
              {totalUniqueItems}
            </p>
            <ShoppingCartIcon className="text-white w-8" />
          </button>
        </Link>
      </div>
    </header>
  );
}
