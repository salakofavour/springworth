import React from "react";
import useSWR from "swr";
import { Oval } from "react-loader-spinner";
import CarouselItem from "./carouselItem";
import CarouselProductsContainer from "./carouselProductsContainer";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel() {
  async function fetchProducts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getCheapestProductApi`
    );
    return res.json();
  }

  const { data } = useSWR("cheapestProduct", fetchProducts);

  if (!data)
    return (
      <div className="h-96 w-full flex items-center justify-center">
        <Oval height={"50"} color="black" secondaryColor="#696969" />
      </div>
    );

  if (!data?.product) return <p>No products</p>;

  return (
    <div
      className={`relative  bg-gradient-to-b from-lime-500 to-white w-full h-[30rem] lg:h-[40rem]`}
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={true}
        pagination={{ clickable: true }}
      >
        {data.product.map((item) => (
          <SwiperSlide key={item.id} className="slide">
            <div className="slide-content">
              <CarouselItem product={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <CarouselProductsContainer />
    </div>
  );
}
