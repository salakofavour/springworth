import React from "react";

import Image from "next/image";

export default function ProductDetailsImageContainer({ imgUrl, name }) {
  return (
    <div className="col-span-12 lg:col-span-3 w-full">
      <p className="block text-2xl lg:hidden px-3 pb-3">{name}</p>
      <div className="w-full h-80 lg:h-96 relative">
        <Image
          priority
          sizes="25vh"
          src={imgUrl}
          alt="image"
          fill
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
