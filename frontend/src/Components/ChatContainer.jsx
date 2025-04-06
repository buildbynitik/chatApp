import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkaleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import avatar from "../assets/avatar.png";
import { formatMessageTime } from "../lib/util";

function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessageLoading,
    setSelectedUser,
    selectedUser,
    suscribeToMessages,
    unsucribeToMessages,
  } = useChatStore();
  const authUser = useAuthStore((store) => store.authUser);
  // console.log("get message in frontend-->", messages);

  useEffect(() => {
    getMessages(selectedUser._id);
    suscribeToMessages()

    return()=> unsucribeToMessages();
  }, []);
  if (isMessageLoading) {
    return (
      <div className=" flex-1 flex flex-col overflow-auto">
        <ChatHeader />

        <MessageSkaleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className=" flex-1  overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className=" chat-image avatar">
                <div className=" size-10 rounded-full border ">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || avatar
                        : selectedUser.profilePic || avatar
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className=" chat-header mb-1">
                <time className=" text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className=" chat-bubble  flex ">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="  sm:max-w-[200px]  rounded-md mb-2 "
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
    
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
