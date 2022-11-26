import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { useCart } from "react-use-cart";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { handleSelectUserChat } from "../../lib/authFunctions";

export default function ProductCard({ user, product, fromCart }) {
  const { addItem, getItem } = useCart();
  const cartItem = getItem(product?.id);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  function FromCartButton() {
    return (
      <>
        {loading ? (
          <div
            className={` justify-center flex text-white rounded-sm w-full py-1 my-3  font-semibold`}
          >
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
            className={` bg-orange-500 text-white rounded-sm w-full py-1 my-3  font-semibold`}
          >
            Chat Now
          </button>
        )}
      </>
    );
  }

  function NormalButton() {
    return (
      <button
        onClick={cartItem ? goToMyBook : handleAddBook}
        className={` bg-orange-500 text-white rounded-sm w-full py-1 my-3  font-semibold`}
      >
        {cartItem ? "Go to my books" : "Add book"}
      </button>
    );
  }

  return (
    <div className=" cursor-pointer rounded-md px-2 py-2 items-center flex flex-col w-full  bg-white">
      <Link href={`/${product.slug}`}>
        <div className="relative w-36 h-36 lg:w-56">
          <Image
            priority
            sizes="20vw"
            fill
            alt="image"
            src={product.imgUrl}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
      <div className="flex w-full px-1 xl:px-5 py-3 items-center justify-between">
        <p className="text-[16px] w-20 lg:w-full lg:text-xl font-semibold  truncate">
          {product.name}
        </p>
        <p className="font-semibold text-xs lg:text-[16px]">${product.price}</p>
      </div>
      {fromCart ? (
        product.userId !== user?.uid && <FromCartButton />
      ) : (
        <NormalButton />
      )}
    </div>
  );
}
