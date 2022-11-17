import Link from "next/link";
import React from "react";

import { MapPinIcon } from "@heroicons/react/24/outline";

export default function NavButton({ href, headingText, mainText, isIcon }) {
  return (
    <Link href={`${href ? href : "#"}`}>
      <div className="text-white navBorder">
        <div className="flex flex-col">
          <p className={`text-xs ${isIcon && "pl-5"}`}>{headingText}</p>
          <div className="flex items-center">
            {isIcon && <MapPinIcon className="text-white w-5" />}
            <p className=" font-semibold text-[14px]">{mainText}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
