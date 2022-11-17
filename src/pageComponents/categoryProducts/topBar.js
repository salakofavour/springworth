import React from "react";

export default function TopBar({
  id,
  sortOptions,
  setSelectedSort,
  selectedSort,
}) {
  return (
    <div className="bg-white px-2 lg:px-10 py-2  border-b  border-gray-400">
      <div className="container mx-auto max-w-screen-2xl flex justify-between">
        <p className="text-red-600 mr-2">{id}</p>
        <div className="flex gap-x-2 lg:gap-x-4 overflow-x-scroll lg:overflow-hidden">
          {sortOptions.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setSelectedSort(i)}
                className={`${
                  i == selectedSort
                    ? ` bg-orange-500 text-white`
                    : "bg-gray-200"
                }  shadow-md px-1 lg:px-3 py-1 rounded-md border text-xs lg:text-[13px] whitespace-nowrap`}
              >
                Sort by : {item} ^
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
