import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/API";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    try {
      await API.delete(`/api/products/${id}`);
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Unable to delete product (unauthorized).");
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          🛍️ Product Management
        </h1>

        <Link
          to="/admin/products/new"
          className="px-6 py-3 bg-[#39386A] text-white rounded-xl font-semibold hover:bg-[#2F2E59] transition"
        >
          ➕ Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-3xl shadow-lg border border-gray-200">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-4 px-6 font-semibold text-gray-700">Product</th>
              <th className="py-4 px-6 font-semibold text-gray-700">Category</th>
              <th className="py-4 px-6 font-semibold text-gray-700">Price</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                {/* Name */}
                <td className="py-4 px-6 font-medium text-gray-900">
                  {p.name}
                </td>

                {/* Category */}
                <td className="py-4 px-6">
                  <span
                    className="
                      px-3 py-1 rounded-full text-sm font-semibold
                      capitalize
                      bg-gray-200 text-gray-700
                    "
                  >
                    {p.category}
                  </span>
                </td>

                {/* Price */}
                <td className="py-4 px-6 font-bold text-gray-800">
                  {p.price.toLocaleString()} FCFA
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">

                    <Link
                      to={`/admin/products/${p._id}/edit`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      ✏️ Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      🗑️ Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-lg">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
