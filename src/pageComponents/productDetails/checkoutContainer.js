import React, { useState } from "react";
import useSWR from "swr";
import { useCart } from "react-use-cart";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import { handleSelectUserChat } from "../../lib/authFunctions";

export default function CheckoutContainer({ product, user }) {
  const { addItem, getItem } = useCart();
  const cartItem = getItem(product?.id);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function fetchAddressByProduct() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getAddressByProductApi?id=${product.userId}`
    );
    return res.json();
  }

  function handleAddBook() {
    addItem(product, 1);
    toast.success(`${product.name} is added to My book`);
  }

  function goToMyBook() {
    router.push("/my-books");
  }

  async function chatWithSeller() {
    if (user?.uid) {
      setLoading(true);
      const sellerId = product.userId;
      const combinedId =
        sellerId > user.uid ? sellerId + user.uid : user.uid + sellerId;
      await handleSelectUserChat(user, product.userId, combinedId);

      router.push("/chats");
      setLoading(false);
    } else {
      return toast.error("Please Signin");
    }
  }

  const { data } = useSWR(product.id, fetchAddressByProduct);

  if (!data)
    return (
      <div className="lg:col-span-4 myLg:col-span-3 lg:flex flex-col gap-y-2 px-5 py-5 rounded-md border-4 border-gray-300 w-ful">
        Loading...
      </div>
    );

  return (
    <div className="hidden lg:col-span-4 myLg:col-span-3 lg:flex flex-col gap-y-2 px-5 py-5 rounded-md border-4 border-gray-300 w-full">
      <div className="flex justify-between items-start">
        <p className="font-semibold">Buy for:</p>
        <div className="flex flex-col text-right">
          <p className=" text-xl font-medium text-orange-600">
            ${product.price}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <hr />
        <p className="text-[15px] font-medium">Location:</p>
        <p>Name : {data.address?.name}</p>
        <p>State : {data.address?.state}</p>
        <p>City : {data.address?.city}</p>
        <p>Suggested meeting place : {data.address?.mettingPlace}</p>
        <hr />
      </div>
      <p className="font-semibold text-green-700 text-[18px] mt-2">In Stock.</p>
      <div className="flex gap-x-2 mb-2">
        <p>Quantity:</p>
        <p>{product.quantity}</p>
      </div>
      {product?.userId !== user?.uid && (
        <>
          <button
            onClick={cartItem ? goToMyBook : handleAddBook}
            className=" bg-orange-400 text-white w-full py-1  rounded-3xl bg-myYellow"
          >
            {cartItem ? "Go to My books" : "Add to My books"}
          </button>

          {loading ? (
            <div className="w-full flex justify-center">
              <Oval
                height="40"
                width="40"
                radius="9"
                color="green"
                ariaLabel="loading"
              />
            </div>
          ) : (
            <button
              onClick={chatWithSeller}
              className={` bg-orange-500 text-white w-full py-1  rounded-3xl`}
            >
              Chat Now
            </button>
          )}
        </>
      )}
    </div>
  );
}
