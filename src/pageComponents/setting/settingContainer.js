import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

import { Navbar, Footer, Container } from "../../components";
import UserInfoCard from "../login-security/userInfoCard";

import { handleImageUpload } from "../../lib/authFunctions";
import { toast } from "react-toastify";

export default function SettingContainer({
  user,
  userData,
  tabIndex,
  setTabIndex,
  data,
}) {
  const imgRef = useRef();
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (tabIndex !== null) {
      setTabIndex(null);
    }
  };

  function handleImageInputChange(e) {
    const image = e.target.files[0];
    setSelectedImgFile(image);
    setSelectedImg(URL.createObjectURL(image));
  }

  function handleImgRef() {
    imgRef.current.click();
  }

  function resetImageState() {
    setSelectedImg(null);
    setSelectedImgFile(null);
  }

  async function handleEditProfileImg() {
    setLoading(true);
    await handleImageUpload(selectedImgFile, setProgress, user.uid);
  }

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
      toast.success("Profile Picture Updated");
      setSelectedImg(null);
      setSelectedImgFile(null);
    }
  }, [progress]);

  function NavigationLinks() {
    return (
      <div className="flex gap-x-2 mt-5 text-[13px] lg:text-[15px]">
        <Link href={"/account"}>
          <p className="cursor-pointer hover:underline text-blue-700">
            Your Account
          </p>
        </Link>
        <p className="font-medium">{">"}</p>

        <p onClick={handleClick} className=" text-orange-500 cursor-pointer">
          Settings
        </p>

        {tabIndex != null && (
          <div className="flex gap-x-2">
            <p className="font-medium">{">"}</p>
            <p className=" text-orange-500">{userData[tabIndex].header}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div className="mx-4 mb-5 lg:mx-36 myLg:mx-72 mb-20">
          <NavigationLinks />
          {tabIndex !== null ? (
            userData[tabIndex].component
          ) : (
            <div className="mt-4">
              <p>{tabIndex}</p>
              <h4 className="text-3xl">Settings</h4>
              <div className="mt-5 rounded-md border border-gray-500  w-full lg:w-10/12">
                {userData.map((item, i) => (
                  <UserInfoCard
                    fromSetting
                    key={i}
                    i={i}
                    data={item}
                    setTabIndex={setTabIndex}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
