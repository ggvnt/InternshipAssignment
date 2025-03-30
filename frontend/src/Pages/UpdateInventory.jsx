import React, { useState, useEffect } from "react";
import { useInventoryStore } from "../store/InventoryStore.js";
import { useNavigate, useParams } from "react-router-dom"; // Get item ID from URL

const UpdateInventoryPage = () => {
  const { inventory, updateItem, fetchInventory } = useInventoryStore();
  const { id } = useParams(); // Get inventory item ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    initialStock: "",
    purchased: "",
    used: "",
    currentStock: "",
  });

  useEffect(() => {
    fetchInventory(); // Fetch the latest inventory data
  }, [fetchInventory]);

  useEffect(() => {
    // Find the inventory item by ID
    const item = inventory.find((item) => item._id === id);
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        initialStock: item.initialStock,
        purchased: item.purchased,
        used: item.used,
        currentStock: item.currentStock,
      });
    }
  }, [id, inventory]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.currentStock) {
      alert("Please fill out all required fields.");
      return;
    }

    await updateItem(id, {
      ...formData,
      initialStock: Number(formData.initialStock),
      purchased: Number(formData.purchased),
      used: Number(formData.used),
      currentStock: Number(formData.currentStock),
    });

    navigate("/"); // Redirect to inventory list after update
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Update Inventory Item
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter item name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter item category"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Initial Stock</label>
          <input
            type="number"
            name="initialStock"
            value={formData.initialStock}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter initial stock"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Purchased</label>
          <input
            type="number"
            name="purchased"
            value={formData.purchased}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter purchased quantity"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Used</label>
          <input
            type="number"
            name="used"
            value={formData.used}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter used quantity"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Current Stock</label>
          <input
            type="number"
            name="currentStock"
            value={formData.currentStock}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter current stock"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInventoryPage;
