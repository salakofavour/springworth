import React from "react";

import NavLogo from "../../../components/navbar/navLogo";
import { MyHeader } from "../../../components";
import FormContainer from "../../../pageComponents/sign&sinup/formContainer";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col h-full w-full items-center">
      <MyHeader title={"Forgot password"} />
      <NavLogo noBorder />
      <FormContainer formType={"forgot-password"} />
    </div>
  );
}