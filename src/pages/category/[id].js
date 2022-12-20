/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

import {
  Navbar,
  Footer,
  Container,
  LoadingSpinner,
  MyHeader,
} from "../../components";
import FilterOptionContainer from "../../pageComponents/categoryProducts/filterOptionContainer";
import TopBar from "../../pageComponents/categoryProducts/topBar";
import CategoryProductsContainer from "../../pageComponents/categoryProducts/categoryProductsContainer";

import { getUniqueListBy, handleSort } from "../../lib/helper";
import { getProductsByCategoryNextBatch } from "../../lib/getProductsFunctions";

export default function CategoryProductsPage() {
  const router = useRouter();
  const { id } = router.query;
  const sortOptions = ["A-Z", "Z-A", "PRICE↑", "PRICE↓"];
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);
  const [startFrom, setStartFrom] = useState(null);
  const [loading, setLoading] = useState(false);

  ///------ Data -------
  const [products, setProducts] = useState(null);
  const [filtterProducts, setFittlerProducts] = useState(null);

  function getSortData() {
    const dataToSort = filtterProducts ? filtterProducts : products;
    const sortProducts = handleSort(sortOptions[selectedSort], dataToSort);
    if (filtterProducts) {
      setFittlerProducts(sortProducts);
    } else {
      setProducts(sortProducts);
    }
  }

  async function fetchCategoryNextBatch() {
    setLoading(true);
    const res = await getProductsByCategoryNextBatch(id, startFrom);

    const data = res;
    if (!data?.data) {
      setLoading(false);
      return;
    }
    const allData = [...products, ...data?.data];

    const uniqueData = getUniqueListBy(allData, "slug");

    setProducts(uniqueData);
    setLoading(false);
  }

  function handleNextBatchClick() {
    setFittlerProducts(null);
    const dataToSort = products;
    const sortProducts = handleSort("index", dataToSort);

    setStartFrom(sortProducts[0]?.index);
  }

  // Reset after id changes------------
  useEffect(() => {
    setProducts(null);
    setFittlerProducts(null);
    setSelectedSort(null);
    setStartFrom(null);
  }, [id]);

  useEffect(() => {
    if (selectedSort !== null) getSortData();
  }, [selectedSort]);

  useEffect(() => {
    if (startFrom) {
      fetchCategoryNextBatch();
    }
  }, [startFrom]);

  async function fetchProductsByCategory() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getProductsByCategoryApi?id=${id}`
    );
    return res.json();
  }

  const { data: firstBatchData } = useSWR(
    ["categoryProducts", id],
    fetchProductsByCategory
  );

  ///-------- store the first batch data ---------
  useEffect(() => {
    setProducts(firstBatchData?.data);
  }, [firstBatchData]);

  if (!products) return <LoadingSpinner />;

  return (
    <main>
      <MyHeader title={id} description={`Buy the books from ${id}`} />
      <Navbar />
      <TopBar
        id={id}
        selectedSort={selectedSort}
        sortOptions={sortOptions}
        setSelectedSort={setSelectedSort}
      />
      <Container>
        <div className="mt-2 block lg:hidden px-2">
          <button onClick={() => setShowFilter(!showFilter)}>
            {showFilter ? "Hide" : "Fillters"}
          </button>
        </div>
        <div className="grid grid-cols-12 mt-5 gap-x-5 items-start mb-5">
          {/* Filter Container */}
          <div
            className={`${
              showFilter ? "lg:block" : "lg:block hidden"
            } col-span-12 lg:col-span-2 h-full lg:h-96`}
          >
            <FilterOptionContainer
              id={id}
              setFilterProducts={setFittlerProducts}
              products={products}
            />
          </div>
          <div className="flex flex-col  gap-y-2 col-span-12 lg:col-span-9">
            <p className="px-2 lg:px-0"></p>
            <CategoryProductsContainer
              products={!filtterProducts ? products : filtterProducts}
            />

            <p
              onClick={handleNextBatchClick}
              className={` bg-orange-500 text-white cursor-pointer mx-2 lg:mx-0 cursor-pointe w-20 flex justify-center py-1 rounded-md`}
            >
              {loading ? "Loading..." : "More"}
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
