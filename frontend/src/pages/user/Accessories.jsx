import React, { useEffect, useState } from "react";
import API from "../../api/API";
import { useCart } from "../../context/CartContext";

const Accessories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const t = {
    title: "Accessories & Fashion",
    subtitle:
      "Explore our premium collection: bags, shoes, jewelry, caps, scarves and stylish fashion accessories.",
    featured: "Available items",
    add: "Add to cart",
    from: "From",
    currency: "FCFA",
    loading: "Loading...",
    empty: "No accessories available.",
  };

  // ======== FETCH ACCESSORIES ONLY ========
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/products");

        const accessories = res.data.filter(
          (item) => item.category === "accessories"
        );

        setProducts(accessories);
      } catch (error) {
        console.error("Error loading accessories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
          {t.title}
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="md:col-span-3">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t.featured}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">{t.loading}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white border border-[#E5E3DF] rounded-xl shadow hover:shadow-lg transition p-4"
              >
                <div className="bg-gray-200 h-48 rounded-xl mb-4 overflow-hidden">
                  {p.images?.length > 0 && (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {p.name}
                </h3>

                <p className="text-gray-600 mt-1">
                  {t.from} {p.price.toLocaleString()} {t.currency}
                </p>

                <button
                  onClick={() => addToCart(p)}
                  className="mt-4 w-full py-2 bg-[#39386A] text-white rounded-full font-medium hover:bg-[#2F2E59] cursor-pointer transition"
                >
                  {t.add}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Accessories;
