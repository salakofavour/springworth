/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoadingSpinner, MyHeader } from "../components";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, []);

  return (
    <div>
      <MyHeader title={"redirecting..."} />
      <LoadingSpinner />
    </div>
  );
}
