import React from "react";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function InfoMobile({ product }) {
  const { addItem, getItem } = useCart();
  const cartItem = getItem(product?.id);
  const router = useRouter();

  async function fetchAddressByProduct() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getAddressByProductApi?id=${product.userId}`
    );
    return res.json();
  }

  const { data } = useSWR(product.id, fetchAddressByProduct);

  if (!data)
    return <div className="block lg:hidden mt-0 px-2 py-5">Loading...</div>;

  function handleAddBook() {
    addItem(product, 1);
    toast.success(`${product.name} is added to My book`);
  }

  function goToMyBook() {
    router.push("/my-books");
  }

  function QtyButton() {
    return (
      <div className="mt-3">
        <p className="font-semibold text-green-500">In stock.</p>
        <p>Quantity : {product.quantity}</p>
      </div>
    );
  }

  function Button({ text, handleClick }) {
    return (
      <button
        onClick={handleClick}
        className={`py-2 mt-3 rounded-lg text-white bg-orange-500 `}
      >
        {text}
      </button>
    );
  }

  function BasicInfo() {
    return (
      <>
        <hr className="mt-4" />
        <div className=" mt-1 flex gap-x-3 items-center">
          <p className="text-3xl">${product.price}</p>
        </div>
        <hr className="mt-4" />
        <p className="mt-2">{product.description}</p>
        <div className="flex flex-col gap-y-1 mt-3">
          <p className="font-medium">Location:</p>
          <p>City : {data.address?.city}</p>
          <p>State : {data.address?.state}</p>
          <p>Suggested meeting place : {data.address?.mettingPlace}</p>
        </div>
      </>
    );
  }

  return (
    <div className="block lg:hidden mt-0 px-2 py-5">
      <div className="flex flex-col w-full">
        <BasicInfo />
        <QtyButton />
        <Button
          handleClick={cartItem ? goToMyBook : handleAddBook}
          text={cartItem ? "Go to my book" : "Add to My book"}
        />
        <Button handleClick={() => console.log("")} text={"Chat Now"} />
      </div>
    </div>
  );
}
