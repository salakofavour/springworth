import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext";

import { LoadingSpinner } from "../../components";
import ChatPageContainer from "../../pageComponents/chats/chatPageContainer";

export default function ChatPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return;
  }

  if (user?.loading) return <LoadingSpinner />;

  return (
    <main>
      <ChatPageContainer user={user} />
    </main>
  );
}
