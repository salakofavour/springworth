import React from "react";
import { MyHeader } from "../../../components";
import Link from "next/link";
import NavLogo from "../../../components/navbar/navLogo";

import FormContainer from "../../../pageComponents/sign&sinup/formContainer";

export default function SigninPage() {
  return (
    <div className="flex flex-col h-full w-full items-center">
      <MyHeader title={"Sign in"} />
      <NavLogo noBorder />
      <FormContainer formType={"signin"} />
      <ButtonToSignUp />
    </div>
  );
}

function ButtonToSignUp() {
  return (
    <>
      <div className="flex items-center mt-7">
        <div className="w-28 lg:w-32 h-[1px] bg-gray-400"></div>
        <p className="text-xs px-1">New to Spring Books?</p>
        <div className="w-28 lg:w-32 h-[1px] bg-gray-400"></div>
      </div>
      <Link href={"/account/signup"}>
        <button
          className={` bg-orange-500 text-white py-1  rounded-sm  border-black w-[22rem] mt-6`}
        >
          Create your Amazone Account
        </button>
      </Link>
    </>
  );
}
