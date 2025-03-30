import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import InventoryList from "./Pages/InventoryList";
import AddInventoryPage from "./Pages/AddInventoryPage";
import UpdateInventoryPage from "./Pages/UpdateInventory";
import PurchaseLogList from "./Pages/PurchaseLogList";
import PurchaseLogPage from "./Pages/PurchaseLogPage .jsx";
import UsageLogPage from "./Pages/UsageLogPage .jsx";
import UsageLogList from "./Pages/UsageLogList .jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/addInventory" element={<AddInventoryPage />} />
        <Route path="/updateInventory/:id" element={<UpdateInventoryPage />} />
        <Route path="/purchaseLog" element={<PurchaseLogList />} />
        <Route path="/addPurchaseLog" element={<PurchaseLogPage />} />
        <Route path="/usageLog" element={<UsageLogPage />} />
        <Route path="/usageLogList" element={<UsageLogList />} />
      </Routes>
    </Router>
  );
};

export default App;
