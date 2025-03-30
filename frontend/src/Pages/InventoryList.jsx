import React, { useEffect } from "react";
import { useInventoryStore } from "../store/InventoryStore.js";
import { useNavigate } from "react-router-dom";

const InventoryList = () => {
  const { inventory, fetchInventory, deleteItem, error, loading } =
    useInventoryStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
    }
  };

  const handleAddNew = () => {
    navigate("/addInventory");
  };

  const handleEdit = (id) => {
    navigate(`/updateInventory/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Inventory List
      </h2>

      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={handleAddNew}
        >
          Add New Inventory Product
        </button>
      </div>

      {loading && (
        <div className="text-center text-blue-500 font-semibold">
          Loading...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}

      {!loading && !error && inventory.length > 0 && (
        <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 border-b">Name</th>
                <th className="py-3 px-6 border-b">Category</th>
                <th className="py-3 px-6 border-b">Initial Stock</th>
                <th className="py-3 px-6 border-b">Purchased</th>
                <th className="py-3 px-6 border-b">Used</th>
                <th className="py-3 px-6 border-b">Current Stock</th>
                <th className="py-3 px-6 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {inventory.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-4 px-6 border-b">{item.name}</td>
                  <td className="py-4 px-6 border-b">{item.category}</td>
                  <td className="py-4 px-6 border-b">{item.initialStock}</td>
                  <td className="py-4 px-6 border-b">{item.purchased}</td>
                  <td className="py-4 px-6 border-b">{item.used}</td>
                  <td className="py-4 px-6 border-b">{item.currentStock}</td>
                  <td className="py-4 px-6 border-b flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && inventory.length === 0 && (
        <div className="text-center text-gray-500 font-semibold">
          No inventory items found.
        </div>
      )}
    </div>
  );
};

export default InventoryList;
