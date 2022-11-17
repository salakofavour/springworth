import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";

export default function EditUserDetails({
  header,
  field,
  value,
  handleClick,
  name,
  fields,
  isLoadingSpinner,
}) {
  const { register, handleSubmit } = useForm();

  const showSignIn = name === "password" || name === "email";

  return (
    <div className="mt-4">
      <h5 className="text-3xl">{header}</h5>
      <form
        onSubmit={handleSubmit((data) => handleClick(data))}
        className="flex flex-col gap-y-5 mt-4 lg:w-10/12 border rounded-md border-gray-300 px-5 py-5"
      >
        <div className="flex gap-x-10 items-center">
          <label className=" font-semibold">{field}</label>
          {showSignIn && (
            <Link href={"/account/signin"}>
              <p className="text-[13px] text-blue-500">Sign in again</p>
            </Link>
          )}
        </div>
        <input
          {...register(name)}
          required={true}
          minLength={fields.minLength}
          className="w-56 outline-none px-3 py-1 border"
          type={fields.type}
          placeholder={value}
        />
        {isLoadingSpinner ? (
          <div className="mt-4 py-2 w-28  flex justify-center">
            <Oval height={"30"} />
          </div>
        ) : (
          <button
            type="submit"
            className={` bg-orange-500 text-white mt-4 py-2 w-28 text-[14px] rounded-md border`}
          >
            Save change
          </button>
        )}
      </form>
    </div>
  );
}
