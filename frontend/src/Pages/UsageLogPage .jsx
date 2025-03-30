import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsageLogStore } from "../store/useUsageLogStore.js";

const UsageLogPage = () => {
  const [date, setDate] = useState("");
  const [inventoryId, setInventoryId] = useState("");
  const [quantityUsed, setQuantityUsed] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { createUsageLog } = useUsageLogStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!date || !inventoryId || !quantityUsed) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    if (Number(quantityUsed) <= 0) {
      setErrorMessage("Quantity used must be greater than 0.");
      return;
    }

    // Clear error message if validation passes
    setErrorMessage("");

    const newUsage = {
      inventoryId,
      date,
      quantityUsed: Number(quantityUsed),
    };

    try {
      await createUsageLog(newUsage);
      setSuccessMessage("Usage log added successfully!");
      setTimeout(() => {
        navigate("/usageLog"); // Navigate back to the usage log page after 1.5 seconds
      }, 1500);
    } catch (error) {
      // Improved error handling
      setErrorMessage(
        "Error adding usage log: " +
          (error?.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add Usage Log
      </h2>

      {/* Display Success Message */}
      {successMessage && (
        <div className="mb-4 text-green-500 font-semibold">
          {successMessage}
        </div>
      )}

      {/* Display Error Message */}
      {errorMessage && (
        <div className="mb-4 text-red-500 font-semibold">{errorMessage}</div>
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
          <label className="block text-gray-700">Inventory ID</label>
          <input
            type="text"
            value={inventoryId}
            onChange={(e) => setInventoryId(e.target.value)} // Added InventoryId field
            className="w-full p-2 border rounded-md"
            placeholder="Enter inventory ID"
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
            min="1"
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
