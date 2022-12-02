import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({ children, setModalOpen, title }) {
  return (
    <div className="fixed flex justify-center overflow-y-scroll items-center inset-0  bg-black  bg-opacity-30 backdrop-blur-sm z-50  h-screen w-screen">
      <div className="bg-white mx-2 w-[95%] overflow-y-scroll lg:mx-0 lg:w-2/3 rounded-md px-4 py-3 pb-8">
        <div className="flex justify-between my-4">
          <p className="text-xl font-semibold">{title}</p>
          <XMarkIcon
            onClick={() => setModalOpen(false)}
            className="w-8 cursor-pointer "
          />
        </div>
        {children}
      </div>
    </div>
  );
}
