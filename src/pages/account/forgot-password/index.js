import React from "react";

import NavLogo from "../../../components/navbar/navLogo";
import { MyHeader } from "../../../components";
import FormContainer from "../../../pageComponents/sign&sinup/formContainer";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col h-full w-full items-center">
      <MyHeader title={"Forgot password"} />
      <div className="mt-2">
        <NavLogo noBorder fromForm />
      </div>
      <FormContainer formType={"forgot-password"} />
      <p className="mt-5">Please check the email in spam folder also</p>
    </div>
  );
}
