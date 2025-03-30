import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsageLogStore } from "../store/useUsageLogStore";

const UsageLogPage = () => {
  const [date, setDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantityUsed, setQuantityUsed] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Added success message state
  const { logUsage } = useUsageLogStore();
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !itemName || !category || !quantityUsed) {
      alert("Please fill out all fields.");
      return;
    }

    const newUsage = {
      date,
      itemName,
      category,
      quantityUsed: Number(quantityUsed),
    };

    try {
      await logUsage(newUsage); // Call the logUsage function to add the log
      setSuccessMessage("Usage log added successfully!"); // Success message
      setTimeout(() => {
        navigate("/usageLog"); // Navigate back to the usage log page after 1.5 seconds
      }, 1500);
    } catch (error) {
      alert("Error adding usage log");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add Usage Log
      </h2>

      {successMessage && (
        <div className="mb-4 text-green-500 font-semibold">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
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
          <label className="block text-gray-700">Quantity Used</label>
          <input
            type="number"
            value={quantityUsed}
            onChange={(e) => setQuantityUsed(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter quantity used"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Usage
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsageLogPage;
