import React, { useEffect, useState } from "react";
import { usePurchaseLogStore } from "../store/usePurchaseLogStore .js";
import { useNavigate } from "react-router-dom";

const PurchaseLogList = () => {
  const { purchaseLogs, fetchPurchaseLogs } = usePurchaseLogStore();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPurchaseLogs();
  }, [fetchPurchaseLogs]);

  const filteredPurchases = purchaseLogs.filter((purchase) =>
    purchase.itemName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPurchaseClick = () => {
    navigate("/addPurchaseLog");
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Purchase Log
      </h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Search by item name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleAddPurchaseClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Purchase
        </button>
      </div>

      <div>
        {filteredPurchases.length === 0 ? (
          <p>No purchases found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
            <table className="min-w-full text-left table-auto">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 border-b">Date</th>
                  <th className="py-3 px-6 border-b">Item Name</th>
                  <th className="py-3 px-6 border-b">Category</th>
                  <th className="py-3 px-6 border-b">Quantity</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {filteredPurchases.map((purchase) => (
                  <tr key={purchase._id}>
                    <td className="py-4 px-6 border-b">{purchase.date}</td>
                    <td className="py-4 px-6 border-b">{purchase.itemName}</td>
                    <td className="py-4 px-6 border-b">{purchase.category}</td>
                    <td className="py-4 px-6 border-b">{purchase.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseLogList;
