import dynamic from "next/dynamic";

const SignupForm = dynamic(() => import("./signupForm"));
const SigninForm = dynamic(() => import("./signinForm"));
const ForgotPasswordForm = dynamic(() => import("./forgotPasswordForm"));

export default function FormContainer({ formType }) {
  return (
    <>
      {formType === "signin" && <SigninForm />}
      {formType === "signup" && <SignupForm />}
      {formType === "forgot-password" && <ForgotPasswordForm />}
    </>
  );
}
