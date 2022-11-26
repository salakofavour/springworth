import React from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import toast from "react-hot-toast";
import {
  Navbar,
  Footer,
  Container,
  ProductCard,
  MyHeader,
} from "../../components";

import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";

export default function MyBooksPage() {
  const { items, removeItem, cartTotal } = useCart();
  const { user } = useAuth();

  function removeItemClick(id) {
    removeItem(id);
    toast.success("Item removed");
  }

  return (
    <main>
      <MyHeader title={"My Books"} />
      <Navbar />
      <Container>
        <div className="px-2 lg:px-40 myLg:px-48 py-6">
          <div className=" flex justify-between items-center">
            <h1 className="text-3xl font-medium">My Books</h1>
            <p className="text-xl">Total Price : ${cartTotal}</p>
          </div>
          <div className="grid grid-cols-12 gap-5 mt-10">
            {items.length > 0 ? (
              items.map((item, i) => (
                <div className="col-span-6 lg:col-span-4" key={item.id}>
                  <ProductCard user={user} fromCart={true} product={item} />
                  <button
                    onClick={() => removeItemClick(item.id)}
                    className="w-full  flex justify-end"
                  >
                    <p className="bg-black/20 px-2  rounded-md mt-1">Remove</p>
                  </button>
                </div>
              ))
            ) : (
              <div className=" col-span-12">
                <Link href={"/"}>
                  <p className="text-xl font-medium  text-blue-500 cursor-pointer">
                    No item found - Go to home
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
