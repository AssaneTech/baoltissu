// src/pages/admin/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import { ShoppingBag, Search, Trash2, CheckCircle, XCircle } from "lucide-react";
import API from "../../api/API";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");

  // ================= LOAD ORDERS =================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data);
      } catch (err) {
        console.error("Error loading orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // ================= UPDATE ORDER STATUS =================
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/api/orders/${id}/status`,
        { isPaid: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? res.data : o))
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  // ================= DELETE ORDER =================
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  // ================= SEARCH FILTER =================
  const filtered = orders.filter(
    (o) =>
      o._id.toLowerCase().includes(query.toLowerCase()) ||
      (o.user?.name || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10">

      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <ShoppingBag size={28} />
          Order Management
        </h1>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-8 max-w-lg">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search an order..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-full border shadow-sm focus:outline-[#39386A]"
        />
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-2xl shadow border p-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-gray-500 uppercase">
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
              <th className="py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((o) => (
              <tr key={o._id} className="hover:bg-gray-50">
                <td className="py-3 font-medium">{o._id}</td>
                <td className="py-3">{o.user?.name || "—"}</td>
                <td className="py-3">{o.totalPrice.toLocaleString()} FCFA</td>

                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      o.isPaid
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {o.isPaid ? "Paid" : "Pending"}
                  </span>
                </td>

                <td className="py-3 text-gray-500">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>

                {/* ACTION BUTTONS */}
                <td className="py-3 text-center flex gap-2 justify-center">

                  {/* MARK PAID / UNPAID */}
                  <button
                    onClick={() => updateStatus(o._id, !o.isPaid)}
                    className={`px-3 py-1 rounded-full text-white text-xs flex items-center gap-1 ${
                      o.isPaid ? "bg-yellow-600" : "bg-green-600"
                    }`}
                  >
                    {o.isPaid ? (
                      <>
                        <XCircle size={14} /> Mark Pending
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} /> Mark Paid
                      </>
                    )}
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteOrder(o._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-full text-xs flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
