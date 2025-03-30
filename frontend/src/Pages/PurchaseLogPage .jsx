import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePurchaseLogStore } from "../store/usePurchaseLogStore .js";

const PurchaseLogPage = () => {
  const [date, setDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const { addPurchaseLog } = usePurchaseLogStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !itemName || !category || !quantity) {
      alert("Please fill out all fields.");
      return;
    }

    const newPurchase = {
      date,
      itemName,
      category,
      quantity: Number(quantity),
    };

    await addPurchaseLog(newPurchase);
    navigate("/purchaseLog");
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add Purchase Log
      </h2>
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
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter quantity"
          />
        </div>

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
