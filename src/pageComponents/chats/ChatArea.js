import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

import { SendMessages } from "../../lib/authFunctions";
import Link from "next/link";

export default function ChatArea({ user, combineId, selectedUser }) {
  const [chats, setChats] = useState({ loading: true });
  const [text, setText] = useState("");
  const chatRef = useRef();

  useEffect(() => {
    setChats({ loading: true });
    const unSub = onSnapshot(doc(db, "chats", combineId), (doc) => {
      setChats(doc.data());
    });

    return () => {
      unSub();
    };
  }, [combineId]);

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  }, [chats]);

  async function handleSendMessage(e) {
    e.preventDefault();

    if (text.length === 0) {
      toast.error("Please write some text");
      return;
    }

    if (text.length > 40) {
      toast.error("You can write only 40 words in one time");
      setText("");
      return;
    }

    const data = {
      senderEmail: user?.email,
      senderName: user?.name,
      reciverEmail: selectedUser?.email,
      message: text,
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/sendMessageEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setText("");

    if (selectedUser?.uid) {
      await SendMessages(combineId, user?.uid, selectedUser?.uid, text);
    }
  }

  return (
    <>
      <div className="bg-lime-400 rounded-md flex justify-between items-center w-full py-2 px-5 mb-2">
        <div className="flex gap-x-3  items-center">
          <div className=" relative w-12 h-12">
            <Image
              sizes="10vh"
              fill
              className="w-full h-full  rounded-full object-cover"
              src={selectedUser?.imgUrl}
              alt={"avatar"}
            />
          </div>

          <p className="w-24 lg:w-56 truncate">{selectedUser.name}</p>
        </div>
        <Link href={`/sellerProfile/${selectedUser.uid}`}>
          <button className=" bg-black/60 px-3 py-1 rounded-lg text-white">
            Seller Profile
          </button>
        </Link>
      </div>
      <div className="overflow-y-scroll flex-col  gap-x-20  h-96 py-5 px-0 lg:px-5">
        {chats?.loading ? (
          <p>Loading...</p>
        ) : chats?.messages.length ? (
          chats?.messages.map((item) => (
            <div
              key={item.id}
              className={` ${
                item.senderId === user?.uid ? "justify-end" : "justify-start"
              } w-full px-1 lg:px-5 bg flex  `}
            >
              <div
                className={`${
                  item.senderId === user?.uid
                    ? "bg-gray-100 text-black"
                    : "bg-lime-400"
                }  flex flex-col gap-y-1 whitespace-normal  rounded-bl-lg rounded-br-lg rounded-tr-lg px-2 lg:px-5 py-1 my-2`}
              >
                <p className=" truncate">{item.msg}</p>
                <p className="text-xs text-gray-400">
                  {new Date(item.date.seconds * 1000).getHours()}:
                  {new Date(item.date.seconds * 1000).getMinutes()}:
                  {new Date(item.date.seconds * 1000).getSeconds()} -
                  {new Date(item.date.seconds * 1000).getDate()}/
                  {new Date(item.date.seconds * 1000).getMonth()}
                </p>
              </div>
              <div ref={chatRef}></div>
            </div>
          ))
        ) : (
          <p className="flex font-medium justify-center items-center py-5">
            Start New Conversation
          </p>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="mt-2 flex gap-x-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Send a message"
          className=" bg-gray-100  outline-orange-500 rounded-lg w-full py-3 px-3 lg:px-10"
        />
        <button
          type="submit"
          className="bg-orange-500 rounded-lg text-white px-3 lg:px-5"
        >
          Send
        </button>
      </form>
    </>
  );
}
