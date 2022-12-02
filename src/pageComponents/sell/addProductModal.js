import { useRouter } from "next/router";

import React, { useState, useRef } from "react";
import { InputField, SelectInputField, Modal } from "../../components";
import { addProductFields } from "./fields";
import { categories } from "../../data/data";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

import { handleProductUpload } from "../../lib/postProductsFunctions";

export default function AddProductModal({ user, setModalOpen }) {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const inputFileRef = useRef(null);
  const router = useRouter();

  const subscription = user.subscription;
  const subscriptionStatus = subscription?.status
    ? subscription?.status
    : undefined;

  function handleImageInputChange(e) {
    const image = e.target.files[0];
    setSelectedImageFile(image);
    setSelectedImageUrl(URL.createObjectURL(image));
  }

  async function handleAddProductClick(data) {
    const allData = {
      ...data,
      imgUrl: "",
      category: selectedCategory,
    };

    if (selectedImageFile === null) {
      toast.error("No image selected");
      return;
    }

    if (selectedImageFile?.size / 1000 > 300) {
      toast.error("Image size must be under 300kb");
      return;
    }

    if (selectedCategory === null) {
      toast.error("No category selected");
    }

    setLoading(true);

    await handleProductUpload(
      allData,
      selectedImageFile,
      setProgress,
      user.uid,
      subscriptionStatus
    );
  }

  function handleCloseModal() {
    router.reload();
  }

  function ProgreesAndMessage() {
    return (
      <>
        <div className="w-full justify-center items-center py-5">
          {progress === 100 ? (
            <>
              <div className="flex flex-col gap-y-3 justify-center items-center">
                <p className="text-xl lg:text-2xl font-bold">
                  Product Uploaded Sucessfully
                </p>
                <CheckBadgeIcon className="w-20 text-green-400" />
                <button
                  onClick={handleCloseModal}
                  className="border px-3 py-1 font-medium"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <p className="text-xl font-bold">Uploading: {progress}%</p>
          )}
        </div>
      </>
    );
  }

  return (
    <Modal
      product={progress ? false : true}
      setModalOpen={setModalOpen}
      title={"Add Books"}
    >
      {progress ? (
        <ProgreesAndMessage />
      ) : (
        <div className="w-full">
          <div className="flex gap-5 items-start">
            <button
              onClick={() => inputFileRef.current.click()}
              className="mt-5 flex items-center gap-x-2 text-[18px] border px-3 py-1"
            >
              <PhotoIcon className="w-6" />
              <p>Image</p>
            </button>
            {selectedImageUrl && (
              <div className="relative w-28 h-28">
                <Image
                  fill
                  src={selectedImageUrl}
                  alt="image"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="my-5">
            <SelectInputField
              defaultValue={selectedCategory}
              label={"Choose category"}
              setValue={setSelectedCategory}
              values={categories}
            />
          </div>

          <InputField
            isGrid
            isLoadingSpinner={isLoading}
            handleClick={handleAddProductClick}
            buttonText={"Add"}
            fields={addProductFields}
          />
          <input
            onChange={handleImageInputChange}
            ref={inputFileRef}
            id="imageInput"
            hidden
            type="file"
          />
        </div>
      )}
    </Modal>
  );
}
