import React, { useEffect, useState } from "react";
import { useUsageLogStore } from "../store/useUsageLogStore";
import { useNavigate } from "react-router-dom"; // Use useNavigate for react-router v6

const UsageLogList = () => {
  const { usageLog = [], fetchUsageLogs } = useUsageLogStore();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate(); // useNavigate for React Router v6

  useEffect(() => {
    fetchUsageLogs();
  }, [fetchUsageLogs]);

  const filteredUsage = usageLog.filter((usage) =>
    usage.itemName.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsage = filteredUsage.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  // Function to handle the 'Add Usage' button click
  const handleAddUsageClick = () => {
    navigate("/usageLog"); // Navigate to the Add Usage page (replace with actual route if different)
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Usage Log
      </h2>

      {/* Add Usage button */}
      <div className="flex justify-between mb-4">
        <div>
          <input
            type="text"
            className="p-2 border rounded-md"
            placeholder="Search by item name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddUsageClick} // Button click handler
        >
          Add Usage
        </button>
      </div>

      <div>
        <button
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-md"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      <div>
        {sortedUsage.length === 0 ? (
          <p>No usage logs found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
            <table className="min-w-full text-left table-auto">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 border-b">Date</th>
                  <th className="py-3 px-6 border-b">Item Name</th>
                  <th className="py-3 px-6 border-b">Category</th>
                  <th className="py-3 px-6 border-b">Quantity Used</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {sortedUsage.map((usage) => (
                  <tr key={usage._id}>
                    <td className="py-4 px-6 border-b">{usage.date}</td>
                    <td className="py-4 px-6 border-b">{usage.itemName}</td>
                    <td className="py-4 px-6 border-b">{usage.category}</td>
                    <td className="py-4 px-6 border-b">{usage.quantityUsed}</td>
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

export default UsageLogList;
