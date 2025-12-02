import React, { useEffect, useState } from "react";
import API from "../../api/API";

const AdminDashboard = () => {
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [loading, setLoading] = useState(true);

  


  const formatFCFA = (value) =>
    Number(value).toLocaleString("fr-FR") + " FCFA";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resProducts = await API.get("/api/products/products-number");
        setProducts(resProducts.data.productsNumber);
        const resOrders = await API.get("/api/orders/orders-number");
        setOrders(resOrders.data.ordersNumber);
        const resCustomers = await API.get("/api/users/customers-number");
        setCustomers(resCustomers.data.customersNumber);
      } catch (err) {
        console.log("ERROR DASHBOARD:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">

      {/* Titre */}
      <h1 className="text-3xl font-extrabold mb-8">Dashboard</h1>

      {/* Cartes simples */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Products</p>
          <p className="text-3xl font-bold text-[#39386A]">{products}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Orders</p>
          <p className="text-3xl font-bold text-[#39386A]">{orders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Customers</p>
          <p className="text-3xl font-bold text-[#39386A]">{customers}</p>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
