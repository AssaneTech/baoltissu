import React, { useEffect, useState } from "react";
import API from "../../api/API";
import { useCart } from "../../context/CartContext";

const Fabrics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const t = {
    en: {
      title: "Fabric Collection",
      subtitle:
        "Discover our premium fabrics selected for your modern and elegant creations.",
      featured: "Available Fabrics",
      add: "Add to cart",
      from: "From",
      currency: "FCFA",
    }
  };

  // Fetch fabrics
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/products");

        const onlyTissus = res.data.filter(
          (item) => item.category === "fabrics"
        );

        setProducts(onlyTissus);
      } catch (error) {
        console.error("Error loading fabrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 py-20">

      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {t.en.title}
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          {t.en.subtitle}
        </p>
      </div>

      <div className="md:col-span-3">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t.en.featured}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No fabric available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white border border-[#E5E3DF] rounded-3xl shadow hover:shadow-lg transition p-5"
              >
                <div className="bg-gray-200 h-56 rounded-2xl mb-5 overflow-hidden">
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
                  {t.en.from} {p.price.toLocaleString()} {t.en.currency}
                </p>

                <button
                  onClick={() => addToCart(p)}
                  className="mt-5 w-full py-3 bg-[#39386A] text-white rounded-full font-semibold hover:bg-[#2F2E59] cursor-pointer transition"
                >
                  {t.en.add}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fabrics;
