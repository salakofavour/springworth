/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { filter } from "smart-array-filter";

export default function FilterOptionContainer({
  id,
  products,
  setFilterProducts,
}) {
  const [selectOptions, setSelectedOption] = useState(null);
  const priceFilterOption = [
    {
      name: "under $10",
      value: 10,
    },
    {
      name: "under $20",
      value: 20,
    },
    {
      name: "under $40",
      value: 40,
    },
  ];

  function handleFilter(price) {
    const filtterProducts = filter(products, {
      keywords: `price:<=${price}`,
    });
    setFilterProducts(filtterProducts);
  }

  useEffect(() => {
    if (selectOptions !== null) {
      handleFilter(selectOptions);
    }
  }, [selectOptions]);

  useEffect(() => {
    setSelectedOption(null);
  }, [id]);

  function handleRest() {
    setSelectedOption(null);
    setFilterProducts(null);
  }

  return (
    <div className="grid grid-cols-12 lg:flex lg:flex-col gap-y-5 px-5 pb-4 lg:py-4">
      <div className="col-span-6 flex flex-col gap-y-1">
        <p className=" font-semibold">Price</p>
        {priceFilterOption.map((item, i) => (
          <p
            key={i}
            onClick={() => setSelectedOption(item.value)}
            className={`${
              selectOptions === item.value &&
              `rounded-md bg-orange-500 text-white`
            } px-3 cursor-pointer hover:underline`}
          >
            {item.name}
          </p>
        ))}
      </div>
      <p
        className=" hover:underline hover:text-orange-500 cursor-pointer"
        onClick={handleRest}
      >
        Reset
      </p>
    </div>
  );
}
