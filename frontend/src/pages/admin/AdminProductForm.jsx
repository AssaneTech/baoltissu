import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/API";

const categories = ["fabrics", "ready-to-wear", "accessories"];
const availableColors = ["Blue", "Red", "Black", "White", "Gold", "Green", "Yellow"];
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    images: [""],
    colors: [],
    sizes: [],
    description: "",
  });

  useEffect(() => {
    if (isEdit) loadProduct();
  }, []);

  const loadProduct = async () => {
    const res = await API.get(`/api/products/${id}`);
    setProduct({
      ...res.data,
      images: res.data.images?.length ? res.data.images : [""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...product,
      images: product.images.filter((url) => url.trim() !== "")
    };

    if (isEdit) {
      await API.put(`/api/products/${id}`, payload);
    } else {
      await API.post("/api/products", payload);
    }
    navigate("/admin/products");
  };

  const updateImage = (value, index) => {
    const imgs = [...product.images];
    imgs[index] = value;
    setProduct({ ...product, images: imgs });
  };

  const addImageField = () => {
    setProduct({ ...product, images: [...product.images, ""] });
  };

  const removeImageField = (index) => {
    const imgs = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: imgs.length ? imgs : [""] });
  };

  const toggleColor = (c) => {
    setProduct({
      ...product,
      colors: product.colors.includes(c)
        ? product.colors.filter((x) => x !== c)
        : [...product.colors, c],
    });
  };

  const toggleSize = (s) => {
    setProduct({
      ...product,
      sizes: product.sizes.includes(s)
        ? product.sizes.filter((x) => x !== s)
        : [...product.sizes, s],
    });
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
        {isEdit ? "✏️ Edit Product" : "➕ Add Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-10 bg-white p-10 rounded-3xl shadow-lg border border-gray-200"
      >
        {/* --- MAIN INFO --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="font-semibold text-gray-700">Product Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-[#39386A]"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Price (FCFA)</label>
              <input
                type="number"
                className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-[#39386A]"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Category</label>
              <select
                className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-[#39386A]"
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                required
              >
                <option value="">-- Select --</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Stock</label>
              <input
                type="number"
                className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-[#39386A]"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* --- IMAGES --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Images</h2>

          <div className="space-y-4">
            {product.images.map((img, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-[#39386A]"
                  value={img}
                  onChange={(e) => updateImage(e.target.value, index)}
                />

                {product.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="px-3 py-2 rounded-lg bg-red-600 text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="px-4 py-2 bg-gray-100 rounded-xl border"
              onClick={addImageField}
            >
              + Add an image
            </button>
          </div>
        </div>

        {/* --- COLORS --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Colors</h2>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => toggleColor(c)}
                className={`px-4 py-2 rounded-xl border transition ${
                  product.colors.includes(c)
                    ? "bg-[#39386A] text-white"
                    : "bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* --- SIZES --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Sizes</h2>
          <div className="flex flex-wrap gap-3">
            {availableSizes.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => toggleSize(s)}
                className={`px-4 py-2 rounded-xl border transition ${
                  product.sizes.includes(s)
                    ? "bg-green-600 text-white"
                    : "bg-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* --- DESCRIPTION --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Description</h2>
          <textarea
            className="w-full h-32 p-3 border rounded-xl focus:ring-2 focus:ring-[#39386A]"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            required
          ></textarea>
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <button
          type="submit"
          className="w-full py-4 bg-[#39386A] text-white rounded-2xl text-xl font-semibold hover:bg-[#2F2E59] transition"
        >
          {isEdit ? "💾 Save Changes" : "🚀 Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
