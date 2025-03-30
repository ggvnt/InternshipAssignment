// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom"; // We'll use useLocation to detect the active route

const Navbar = () => {
  const location = useLocation(); // Hook to get current path for active link highlighting

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-semibold">
          <Link to="/">Logo</Link> {/* Replace with your logo */}
        </div>

        <div className="hidden md:flex space-x-10">
          <NavLink to="/" currentPath={location.pathname} label="Home" />
          <NavLink
            to="/inventory"
            currentPath={location.pathname}
            label="Inventory List"
          />
          <NavLink
            to="/purchaseLog"
            currentPath={location.pathname}
            label="Purchase Log"
          />
          <NavLink
            to="/usageLogList"
            currentPath={location.pathname}
            label="Usage Log"
          />
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

// NavLink component to style the active link
const NavLink = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`text-lg font-medium transition duration-300 ease-in-out ${
        isActive
          ? "text-yellow-300 border-b-4 border-yellow-300"
          : "text-white hover:text-yellow-300"
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
