import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useUsageLogStore = create((set) => ({
  usageLogs: [],
  loading: false,
  error: null,

  fetchUsageLogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/usage/getUsageLogs");

      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }

      set({ usageLogs: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error fetching usage logs",
        loading: false,
        usageLogs: [], // Ensure state is always an array
      });
    }
  },

  createUsageLog: async (newLog) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/usage/createUsage", {
        ...newLog,
        quantityUsed: Number(newLog.quantityUsed), // Ensure it's a number
      });

      set((state) => ({
        usageLogs: [...state.usageLogs, response.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error creating usage log",
        loading: false,
      });
    }
  },
}));
