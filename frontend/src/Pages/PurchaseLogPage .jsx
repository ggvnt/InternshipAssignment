import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePurchaseLogStore } from "../store/usePurchaseLogStore .js";

const PurchaseLogPage = () => {
  const [date, setDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const { addPurchaseLog } = usePurchaseLogStore(); // Ensure the store is used correctly
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!date || !itemName || !category || !quantity) {
      alert("Please fill out all fields.");
      return;
    }

    // Create the new purchase log object
    const newPurchase = {
      date,
      itemName,
      category,
      quantity: Number(quantity), // Ensure quantity is a number
    };

    try {
      // Attempt to add the purchase log
      await addPurchaseLog(newPurchase); // Call the method from Zustand store
      navigate("/purchaseLog"); // Navigate to the purchase log page
    } catch (error) {
      console.error("Error adding purchase log:", error);
      alert("Error adding purchase log: " + error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add Purchase Log
      </h2>
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

        {/* Item Name input */}
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

        {/* Category input */}
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

        {/* Quantity input */}
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
