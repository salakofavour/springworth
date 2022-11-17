import React from "react";
import Link from "next/link";

export default function Footer() {
  const footer = [
    {
      data: [
        {
          name: "Contact us",
          font: true,
        },
        {
          name: "Springworth0@gmail.com",
        },
        {
          name: "863-712-1453",
        },
        {
          name: "Silstone street Lakeland, florida.",
        },
      ],
    },
    {
      data: [
        {
          name: "Accounts",
          href: "account",
        },
        {
          name: "Profile",
          href: "account/profile",
        },
        {
          name: "Sell",
          href: "sell",
        },
      ],
    },
    {
      data: [
        {
          name: "About us",
          href: "about-us",
          font: true,
        },
        {
          name: "Terms and conditions",
          href: "term-conditions",
          font: true,
        },
      ],
    },
  ];

  return (
    <div className={` bg-green-600 w-full px-5 lg:px-20 py-10 mt-5`}>
      <div className=" grid grid-cols-12 gap-6 lg:gap-x-10 text-white">
        {footer.map((item) => (
          <div
            className="col-span-12 lg:col-span-4 flex flex-col gap-y-1"
            key={item.data[0].name}
          >
            {item.data.map((item) =>
              item?.href ? (
                <Link
                  className=" hover:underline"
                  href={`/${item.href}`}
                  key={item.name}
                >
                  <p className={`${item.font && "text-xl font-medium"}`}>
                    {item.name}
                  </p>
                </Link>
              ) : (
                <p
                  key={item.name}
                  className={`${item.font && "text-xl font-medium"}`}
                >
                  {item.name}
                </p>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
