import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { useMediaQuery } from "react-responsive";

import {
  Navbar,
  Footer,
  LoadingSpinner,
  Container,
  MyHeader,
} from "../../components";
import ProductImageContainer from "../../pageComponents/productDetails/productImageContainer";
import ProductDetailsInfoContainer from "../../pageComponents/productDetails/productDetailsInfoContainer";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAuth } from "../../context/authContext";

const CheckoutContainer = dynamic(() =>
  import("../../pageComponents/productDetails/checkoutContainer")
);

export default function ProductDetailsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { slug } = router.query;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" });

  async function fetchProduct() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getProductByIdApi?id=${slug}`
    );
    return res.json();
  }

  const { data, error } = useSWR(["product-details", slug], fetchProduct);

  if (error) return <p>{error.message}</p>;
  if (!data) return <LoadingSpinner />;
  if (!data.product)
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

  return (
    <main>
      <MyHeader
        title={data.product.name}
        description={data.product.description}
      />
      <Navbar />
      <Container>
        <div className="padding py-5 lg:py-10 antialiased">
          <div className="grid grid-cols-12 items-start lg:gap-x-8 mLg:gap-x-10">
            <ProductImageContainer
              name={data.product.name}
              imgUrl={data.product.imgUrl}
            />
            <ProductDetailsInfoContainer user={user} product={data.product} />
            {!isTabletOrMobile && (
              <CheckoutContainer user={user} product={data.product} />
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
