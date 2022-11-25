import React from "react";
import Image from "next/image";

export default function UserInfoCard({
  fromSetting,
  i,
  setToggleModal,
  setTabIndex,
  data,
}) {
  function handleEdit() {
    setTabIndex(i);
    if (!fromSetting) {
      setToggleModal(true);
    }
  }

  return (
    <div
      className={`flex justify-between items-start w-full px-4 py-5 ${
        i !== 3 && " border-b"
      } border-gray-500`}
    >
      <div className="flex flex-col gap-y-0">
        <p className=" font-semibold">{data.name}:</p>

        {data.isImg ? (
          <div className=" relative w-12 h-12 mt-2">
            <Image
              fill
              className="w-full h-full object-cover rounded-full"
              sizes="15vh"
              alt="profile picture"
              src={data.value}
            />
          </div>
        ) : (
          <p>{data.value}</p>
        )}
      </div>
      <button
        onClick={handleEdit}
        className={` bg-orange-500 text-white border  rounded-sm w-28`}
      >
        Edit
      </button>
    </div>
  );
}
