/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import { handleImageUpload } from "../../lib/authFunctions";
import toast from "react-hot-toast";
import { Modal, InputField } from "../../components";
import Image from "next/image";
import { auth } from "../../config/firebase";

export default function EditDetailsModal({
  isLoading,
  setToggleModal,
  openModal,
  userData,
}) {
  const imgRef = useRef();
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(null);

  function handleImgRef() {
    imgRef.current.click();
  }

  function resetImageState() {
    setSelectedImg(null);
    setSelectedImgFile(null);
  }

  async function handleEditProfileImg() {
    setLoading(true);
    await handleImageUpload(selectedImgFile, setProgress, auth.currentUser.uid);
  }

  function handleImageInputChange(e) {
    const image = e.target.files[0];
    setSelectedImgFile(image);
    setSelectedImg(URL.createObjectURL(image));
  }

  function handleClick(data) {
    userData?.func(data);
  }

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
      toast.success("Profile Picture Updated");
      setSelectedImg(null);
      setSelectedImgFile(null);
      setToggleModal(false);
    }
  }, [progress]);

  return (
    <Modal
      openModal={openModal}
      title={`Edit ${userData.name}`}
      setModalOpen={setToggleModal}
    >
      {!userData?.isImg ? (
        <InputField
          isLoadingSpinner={isLoading}
          buttonText={"Edit"}
          handleClick={handleClick}
          fields={userData.fields}
        />
      ) : (
        <div className="flex justify-between items-start p-5">
          <input
            type="file"
            id="imageInput"
            onChange={handleImageInputChange}
            ref={imgRef}
            hidden
          />
          <div className="flex flex-col  gap-y-2">
            <p className=" font-medium">Profile Image</p>
            <div className="relative w-16 h-16">
              <Image
                sizes="15vh"
                alt="avatar"
                fill
                className="w-full h-full object-cover rounded-full"
                src={selectedImg ? selectedImg : userData?.value}
              />
            </div>
            <p>{progress}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            {loading ? (
              <div>Uploading....</div>
            ) : (
              <button
                onClick={selectedImg ? handleEditProfileImg : handleImgRef}
                className=" bg-orange-500 text-white border  rounded-sm px-2 py-1"
              >
                {selectedImg ? "Upload" : "Choose New Picture"}
              </button>
            )}
            {selectedImg && <button onClick={resetImageState}>Cancel</button>}
          </div>
        </div>
      )}
    </Modal>
  );
}
