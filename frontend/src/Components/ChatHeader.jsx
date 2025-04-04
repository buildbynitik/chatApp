import React from 'react'
import avatar from '../assets/avatar.png'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    const onlineUser = useAuthStore((store) => store.onlineUser);
  return (
    <div className=" p-2.5 border border-base-400">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-3 ">
          {/* Avtart */}
          <div className=" avatar">
            <div className="  size-10 rounded-full relative">
              <img src={selectedUser.profilePic || avatar} alt="" />
            </div>
          </div>
          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className=" text-sm text-base-300">
              {onlineUser.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}

        <button onClick={() => setSelectedUser(null)}>X</button>
      </div>
    </div>
  );
}

export default ChatHeader