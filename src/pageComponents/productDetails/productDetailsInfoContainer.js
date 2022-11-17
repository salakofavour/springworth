import dynamic from "next/dynamic";
import React from "react";
import { useMediaQuery } from "react-responsive";

const InfoDesktop = dynamic(() =>
  import("../../pageComponents/productDetails/infoDesktop")
);

const InfoMobile = dynamic(() =>
  import("../../pageComponents/productDetails/infoMobile")
);

export default function ProductDetailsInfoContainer({ product }) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <div className="col-span-12 lg:col-span-5 myLg:col-span-6">
      {isTabletOrMobile ? (
        <InfoMobile product={product} />
      ) : (
        <InfoDesktop product={product} />
      )}
    </div>
  );
}
