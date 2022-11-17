import React, { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { MyHeader, LoadingSpinner } from "../../../components";

import {
  handlePasswordUpdate,
  handleEmailUpdate,
} from "../../../lib/authFunctions";

import EditUserDetailsCard from "../../../pageComponents/login-security/editUserDetails";
import SettingContainer from "../../../pageComponents/setting/settingContainer";
import { auth } from "../../../config/firebase";

export default function SettingPage() {
  const { user } = useAuth();
  const [tabIndex, setTabIndex] = useState(null);
  const [isLoadingSpinner, setLoadingSpinner] = useState(false);

  if (!user) {
    router.push("/");
    return;
  }

  if (user?.loading) return <LoadingSpinner />;

  const emailField = [
    {
      minLength: 2,
      type: "email",
    },
  ];

  const passwordField = [
    {
      minLength: 6,
      type: "text",
    },
  ];

  const userData = [
    {
      name: "email",
      value: user.email,
      header: "Change Your Email",
      component: (
        <EditUserDetailsCard
          field={"New Email"}
          name="email"
          handleClick={handleEmailUpdateClick}
          value={user.email}
          fields={emailField}
          header={"Change Your Email"}
          isLoadingSpinner={isLoadingSpinner}
        />
      ),
    },
    {
      name: "password",
      value: "**********",
      header: "Change Your Password",
      component: (
        <EditUserDetailsCard
          field={"New Password please signin again"}
          name="password"
          handleClick={handlePasswordUpdateClick}
          value={"********"}
          fields={passwordField}
          header={"Change Your Password"}
          isLoadingSpinner={isLoadingSpinner}
        />
      ),
    },
  ];

  async function handleEmailUpdateClick(data) {
    setLoadingSpinner(true);
    const status = await handleEmailUpdate(data.email);
    if (status) {
      setTabIndex(null);
    }
    setLoadingSpinner(false);
  }

  async function handlePasswordUpdateClick(data) {
    setLoadingSpinner(true);
    const status = await handlePasswordUpdate(auth.currentUser, data.password);
    if (status) {
      setTabIndex(null);
    }
    setLoadingSpinner(false);
  }

  return (
    <main>
      <SettingContainer
        user={user}
        userData={userData}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
    </main>
  );
}
