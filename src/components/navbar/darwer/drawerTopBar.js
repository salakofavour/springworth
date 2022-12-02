import Link from "next/link";
import React from "react";

import { useAuth } from "../../../context/authContext";
import Image from "next/image";

export default function DrawerTopBar() {
  const { user } = useAuth();
  return (
    <div className=" bg-green-500 w-full h-40  lg:px-8 px-4">
      <Link href={user?.name ? "/account" : "/account/signin"}>
        <div className="flex pt-10">
          <div className="flex gap-x-2 mt-6 flex-wrap">
            <button>
              <p className="text-white truncate w-32 lg:w-56 font-medium items-center">
                {user?.name ? user.name : "Sign in"}
              </p>
            </button>
            {user?.uid && (
              <div className=" relative w-20 h-20">
                <Image
                  fill
                  sizes="10vh"
                  className="w-full h-full rounded-full object-cover"
                  alt="user-profile"
                  src={user?.imgUrl}
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
