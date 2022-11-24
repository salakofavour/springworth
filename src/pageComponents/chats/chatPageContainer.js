import React, { useState } from "react";

import { Navbar, Footer, Container } from "../../components";
import { useMediaQuery } from "react-responsive";

import ChatUserList from "./chatUserList";
import ChatArea from "./ChatArea";

export default function ChatPageContainer({ user }) {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <Navbar />
      <Container>
        <div className="grid grid-cols-12 lg:gap-x-5 gap-y-3 px-2 lg:px-10 py-2  pb-10 lg:py-5">
          <ChatList
            isMobile={isMobile}
            user={user}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <div className="col-span-12 lg:col-span-9 ">
            {selectedUser ? (
              <ChatArea
                user={user}
                selectedUser={selectedUser}
                combineId={selectedUser.combineId}
              />
            ) : (
              !isMobile && (
                <div className="flex justify-center items-center col-span-12 h-[32rem]">
                  <p className=" font-medium">Please Select User </p>
                </div>
              )
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

function ChatList({ selectedUser, setSelectedUser, user, isMobile }) {
  return (
    <>
      {isMobile && !selectedUser && (
        <ChatUserList
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          user={user}
        />
      )}
      {!isMobile && (
        <ChatUserList
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          user={user}
        />
      )}
      {isMobile && selectedUser && (
        <div className=" col-span-12 py-2">
          <p onClick={() => setSelectedUser(null)}>Go to chats</p>
        </div>
      )}
    </>
  );
}
