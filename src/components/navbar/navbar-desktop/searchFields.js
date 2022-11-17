/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import SearchTab from "./searchTab";

export default function SearchFields() {
  const [showSearchTab, setShowSearchTab] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [allData, setAllData] = useState(null);
  const [searhText, setSearchText] = useState("");

  async function fethcAllProducts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getAllProductsApi`
    );
    return res.json();
  }

  const { data } = useSWR("allProducts-search", fethcAllProducts);

  useEffect(() => {
    if (data?.products) {
      setAllData(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (searhText) {
      const newD = allData.filter((val) => {
        return val.name.toLowerCase().includes(searhText.toLocaleLowerCase());
      });
      setSearchResult(newD);
    } else {
      setSearchResult(null);
    }
  }, [searhText]);

  return (
    <div className=" relative">
      <div className=" flex w-full  items-center">
        <div className="w-full">
          <input
            value={searhText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocusCapture={() => setShowSearchTab(true)}
            className=" rounded-tl-md rounded-bl-md px-5 w-full h-10 outline-myYellow"
            type="text"
          />
        </div>
        <button className="rounded-tr-md rounded-br-md bg-orange-400 h-10 px-2">
          <MagnifyingGlassIcon className="w-7" />
        </button>
      </div>
      {showSearchTab && (
        <SearchTab
          setShowSearchTab={setShowSearchTab}
          searhText={searhText}
          searchResult={searchResult}
        />
      )}
    </div>
  );
}
