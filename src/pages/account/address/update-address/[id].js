import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../../../context/authContext";
import { LoadingSpinner, MyHeader } from "../../../../components";
import UpdateAddressContainer from "../../../../pageComponents/updateAddress/updateAddressContainer";

export default function UpdateAddress() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  if (!user) {
    router.push("/");
    return;
  }

  if (user?.loading) return <LoadingSpinner />;

  return (
    <main>
      <MyHeader title={"Update Address"} />
      <UpdateAddressContainer id={id} uid={user.uid} />
    </main>
  );
}
