// src/store/usageLogStore.js
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
      set({ usageLogs: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error fetching usage logs",
        loading: false,
      });
    }
  },

  createUsageLog: async (newLog) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/usage/createUsage", newLog);
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

  logUsage: async (newLog) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/usage/createUsage", newLog);
      set((state) => ({
        usageLogs: [...state.usageLogs, response.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error logging usage",
        loading: false,
      });
    }
  },

  updateUsageLog: async (id, updatedLog) => {
    try {
      const response = await axiosInstance.put(
        `/usage/updateUsageLog/${id}`,
        updatedLog
      );
      set((state) => ({
        usageLogs: state.usageLogs.map((log) =>
          log._id === id ? response.data : log
        ),
      }));
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error updating usage log",
      });
    }
  },

  deleteUsageLog: async (id) => {
    try {
      await axiosInstance.delete(`/usage/deleteUsageLog/${id}`);
      set((state) => ({
        usageLogs: state.usageLogs.filter((log) => log._id !== id),
      }));
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "Error deleting usage log",
      });
    }
  },
}));
