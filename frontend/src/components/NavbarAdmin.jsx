import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
  const { user } = useContext(AuthContext);

  // 🔒 Only admins see this navigation bar
  if (!user || !user.isAdmin) return null;

  return (
    <div className="bg-[#2E2C5A] text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap justify-between gap-6 text-sm font-semibold">

        <Link
          to="/admin"
          className="hover:underline underline-offset-4 hover:decoration-8 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="hover:underline underline-offset-4 hover:decoration-8 transition"
        >
          Products
        </Link>

        <Link
          to="/admin/users"
          className="hover:underline underline-offset-4 hover:decoration-8 transition"
        >
          Users
        </Link>

        <Link
          to="/admin/messages"
          className="hover:underline underline-offset-4 hover:decoration-8 transition"
        >
          Messages
        </Link>
        <Link
          to="/admin/tailoring-requests"
          className="hover:underline underline-offset-4 hover:decoration-8 transition"
        >
          ViewTailorings
        </Link>


        <Link
          to="/admin/orders"
          className="hover:underline underline-offset-4 hover:decoration-8 transition"
        > 
          Orders
        </Link>

      </div>
    </div>
  );
};

export default NavbarAdmin;
