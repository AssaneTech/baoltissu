import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/API";

const Home = () => {

  const [products, setProducts] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const t = {
    en: {
      heroTitle: "Fabrics, Fashion & Custom Tailoring",
      heroSubtitle:
        "Explore BAOLTISSU premium fashion: elegant fabrics, modern outfits, stylish accessories and professional tailoring.",
      shopNow: "Browse items",
      categoriesTitle: "Categories",
      tissus: "Fabrics",
      pret: "Ready-to-wear",
      couture: "Tailoring",
      accessoires: "Accessories",
      featuredTitle: "Featured Items",
      featuredBtn: "Add to cart",
      customTitle: "Create your custom outfit",
      customDescription:
        "Send your model and measurements, and let our designers craft a unique, elegant and perfectly fitted outfit.",
      customBtn: "See tailoring service",
    },
  };

  // ========= FETCH PRODUCTS =========
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/products");
        setProducts(res.data);

        const imgs = res.data.flatMap((p) => p.images || []).filter(Boolean);
        setHeroImages(imgs);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ========= HERO IMAGE SLIDER =========
  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <div className="w-full">

      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-gradient-to-r from-[#F7F3EE] to-[#FFFFFF] text-black py-32 px-6 lg:px-20 overflow-hidden">

        <div className="max-w-4xl relative z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 text-[#0A0A0A]">
            {t.en.heroTitle}
          </h1>

          <p className="text-lg text-[#6D6D6D] max-w-xl leading-relaxed mb-10">
            {t.en.heroSubtitle}
          </p>

          <Link
            to="/fabrics"
            className="px-8 py-4 bg-[#39386A] text-white font-semibold rounded-full shadow-md hover:bg-[#2F2E59] transition"
          >
            {t.en.shopNow}
          </Link>
        </div>

        {heroImages.length > 0 && (
          <div className="absolute right-10 top-10 w-72 h-72 opacity-40 rounded-full overflow-hidden shadow-xl">
            <img
              src={heroImages[currentHeroIndex]}
              alt="Hero fabric"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </section>

      {/* ========== CATEGORIES ========== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-14 text-center">
          {t.en.categoriesTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">

          <Link to="/tissus" className="bg-[#F6F4F1] rounded-xl shadow-sm hover:shadow-lg transition p-10 text-center">
            <div className="text-6xl mb-6">🧵</div>
            <p className="text-xl font-semibold">{t.en.tissus}</p>
          </Link>

          <Link to="/pret-a-porter" className="bg-[#F6F4F1] rounded-xl shadow-sm hover:shadow-lg transition p-10 text-center">
            <div className="text-6xl mb-6">👗</div>
            <p className="text-xl font-semibold">{t.en.pret}</p>
          </Link>

          <Link to="/couture" className="bg-[#F6F4F1] rounded-xl shadow-sm hover:shadow-lg transition p-10 text-center">
            <div className="text-6xl mb-6">✂️</div>
            <p className="text-xl font-semibold">{t.en.couture}</p>
          </Link>

          <Link to="/accessoires" className="bg-[#F6F4F1] rounded-xl shadow-sm hover:shadow-lg transition p-10 text-center">
            <div className="text-6xl mb-6">👜</div>
            <p className="text-xl font-semibold">{t.en.accessoires}</p>
          </Link>

        </div>
      </section>

      {/* ========== FEATURED PRODUCTS ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          {t.en.featuredTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {products
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((p) => (
              <div key={p._id} className="bg-white border border-[#E5E3DF] rounded-xl shadow hover:shadow-lg transition p-4">
                <div className="bg-gray-200 h-56 rounded-lg mb-4 overflow-hidden">
                  {p.images?.length > 0 && (
                    <img
                      src={p.images[0]}
                      className="w-full h-full object-cover"
                      alt={p.name}
                    />
                  )}
                </div>

                <p className="text-xl font-semibold text-gray-800 mb-3">
                  {p.name}
                </p>


              </div>
            ))}
        </div>
      </section>

      {/* ========== CUSTOM TAILORING SECTION ========== */}
      <section className="bg-[#F7F3EE] py-28 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.en.customTitle}</h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.en.customDescription}
        </p>

        <Link
          to="/couture"
          className="px-8 py-4 bg-[#39386A] text-white rounded-full font-semibold hover:bg-[#2F2E59] transition"
        >
          {t.en.customBtn}
        </Link>
      </section>

    </div>
  );
};

export default Home;
