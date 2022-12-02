import React, { useState } from "react";
import { LoadingSpinner, MyHeader } from "../../../components";
import { useAuth } from "../../../context/authContext";

import EditUserModal from "../../../pageComponents/login-security/editDetailsModal";
import ProfileContainer from "../../../pageComponents/login-security/profileContainer";

import {
  handleEmailUpdate,
  handlePhoneUpdate,
  handleNameUpdate,
} from "../../../lib/authFunctions";
import { useRouter } from "next/router";

export default function LoginSecurityPage() {
  const { user } = useAuth();
  const [toggleModal, setToggleModal] = useState(false);
  const [isLoadingSpinner, setLoadingSpinner] = useState(false);
  const [tabIndex, setTabIndex] = useState(null);
  const router = useRouter();

  if (!user) {
    router.push("/");
    return;
  }

  if (user?.loading) return <LoadingSpinner />;

  async function handleNameUpdateClick(data) {
    setLoadingSpinner(true);
    const status = await handleNameUpdate(data.name);
    if (status) {
      setTabIndex(null);
    }
    setLoadingSpinner(false);
    setToggleModal(false);
  }

  async function handleEmailUpdateClick(data) {
    setLoadingSpinner(true);
    const status = await handleEmailUpdate(data.email);
    if (status) {
      setTabIndex(null);
    }
    setLoadingSpinner(false);
  }

  async function handlePhoneUpdateClick(data) {
    setLoadingSpinner(true);
    const status = await handlePhoneUpdate(data.phoneNo);
    if (status) {
      setTabIndex(null);
    }
    setLoadingSpinner(false);
    setToggleModal(false);
  }

  const userData = [
    {
      name: "Name",

      value: user.name,
      isImg: false,
      func: handleNameUpdateClick,
      fields: [
        {
          type: "text",
          label: "Edit Name",
          minLength: 2,
          maxLenght: 12,
          name: "name",
        },
      ],
    },
    {
      name: "Phone no",
      value: user?.phoneNo,
      isImg: false,
      func: handlePhoneUpdateClick,
      fields: [
        {
          type: "text",
          label: "Edit Phone no",
          minLength: 8,
          name: "phoneNo",
        },
      ],
    },
    {
      name: "Profile Picture",
      value: user?.imgUrl,
      isImg: true,
    },
  ];

  return (
    <main>
      <MyHeader title={"Profile"} />
      <ProfileContainer
        setTabIndex={setTabIndex}
        setToggleModal={setToggleModal}
        userData={userData}
      />
      {toggleModal && (
        <EditUserModal
          isLoading={isLoadingSpinner}
          userData={userData[tabIndex]}
          setToggleModal={setToggleModal}
        />
      )}
    </main>
  );
}
