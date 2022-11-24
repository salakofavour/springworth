import React, { useEffect, useState } from "react";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function ChatUserList({ user, setSelectedUser, selectedUser }) {
  const [chatsUser, setChatsUser] = useState({ loading: true });

  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
      setChatsUser(doc.data());
    });
    return () => {
      unsub();
    };
  }, [user]);

  function handleSelectUser(item) {
    const data = {
      combineId: item[0],
      uid: item[1].userInfo.uid,
      name: item[1].userInfo.displayName,
      email: item[1].userInfo.email,
      imgUrl: item[1].userInfo.imgUrl,
    };

    setSelectedUser(data);
  }

  return (
    <div className="col-span-12 lg:col-span-3 gap-y-1 bg-white overflow-y-scroll flex flex-col pb-5 px-5 ">
      <p className="text-2xl font-semibold py-2 lg:py-5">Chats</p>
      {chatsUser.loading ? (
        <div>Loading..</div>
      ) : Object.keys(chatsUser).length !== 0 ? (
        Object.entries(chatsUser)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((item, i) => (
            <div key={i}>
              {isMobile && <hr />}
              <div
                onClick={() => handleSelectUser(item)}
                // onClick={() => handleSelectUser(i)}

                className={` md:hover:bg-lime-500 rounded-md ${
                  selectedUser?.combineId === item[0] &&
                  "bg-lime-500 rounded-md"
                } py-2 lg:py-5 mt-5 lg:mt-0 cursor-pointer flex items-center gap-x-3 px-3`}
              >
                <div className=" relative w-12 h-12">
                  <Image
                    sizes="10vh"
                    fill
                    className="w-full h-full  rounded-full object-cover"
                    src={item[1].userInfo.imgUrl}
                    alt={"dd"}
                  />
                </div>
                <p>{item[1].userInfo.displayName}</p>
              </div>
            </div>
          ))
      ) : (
        <div>
          <h1 className=" text-xl font-medium pb-3">No user to chat with</h1>
          <p className="text-[12px]">
            Please select the seller from product details page
          </p>
        </div>
      )}
    </div>
  );
}
