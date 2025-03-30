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
      console.log("Sending data:", newLog); // Log the data being sent
      const response = await axiosInstance.post("/usage/createUsages", {
        ...newLog,
        quantityUsed: Number(newLog.quantityUsed), // Ensure it's a number
      });

      console.log("Response received:", response.data); // Log response data
      set((state) => ({
        usageLogs: [...state.usageLogs, response.data],
        loading: false,
      }));
    } catch (error) {
      console.error("Error creating usage log:", error); // Log the error
      set({
        error: error.response
          ? error.response.data.message
          : "Error creating usage log",
        loading: false,
      });
    }
  },
}));
