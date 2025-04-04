import { create } from 'zustand';
import toast from 'react-hot-toast';
import {axiosIntance} from '../lib/axios'  // ✅ Fixed typo

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],  // ✅ Fixed incorrect variable (was Users)
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
   

    // ✅ Fetch users
   getUsers: async () => {
    set({ isUserLoading: true });
    try {
        console.log("Fetching users..."); // ✅ Log API call
        const res = await axiosIntance.get("/messages/users");
        console.log("Fetched users:", res.data); // ✅ Log the response
        set({ users: res.data });
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    } finally {
        set({ isUserLoading: false });
    }
},

    // ✅ Fetch messages for a specific user
    getMessages: async (userId) => {
    if (!userId) {
        toast.error("User ID is required to fetch messages.");
        return;
    }

    set({ isMessageLoading: true });

    try {
        const res = await axiosIntance.get(`/messages/${userId}`);
        console.log("Fetched message data from backend:", res.data);

        // ✅ Set the messages
        set({ messages: res.data });

        // ✅ If you want to verify updated messages, use a callback or log from UI
        // Or log res.data directly instead of the store state
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    } finally {
        set({ isMessageLoading: false });
    }
},


    sendMessage: async (messageData) => {
        console.log("Send msg called-", messageData);

        const { selectedUser, message } = get();
        if (!selectedUser) {
        toast.error("No user selected");
        return;
    }
        try {
            const res = await axiosIntance.post(`/messages/send/${selectedUser._id}`, messageData);
            console.log("messge data-", res.data);

            set({ message: [...message, res.data] })
            console.log("Messages->",message )
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } 
    },

    // ✅ Function to select a user for chat
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
