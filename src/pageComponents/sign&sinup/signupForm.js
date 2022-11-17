import Link from "next/link";
import React, { useState, useRef } from "react";
import { InputField } from "../../components";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { signUpFields } from "./formData";
import { useRouter } from "next/router";
import { handleSignup } from "../../lib/authFunctions";
import Image from "next/image";

export default function SignUpForm() {
  const [isLoadingSpinner, setLoadingSpinner] = useState(false);
  const [progress, setProgress] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const router = useRouter();
  const imgRef = useRef();

  function handleImageInputChange(e) {
    const image = e.target.files[0];
    setSelectedImgFile(image);
    setSelectedImg(URL.createObjectURL(image));
  }

  async function handleSignupSubmit(data) {
    setLoadingSpinner(true);
    const status = await handleSignup(
      data.name,
      data.email,
      data.password,
      selectedImgFile,
      setProgress
    );
    if (!selectedImgFile) {
      if (status) {
        router.push("/account/signin");
      }
    }
    if (!selectedImgFile) {
      setLoadingSpinner(false);
    }
  }

  if (progress === 100) {
    router.push("/redirect");
  }

  return (
    <div className=" mb-10 w-[22rem] rounded-md px-5 py-5 mt-5 border border-gray-400">
      <h4 className="text-3xl">Create Account</h4>
      <div className="flex gap-5 items-start mt-3">
        <button
          onClick={() => imgRef.current.click()}
          className="mt-5 flex items-center gap-x-2 text-[18px] border px-3 py-1"
        >
          <PhotoIcon className="w-6" />
          <p className="text-[14px]">Profile Picture</p>
        </button>
        {selectedImg && (
          <div className="relative w-20 h-20">
            <Image
              fill
              src={selectedImg}
              alt="image"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
      <p> {progress}</p>
      <input
        onChange={handleImageInputChange}
        ref={imgRef}
        type="file"
        id="imageInput"
        hidden
      />
      <InputField
        isLoadingSpinner={isLoadingSpinner}
        buttonText={"Create Account"}
        fields={signUpFields}
        handleClick={handleSignupSubmit}
        fromSignUp={true}
      />
      <p className="mt-10">
        <span>Already have an account?</span>
        <span className="text-blue-600 hover:underline px-2">
          <Link href={"/account/signin"}>Sign in</Link>
        </span>
      </p>
    </div>
  );
}
