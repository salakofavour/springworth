import React from "react";
import { MyHeader } from "../../../components";
import NavLogo from "../../../components/navbar/navLogo";

import FormContainer from "../../../pageComponents/sign&sinup/formContainer";

export default function SignupPage() {
  return (
    <div className="flex flex-col h-full w-full items-center">
      <MyHeader title={"Sing up"} />
      <div className="mt-2">
        <NavLogo noBorder />
      </div>
      <FormContainer formType={"signup"} />
    </div>
  );
}
