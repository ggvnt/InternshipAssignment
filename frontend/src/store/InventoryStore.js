import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useInventoryStore = create((set) => ({
  inventory: [],
  loading: false,
  error: null,

  fetchInventory: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/inventory/getInventory");
      set({ inventory: response.data, loading: false });
    } catch (error) {
      set({ error: "Error fetching inventory", loading: false });
    }
  },

  addItem: async (newItem) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "/inventory/createInventory",
        newItem
      );
      set((state) => ({
        inventory: [...state.inventory, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Error creating inventory", loading: false });
    }
  },

  updateItem: async (id, updatedItem) => {
    try {
      const response = await axiosInstance.put(
        `/inventory/updateInventory/${id}`,
        updatedItem
      );
      set((state) => ({
        inventory: state.inventory.map((item) =>
          item._id === id ? response.data : item
        ),
      }));
    } catch (error) {
      console.error("Error updating item:", error);
    }
  },

  deleteItem: async (id) => {
    try {
      await axiosInstance.delete(`/inventory/deleteInventory/${id}`);
      set((state) => ({
        inventory: state.inventory.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  },
}));
