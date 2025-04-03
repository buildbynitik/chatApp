import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosIntance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create(persist((set, get) => ({
    authUser: null,  // ✅ Ensure this matches App.jsx usage
    isSigningUp: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosIntance.get("/auth/checkAuth");
            console.log("Check Auth Response:", res.data);

            set({ authUser: res.data });

            console.log("Updated Zustand AuthUser:", get().authUser);
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
            console.log("Signup Response Data:", res.data);

            set({ authUser: res.data });

            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed!");
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosIntance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout sucessfully !!!");

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async () => {
        
    }
}), {
    name: "auth-store",
    getStorage: () => localStorage,  // ✅ Ensure persistence
}));
