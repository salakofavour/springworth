import React from "react";
import { Oval } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Oval
        height="70"
        width="70"
        radius="9"
        color="green"
        ariaLabel="loading"
      />
    </div>
  );
}
