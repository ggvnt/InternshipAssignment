import React, { useState } from "react";
import { useInventoryStore } from "../store/InventoryStore.js";
import { useNavigate } from "react-router-dom"; // Use useNavigate

const AddInventoryPage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const { addItem } = useInventoryStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !currentStock) {
      alert("Please fill out all fields.");
      return;
    }

    const newItem = {
      name,
      category,
      initialStock: Number(currentStock),
    };

    await addItem(newItem);
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add New Inventory Item
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter item name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter item category"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Current Stock</label>
          <input
            type="number"
            value={currentStock}
            onChange={(e) => setCurrentStock(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter stock quantity"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventoryPage;
