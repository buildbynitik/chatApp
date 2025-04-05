import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosIntance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create(persist((set, get) => ({
    authUser: null,  // ✅ Ensure this matches App.jsx usage
    isSigningUp: false,
    isLoggingIng: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,
    onlineUser: [],
    socket: null,

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser  || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId:authUser._id
            }
        });
        socket.connect();
        set({ socket })
        socket.on("getUserOnline", (userIds) => {
            set({onlineUser:userIds})
        })
    },
    disConnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect()
    },

    checkAuth: async () => {
        try {
            const res = await axiosIntance.get("/auth/checkAuth");
            // console.log("Check Auth Response:", res.data);

            set({ authUser: res.data });

            // console.log("Updated Zustand AuthUser:", get().authUser);
             get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosIntance.post("/auth/signup", data);
            // console.log("Signup Response Data:", res.data);

            set({ authUser: res.data });

            toast.success("Account created successfully!");
             get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed!");
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIng: true });
        try {
            const res = await axiosIntance.post("/auth/login", data);

            // console.log("Login response=->", res.data);

            set({ authUser: res.data });

            toast.success("Logged in Sucessfull");
            get().connectSocket();
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed!");
        } finally {
            set({ isLoggingIng: false });
        }
    },
    setOnlineUser: (users) => {
    // console.log("🔹 setOnlineUser called with:", users);  // ✅ Check if function is being executed
    set({ onlineUser: users });
    // console.log("🔹 Updated Zustand Online Users:", get().onlineUser);  // ✅ Check if state updates
},
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosIntance.put("/auth/update-profile", data);
            // console.log("Update response-->", res.data);
set({authUser:res.data})
            toast.success("Profile update sucessfully!!");

        }catch (error) {
            toast.error(error.response?.data?.message || "Profile Updation fail!");
        } finally {
            set({ isUpdatingProfile: false });
        }

        
    },

    logout: async () => {
        try {
            await axiosIntance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout sucessfully !!!");
            get().disConnectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    
    

    
}), {
    name: "auth-store",
    getStorage: () => localStorage,  // ✅ Ensure persistence
    partialize: (state) => {
        const { socket, ...rest } = state;
        return rest;
    }
}));
