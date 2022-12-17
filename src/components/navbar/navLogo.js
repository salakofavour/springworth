import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavLogo({ noBorder }) {
  return (
    <Link href="/">
      <div className={`${noBorder ? "" : ""} `}>
        <div className="relative w-36 h-12 md:w-44 md:h-14">
          <Image
            sizes="20vw"
            fill
            priority
            alt="logo"
            src="https://res.cloudinary.com/dtme6qv4c/image/upload/v1671266719/reLOGO-3.png"
          />
        </div>
      </div>
    </Link>
  );
}
