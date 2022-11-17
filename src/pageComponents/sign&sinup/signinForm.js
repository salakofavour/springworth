import { useState } from "react";
import { InputField } from "../../components";
import Link from "next/link";
import { handleSignin } from "../../lib/authFunctions";
import { signInFields } from "./formData";
import { useRouter } from "next/router";

export default function SignInForm() {
  const [isLoadingSpinner, setLoadingSpinner] = useState(false);
  const router = useRouter();

  async function handleSigninSubmit(data) {
    setLoadingSpinner(true);
    const status = await handleSignin(data.email, data.password);
    if (status) {
      router.push("/");
    }
    setLoadingSpinner(false);
  }

  return (
    <div className=" w-[22rem] rounded-md px-5 py-5 mt-5 border border-gray-400">
      <h4 className="text-3xl">Sign in</h4>
      <InputField
        buttonText={"Signin"}
        isLoadingSpinner={isLoadingSpinner}
        fields={signInFields}
        handleClick={handleSigninSubmit}
      />
      <Link href={"/account/forgot-password"}>
        <p className="mt-10 text-blue-600 hover:underline cursor-pointer">
          Forgot Password
        </p>
      </Link>
    </div>
  );
}
