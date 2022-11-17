/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function SucessContainer({ user }) {
  const [data, setData] = useState(null);
  async function getSucessPaymentRes() {
    const { data } = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/subscription-status?id=${user?.uid}`
      )
    ).json();
    setData(data);
    console.log(data);
  }

  useEffect(() => {
    getSucessPaymentRes();
  }, []);

  return (
    <div className="w-full h-full mt-20 px-2 flex justify-center">
      <div className="bg-white shadow-md gap-y-2 flex flex-col w-full lg:w-2/5 py-10 items-center rounded-md">
        <CheckBadgeIcon className="w-20 text-green-500" />
        <h4 className="text-2xl font-medium">Payment Sucessfull</h4>
        <p className=" font-bold text-center text-[14px] px-5">
          Your account is now premium for 1 month you can upload unlimited
          products
        </p>

        <Link href={"/sell"}>
          <button className="border px-2 py-1 mt-5 rounded-md bg-myLightYellow">
            Go to sell page
          </button>
        </Link>
      </div>
    </div>
  );
}
