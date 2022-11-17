import React, { useState } from "react";

import { handleForgotPassword } from "../../lib/authFunctions";
import { InputField } from "../../components";

export default function ForgotPasswordForm() {
  const [isLoadingSpinner, setLoadingSpinner] = useState(false);

  const forgotPasswordField = [
    {
      type: "email",
      label: "E-mail",
      name: "email",
      minLength: 5,
    },
  ];

  async function handleForgotPasswordSubmit(data) {
    setLoadingSpinner(true);
    await handleForgotPassword(data.email);
    ///if (status) router.push("/account/signin");
    setLoadingSpinner(false);
  }

  return (
    <div className=" w-[22rem] rounded-md px-5 py-5 mt-5 border border-gray-400">
      <h4 className="text-3xl">Forgot Passowrd</h4>
      <InputField
        isLoadingSpinner={isLoadingSpinner}
        buttonText={"Send Password Reset Email"}
        fields={forgotPasswordField}
        handleClick={handleForgotPasswordSubmit}
      />
    </div>
  );
}
