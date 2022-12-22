import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import {
  Navbar,
  Footer,
  LoadingSpinner,
  Container,
  MyHeader,
} from "../../components";

export default function SellerProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  async function fetchSellerInfo() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/getSellerInfo?uId=${id}`
    );
    return res.json();
  }

  const { data } = useSWR([id, "sellerInfo"], fetchSellerInfo);

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <MyHeader
        title={"Seller Profile"}
        description={"Seller profile details"}
      />
      <Navbar />
      <Container>
        <div className="px-2 lg:px-10 myLg:px-16 py-5 md:py-10">
          <div className=" grid grid-cols-12 md:gap-x-5 gap-y-5 lg:gap-x-10 items-start">
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <SellerInfo address={data?.address[0]} user={data?.userInfo} />
            </div>

            <div className="col-span-12 gap-y-3 gap-x-5 md:col-span-8 lg:col-span-9 grid grid-cols-12">
              {data?.products.map(
                (item) =>
                  item.isShow && (
                    <div
                      key={item.id}
                      className="col-span-6 md:col-span-4 lg:col-span-3"
                    >
                      <ProductCard product={item} />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}

function SellerInfo({ user, address }) {
  return (
    <div className="  w-full  rounded-lg flex flex-col gap-y-2 justify-center px-5 py-3 border">
      <div className="relative w-16 h-16">
        <Image
          fill
          sizes="15vh"
          src={user?.imgUrl}
          alt="image"
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      <p className=" truncate">Name : {user?.name}</p>
      <p>State : {address?.state}</p>
      <p>City : {address?.city}</p>
      <p>Meeting Place : {address?.mettingPlace}</p>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link href={`/${product.slug}`}>
      <div className="flex gap-x-5 gap-y-2 py-2 px-5 rounded-lg justify-between border shadow-sm flex-wrap">
        <div className="relative w-20 h-20">
          <Image
            fill
            sizes="15vh"
            src={product.imgUrl}
            alt="image"
            className="w-full h-full  object-contain"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      </div>
    </Link>
  );
}
