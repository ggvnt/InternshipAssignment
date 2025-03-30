import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryList from "./Pages/InventoryList.jsx";
import AddInventoryPage from "./Pages/AddInventoryPage.jsx";
import UpdateInventoryPage from "./Pages/UpdateInventory.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryList />} />
        <Route path="/addInventory" element={<AddInventoryPage />} />
        <Route path="/updateInventory/:id" element={<UpdateInventoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
