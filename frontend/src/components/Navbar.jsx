import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // 👉 Fonction qui déclenche la traduction Google Translate
  const handleLanguageChange = (lang) => {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      <header className="backdrop-blur-xl bg-white/80 shadow-md sticky top-0 z-50 border-b border-[#E5E3DF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">

            {/* LOGO */}
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-tight text-[#39386A] mr-2 -ml-4"
            >
              BAOLTISSU
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-3xl mr-2 bg-[#39386A] rounded-lg p-1 text-white"
              onClick={() => setOpenMenu(true)}
            >
              <Menu />
            </button>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4">

              {/* SEARCH (DESKTOP) */}
              <form
                onSubmit={handleSearch}
                className="hidden md:flex items-center bg-white border border-[#E5E3DF] shadow-inner rounded-full px-4 py-2"
              >
                <input
                  type="text"
                  placeholder="Search an item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent focus:outline-none w-48 placeholder-gray-400 text-sm"
                />
                <button className="text-[#39386A] font-bold text-lg">🔍</button>
              </form>

              {/* LANGUAGE BUTTON */}
              <select
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="border border-[#E5E3DF] rounded-full px-3 py-1 bg-white shadow-sm text-gray-800 font-medium"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>

              {/* CART */}
              <Link
                to="/cart"
                className="relative flex items-center text-2xl hover:text-[#39386A] transition"
              >
                <span className="text-3xl">🛒</span>

                {cartCount > 0 && (
                  <span
                    className="absolute -right-2 -top-2 bg-red-600 text-white text-xs font-bold 
                    w-5 h-5 flex items-center justify-center rounded-full shadow-md"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* LOGIN / LOGOUT */}
              {!user ? (
                <Link
                  to="/login"
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                  bg-[#39386A] text-white shadow-md hover:bg-[#2f2e59] hover:scale-110 
                  transition-all duration-200"
                  title="Login"
                >
                  <span className="text-2xl">👤</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                  bg-red-600 text-white shadow-md hover:bg-red-700 hover:scale-110 
                  transition-all duration-200"
                  title="Logout"
                >
                  <span className="text-2xl">👤</span>
                </button>
              )}
            </div>
          </div>

          {/* NAV LINKS (DESKTOP) */}
          <nav className="hidden md:flex items-center justify-center space-x-8 py-4 text-white font-semibold text-sm tracking-wide bg-[#39386A]">
            <Link to="/" className="hover:underline underline-offset-4 hover:decoration-8 transition">Home</Link>
            <Link to="/fabrics" className="hover:underline underline-offset-4 hover:decoration-8 transition">Fabrics</Link>
            <Link to="/ready-to-wear" className="hover:underline underline-offset-4 hover:decoration-8 transition">Ready-to-wear</Link>
            <Link to="/accessories" className="hover:underline underline-offset-4 hover:decoration-8 transition">Accessories</Link>
            <Link to="/tailoring" className="hover:underline underline-offset-4 hover:decoration-8 transition">Tailoring</Link>
            <Link to="/about" className="hover:underline underline-offset-4 hover:decoration-8 transition">About</Link>
            <Link to="/contact" className="hover:underline underline-offset-4 hover:decoration-8 transition">Contact</Link>
          </nav>
        </div>
      </header>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setOpenMenu(false)}>
          <div
            className="absolute left-0 top-0 w-72 h-full bg-white shadow-xl p-6 space-y-6 animate-slideRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button className="text-3xl text-gray-700" onClick={() => setOpenMenu(false)}>
                <X />
              </button>
            </div>

            {/* MOBILE SEARCH */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white border border-[#E5E3DF] rounded-full px-4 py-2 shadow-inner"
            >
              <input
                type="text"
                placeholder="Search an item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent focus:outline-none w-full placeholder-gray-400 text-sm"
              />
              <button className="text-[#39386A] font-bold text-lg">🔍</button>
            </form>

            {/* MOBILE NAV LINKS */}
            <nav className="flex flex-col space-y-4 text-lg font-semibold text-gray-800">
              <Link to="/" onClick={() => setOpenMenu(false)}>Home</Link>
              <Link to="/fabrics" onClick={() => setOpenMenu(false)}>Fabrics</Link>
              <Link to="/ready-to-wear" onClick={() => setOpenMenu(false)}>Ready-to-wear</Link>
              <Link to="/accessories" onClick={() => setOpenMenu(false)}>Accessories</Link>
              <Link to="/tailoring" onClick={() => setOpenMenu(false)}>Tailoring</Link>
              <Link to="/about" onClick={() => setOpenMenu(false)}>About</Link>
              <Link to="/contact" onClick={() => setOpenMenu(false)}>Contact</Link>
            </nav>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>
        {`
          @keyframes slideRight {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          .animate-slideRight {
            animation: slideRight 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
