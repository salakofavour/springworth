import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";

export default function Modal({ children, openModal, setModalOpen, title }) {
  return (
    <Dialog
      open={openModal}
      onClose={() => setModalOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-2">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto px-4 pb-5  md:px-10 py-3 rounded-lg md:py-5 w-[95%] md:w-[75%] lg:w-[60%]  bg-white">
            <div className="flex justify-between items-center mb-5">
              <Dialog.Title className="font-semibold text-2xl ">
                {title}
              </Dialog.Title>
              <XMarkIcon
                className="w-8 cursor-pointer"
                onClick={() => setModalOpen(false)}
              />
            </div>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
