import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePurchaseLogStore } from "../store/usePurchaseLogStore .js"; // Corrected import path

const PurchaseLogPage = () => {
  const [date, setDate] = useState("");
  const [inventoryId, setInventoryId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addPurchaseLog } = usePurchaseLogStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!date || !inventoryId || !quantity) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    if (Number(quantity) <= 0) {
      setErrorMessage("Quantity must be greater than 0.");
      return;
    }

    setErrorMessage("");

    // Create the new purchase object
    const newPurchase = {
      inventoryId,
      date,
      quantity: Number(quantity),
    };

    try {
      // Attempt to add the purchase log
      await addPurchaseLog(newPurchase);
      setSuccessMessage("Purchase log added successfully!");
      setTimeout(() => {
        navigate("/purchaseLog"); // Navigate to the purchase log page after 1.5 seconds
      }, 1500);
    } catch (error) {
      // Improved error handling
      setErrorMessage(
        "Error adding purchase log: " +
          (error?.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add Purchase Log
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
        {/* Date input */}
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Inventory ID input */}
        <div className="mb-4">
          <label className="block text-gray-700">Inventory ID</label>
          <input
            type="text"
            value={inventoryId}
            onChange={(e) => setInventoryId(e.target.value)} // Using inventoryId
            className="w-full p-2 border rounded-md"
            placeholder="Enter inventory ID"
          />
        </div>

        {/* Quantity input */}
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} // Using quantity
            className="w-full p-2 border rounded-md"
            placeholder="Enter quantity"
            min="1"
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseLogPage;
