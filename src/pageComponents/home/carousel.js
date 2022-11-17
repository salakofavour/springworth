import React from "react";

import CarouselItem from "./carouselItem";
import CarouselProductsContainer from "./carouselProductsContainer";

export default function Carousel() {
  return (
    <div
      className={`relative  bg-gradient-to-b from-lime-500 to-white w-full h-[30rem] lg:h-[40rem]`}
    >
      <CarouselItem />
      <CarouselProductsContainer />
    </div>
  );
}
