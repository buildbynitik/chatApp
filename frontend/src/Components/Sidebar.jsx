import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SideSkaleton from "./SideSkaleton";
import { User } from "lucide-react";
import avatar from "../assets/avatar.png";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
        useChatStore();
    
    const onlineUser = useAuthStore((store) => store.onlineUser);
  
  
  const authUser = useAuthStore((store) => store.authUser);

  useEffect(() => {
    if (authUser) {
      getUsers(); // Only fetch users when authUser is available
    }
  }, [authUser]); 

  if (isUserLoading) {
    return <SideSkaleton />;
  }
  return (
    <aside className=" h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all  duration-200">
      <div className=" border-b border-base-300 p-5 w-full">
        <div className=" flex items-center gap-2">
          <User className=" size-6" />
          <span className=" font-bold hidden lg:block"> Contacts</span>
        </div>
        {/* TODO online Filter */}
      </div>
      <div className="  overflow-y-auto w-full py-3 ">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || avatar}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUser.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-7">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-700">
                {onlineUser.includes(user._id) ? "online" : "offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
