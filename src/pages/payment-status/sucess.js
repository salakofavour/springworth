/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAuth } from "../../context/authContext";
import { LoadingSpinner, MyHeader } from "../../components";
import SucessContainer from "../../pageComponents/paymentStatus/sucessContainer";

export default function PaymentSucessPage() {
  const { user } = useAuth();

  if (user?.loading) return <LoadingSpinner />;

  return (
    <>
      <MyHeader title={"Payment Sucess"} />
      <SucessContainer user={user} />
    </>
  );
}
