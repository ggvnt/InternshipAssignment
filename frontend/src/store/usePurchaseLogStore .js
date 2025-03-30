import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { createPurchase } from "../../../backend/src/controllers/purchaseControllers.js";

export const usePurchaseLogStore = create((set) => ({
  purchaseLogs: [],
  loading: false,
  error: null,

  fetchPurchaseLogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/usage/getPurchaseLogs"); // Fixed API endpoint
      set({ purchaseLogs: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error fetching purchase logs",
        loading: false,
      });
    }
  },

  addPurchaseLog: async (newLog) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/usage/createP", newLog);
      set((state) => ({
        purchaseLogs: [...state.purchaseLogs, response.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error adding purchase log",
        loading: false,
      });
    }
  },

  createPurchaseLog: async (newLog) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "/usage/createPurchase",
        newLog
      );
      set((state) => ({
        purchaseLogs: [...state.purchaseLogs, response.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error creating purchase log",
        loading: false,
      });
    }
  },

  updatePurchaseLog: async (id, updatedLog) => {
    try {
      const response = await axiosInstance.put(
        `/purchase/updatePurchaseLog/${id}`,
        updatedLog
      );
      set((state) => ({
        purchaseLogs: state.purchaseLogs.map((log) =>
          log._id === id ? response.data : log
        ),
      }));
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error updating purchase log",
      });
    }
  },

  deletePurchaseLog: async (id) => {
    try {
      await axiosInstance.delete(`/purchase/deletePurchaseLog/${id}`);
      set((state) => ({
        purchaseLogs: state.purchaseLogs.filter((log) => log._id !== id),
      }));
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error deleting purchase log",
      });
    }
  },
}));
