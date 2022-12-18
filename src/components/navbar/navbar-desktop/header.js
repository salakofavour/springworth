import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NavLogo = dynamic(() => import("../navLogo"));
const SearchField = dynamic(() => import("./searchFields"));
const NavButton = dynamic(() => import("./navButton"));
const CartButton = dynamic(() => import("../cartButton/cartButton"));

export default function Header({ user }) {
  return (
    <header
      className={`bg-[#054902] fixed z-10 top-0 left-0  gap-x-1 justify-between 2xl:gap-x-2 flex w-full items-center px-3 py-2`}
    >
      <Suspense fallback={"Loading.."}>
        <NavLogo />
        <div className="w-2/5 myLg:w-1/2 my2xl:w-2/3">
          <SearchField />
        </div>
        {user ? (
          <NavButton
            href="/account"
            headingText={`Hello, ${user?.loading ? "loading" : user?.name}`}
            mainText="Account"
          />
        ) : (
          <NavButton
            href="/account/signin"
            headingText={"Hello, sign in"}
            mainText="Account"
          />
        )}
        <CartButton />
      </Suspense>
    </header>
  );
}
