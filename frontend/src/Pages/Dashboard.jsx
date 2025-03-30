import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [stockSummary, setStockSummary] = useState({
    totalItems: 0,
    lowStockItems: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockSummary = async () => {
      try {
        const response = await axiosInstance.get("/inventory/stockSummary");
        setStockSummary(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock summary:", error);
        setError("Failed to fetch stock summary.");
        setLoading(false);
      }
    };
    fetchStockSummary();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Inventory Dashboard
      </h1>
      {loading && !error ? (
        <div className="text-center text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Stock Summary</h2>
            <p className="text-lg mt-2">
              Total Items:{" "}
              <span className="font-bold">{stockSummary.totalItems}</span>
            </p>
            <p className="text-lg mt-2">
              Low Stock Items:{" "}
              <span className="font-bold text-red-500">
                {stockSummary.lowStockItems.length}
              </span>
            </p>
            {stockSummary.lowStockItems.length > 0 && (
              <div className="mt-4 p-4 bg-red-100 rounded-lg">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertCircle className="text-red-600" size={20} /> Low Stock
                  Alerts
                </h3>
                <ul className="mt-2 text-sm text-red-600">
                  {stockSummary.lowStockItems.map((item) => (
                    <li
                      key={item._id}
                      className="py-1 border-b last:border-b-0"
                    >
                      {item.name} -{" "}
                      <span className="font-semibold">{item.currentStock}</span>{" "}
                      in stock
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
