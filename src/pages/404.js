import Link from "next/link";
import React from "react";

export default function PageNotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <h2 className="text-xl lg:text-2xl">
        Sorry Page Not Exit{" "}
        <span className="pl-5 text-blue-400">
          <Link href={"/"}>Go to home</Link>
        </span>
      </h2>
    </div>
  );
}
