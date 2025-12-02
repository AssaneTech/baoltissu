import React, { useState, useEffect } from "react";
import API from "../../api/API";
import { useNavigate } from "react-router-dom";

const Tailoring = () => {
  const navigate = useNavigate();

  // ========== FORM STATES ==========
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    chest: "",
    waist: "",
    hip: "",
    length: "",
    fabric: "Wax",
    color: "",
    notes: "",
  });

  // File upload
  const [modelImage, setModelImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const [sending, setSending] = useState(false);

  // Inspiration images from backend
  const [inspiration, setInspiration] = useState([]);

  // TEXTS
  const t = {
    title: "Custom Tailoring",
    subtitle:
      "Share your inspirations. Our designers craft your outfit with precision, elegance and premium finishing.",
    formTitle: "Tailoring Request",
    name: "Full Name",
    phone: "Phone number",
    email: "Email",
    model: "Model picture",
    upload: "Upload",
    size: "Measurements",
    chest: "Chest (cm)",
    waist: "Waist (cm)",
    hip: "Hips (cm)",
    length: "Desired length (cm)",
    fabric: "Preferred fabric",
    fabrics: ["Wax", "Bazin", "Voile", "Satin", "Embroidered"],
    color: "Color",
    note: "Additional notes",
    send: "Submit request",
    inspirationTitle: "Tailoring Inspiration",
    inspirationSubtitle:
      "Your ideas, our craftsmanship. Some personalized styles we can create.",
  };

  // ===========================================================
  // ============== FETCH INSPIRATION IMAGES ===================
  // ===========================================================
  useEffect(() => {
    const fetchInspiration = async () => {
      try {
        const res = await API.get("/api/products");

        const looks = res.data
          .filter(
            (p) =>
              p.category === "ready-to-wear" &&
              p.images &&
              p.images.length > 0
          )
          .slice(0, 4);

        setInspiration(looks);
      } catch (err) {
        console.error("ERROR LOADING INSPIRATION:", err);
      }
    };

    fetchInspiration();
  }, []);

  // ===========================================================
  // ====================== SUBMIT HANDLER ======================
  // ===========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);

    try {
      const fd = new FormData();

      Object.keys(form).forEach((key) => {
        fd.append(key, form[key]);
      });

      if (modelImage) {
        fd.append("modelImage", modelImage);
      }

      await API.post("/api/tailoring", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/tailoring-success");
    } catch (err) {
      console.error("TAILORING REQUEST FAILED:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  };

  // ===========================================================
  // ========================== UI =============================
  // ===========================================================
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed text-lg">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ================= FORM ================= */}
        <div className="bg-[#F7F3EE] border border-[#E5E3DF] rounded-3xl shadow-sm p-10">

          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.formTitle}</h2>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                {t.name}
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 shadow-inner bg-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                {t.phone}
              </label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 shadow-inner bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                {t.email}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 shadow-inner bg-white"
              />
            </div>

            {/* Upload */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">{t.model}</label>

              <label className="border border-[#DAD7D2] rounded-lg px-4 py-3 shadow-inner bg-white flex items-center justify-between cursor-pointer">
                <span>{fileName || "..."}</span>
                <span className="text-[#39386A] font-semibold">{t.upload}</span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setModelImage(e.target.files[0]);
                    setFileName(e.target.files[0]?.name || "");
                  }}
                />
              </label>
            </div>

            {/* Measurements */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">{t.size}</label>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder={t.chest}
                  value={form.chest}
                  onChange={(e) => setForm({ ...form, chest: e.target.value })}
                  className="border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner"
                />

                <input
                  type="number"
                  placeholder={t.waist}
                  value={form.waist}
                  onChange={(e) => setForm({ ...form, waist: e.target.value })}
                  className="border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner"
                />

                <input
                  type="number"
                  placeholder={t.hip}
                  value={form.hip}
                  onChange={(e) => setForm({ ...form, hip: e.target.value })}
                  className="border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner"
                />

                <input
                  type="number"
                  placeholder={t.length}
                  value={form.length}
                  onChange={(e) => setForm({ ...form, length: e.target.value })}
                  className="border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner"
                />
              </div>
            </div>

            {/* Fabric */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">{t.fabric}</label>
              <select
                value={form.fabric}
                onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner"
              >
                {t.fabrics.map((f, i) => (
                  <option key={i}>{f}</option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">{t.color}</label>
              <input
                type="text"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                placeholder="Blue, Black..."
                className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">{t.note}</label>
              <textarea
                rows="4"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              disabled={sending}
              className="w-full py-4 bg-[#39386A] text-white rounded-full font-semibold hover:bg-[#2F2E59] transition"
            >
              {sending ? "Sending..." : t.send}
            </button>
          </form>
        </div>

        {/* ================= INSPIRATION IMAGES ================= */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-5">
            {t.inspirationTitle}
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {t.inspirationSubtitle}
          </p>

          <div className="grid grid-cols-2 gap-5">

            {inspiration.map((item, i) => (
              <div
                key={i}
                className="h-56 rounded-3xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Si moins de 4 images, compléter avec des cases neutres */}
            {Array.from({ length: 4 - inspiration.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="bg-[#EAE8E4] h-56 rounded-3xl shadow-inner"
              ></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tailoring;
