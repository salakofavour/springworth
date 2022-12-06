import React, { useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Modal, InputField, SelectInputField } from "../../components";
import { categories } from "../../data/data";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { addProductFields } from "./fields";

import { handleEditProduct } from "../../lib/postProductsFunctions";

export default function EditProductModal({
  user,
  setEditProductModal,
  openModal,
  product,
}) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(product.category);
  const [selectedImage, setSelectedImage] = useState(product.imgUrl);
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const inputFileRef = useRef(null);
  const [progress, setProgress] = useState(null);

  function handleImageInputChange(e) {
    const image = e.target.files[0];
    setSelectedImgFile(image);
    setSelectedImage(URL.createObjectURL(image));
  }

  const defaultData = {
    name: product.name,
    price: product.price,
    description: product.description,
    quantity: product.quantity,
  };

  async function handleSubmitClick(data) {
    let isNameEdit;
    if (product.name === data.name) {
      isNameEdit = false;
    } else {
      isNameEdit = true;
    }

    if (selectedImgFile?.size / 1000 > 2000) {
      toast.error("Image size must be under 2mb");
      return;
    }

    let allData = {
      userId: user.uid,
      category: selectedCategory,
      ...data,
    };
    setLoading(true);
    const t = await handleEditProduct(
      product.id,
      allData,
      selectedImgFile,
      setProgress,
      isNameEdit
    );
    if (!selectedImgFile) {
      if (t) {
        router.reload();
      }
    }

    setLoading(false);
  }

  if (progress === 100) {
    router.reload();
  }

  return (
    <Modal
      openModal={openModal}
      setModalOpen={setEditProductModal}
      title="Edit Book"
    >
      <>
        <div className="flex gap-x-2 items-start">
          <button
            onClick={() => inputFileRef.current.click()}
            className="mt-5 flex items-center gap-x-2 text-[18px] border px-3 py-1"
          >
            <PhotoIcon className="w-6" />
            <p>Image</p>
          </button>
          <input
            onChange={handleImageInputChange}
            ref={inputFileRef}
            id="imageInput"
            hidden
            type="file"
          />
          <div className=" relative w-28 h-28">
            <Image
              fill
              className="w-full h-full object-contain"
              src={selectedImage}
              alt={product.name}
            />
          </div>
        </div>
        <div className="my-5">
          <SelectInputField
            setValue={setSelectedCategory}
            defaultValue={selectedCategory}
            values={categories}
          />
        </div>
        <InputField
          handleClick={handleSubmitClick}
          buttonText={"Save"}
          fields={addProductFields}
          defaulValue={defaultData}
          isLoadingSpinner={isLoading}
          isGrid
        />
      </>
    </Modal>
  );
}
