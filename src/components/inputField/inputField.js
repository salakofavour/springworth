/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";

export default function InputField({
  fields,
  handleClick,
  buttonText,
  defaulValue,
  isLoadingSpinner,
  isGrid,
  fromSignUp,
}) {
  const { register, handleSubmit, reset } = useForm();
  const [isCheckBox, setCheckBox] = useState(false);
  const [isShowPassword, setShowPassword] = useState("password");

  useEffect(() => {
    reset({
      ...defaulValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={handleSubmit((data) => handleClick(data))}
      className={`${
        isGrid
          ? "grid grid-cols-12 gap-4 items-center"
          : "flex flex-col gap-y-4 mt-5 w-full"
      }`}
    >
      {fields.map((item, i) =>
        item.isDescription ? (
          <div
            className={`${
              isGrid
                ? "flex flex-col gap-y-1 col-span-12 md:col-span-6"
                : "flex flex-col gap-y-1"
            } `}
            key={i}
          >
            <label className="font-bold text-[15px]">{item.label}</label>
            <textarea
              placeholder={item?.placeholder}
              required={true}
              minLength={item.minLength}
              maxLength={item?.maxLength}
              {...register(item.name)}
              type={item.type}
              step="0.001"
              presicion={2}
              className="inputField h-24"
            />
          </div>
        ) : (
          <div
            className={`${
              isGrid
                ? "flex flex-col gap-y-1 col-span-12 md:col-span-6"
                : "flex flex-col gap-y-1 relative"
            } `}
            key={i}
          >
            <label className="font-bold text-[15px]">{item.label}</label>
            <input
              placeholder={item?.placeholder}
              required={true}
              minLength={item.minLength}
              maxLength={item?.maxLength}
              {...register(item.name)}
              type={item.type === "password" ? isShowPassword : item.type}
              step="0.001"
              presicion={2}
              className="inputField"
            />
            {item.type === "password" && (
              <div className=" absolute inset-0 top-8 left-[17rem]">
                <div>
                  <img
                    onClick={() => {
                      isShowPassword === "password"
                        ? setShowPassword("text")
                        : setShowPassword("password");
                    }}
                    className="w-6"
                    src={
                      isShowPassword === "password" ? "/view.png" : "/eye.png"
                    }
                    alt="view"
                  />
                </div>
              </div>
            )}
          </div>
        )
      )}
      {fromSignUp && (
        <div className="flex justify-start gap-x-2">
          <input onChange={() => setCheckBox(!isCheckBox)} type={"checkbox"} />
          <p className="text-[13px]">
            By continuing you are agreeing to our{" "}
            <Link
              target={"_blank"}
              className=" text-blue-500"
              href={"/term-conditions"}
            >
              Terms and conditions
            </Link>
          </p>
        </div>
      )}
      {isLoadingSpinner ? (
        <div
          className={` ${isGrid && "w-56 lg:w-96"} w-full flex justify-center`}
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
          disabled={fromSignUp ? !isCheckBox : false}
          type={"submit"}
          className={` disabled:bg-orange-200  bg-orange-500  text-white py-1 cursor-pointer  border border-gray-600 ${
            isGrid && "w-56 lg:w-96"
          }`}
        >
          {buttonText}
        </button>
      )}
    </form>
  );
}
