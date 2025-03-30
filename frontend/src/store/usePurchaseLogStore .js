import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const usePurchaseLogStore = create((set) => ({
  purchaseLogs: [],
  loading: false,
  error: null,

  fetchPurchaseLogs: async () => {
    set({ loading: true, error: null });
    try {
      console.log("Fetching purchase logs...");
      const response = await axiosInstance.get("/usage/getPurchaseLogs");
      console.log("Response:", response.data);
      set({ purchaseLogs: response.data, loading: false });
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
      set({
        error: error.response?.data?.message || "Error fetching purchase logs",
        loading: false,
      });
    }
  },

  addPurchaseLog: async (newLog) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "/usage/createPurchase",
        newLog
      ); //
      set((state) => ({
        purchaseLogs: [...state.purchaseLogs, response.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error adding purchase log",
        loading: false,
      });
    }
  },
}));
