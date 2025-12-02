import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F7F3EE] pt-16 pb-10 px-6 mt-20 border-t border-[#E5E3DF]">

      {/* TOP */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#39386A] mb-4">
            BAOLTISSU
          </h1>
          <p className="text-gray-600 max-w-xs leading-relaxed">
            Premium fabrics • Modern fashion • Haute couture
          </p>
        </div>

        {/* COLLECTIONS */}
        <div>
          <h3 className="text-xs font-bold text-gray-800 mb-4 tracking-widest uppercase">
            Collections
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/fabrics" className="hover:text-[#39386A] transition">
                Fabrics
              </Link>
            </li>

            <li>
              <Link to="/ready-to-wear" className="hover:text-[#39386A] transition">
                Ready-to-wear
              </Link>
            </li>

            <li>
              <Link to="/tailoring" className="hover:text-[#39386A] transition">
                Custom tailoring
              </Link>
            </li>

            <li>
              <Link to="/accessories" className="hover:text-[#39386A] transition">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* INFO */}
        <div>
          <h3 className="text-xs font-bold text-gray-800 mb-4 tracking-widest uppercase">
            Info
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/about" className="hover:text-[#39386A] transition">
                About us
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-[#39386A] transition">
                Contact
              </Link>
            </li>

            <li>
              <Link to="/privacy-policy" className="hover:text-[#39386A] transition">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/terms" className="hover:text-[#39386A] transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-xs font-bold text-gray-800 mb-4 tracking-widest uppercase">
            Join our universe
          </h3>

          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            Receive exclusive fabrics, new arrivals, and private offers.
          </p>

          <div className="flex items-center overflow-hidden rounded-full border border-[#DAD7D2] bg-white">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 text-sm bg-transparent focus:outline-none"
            />
            <button className="px-5 py-2 bg-[#39386A] text-white text-sm font-semibold hover:bg-[#2F2E59] transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* SOCIALS */}
      <div className="max-w-7xl mx-auto mt-12 flex items-center justify-center space-x-8 text-2xl text-gray-700">
        <a href="#" className="hover:text-[#39386A] transition">📸</a>
        <a href="#" className="hover:text-[#39386A] transition">▶️</a>
        <a href="#" className="hover:text-[#39386A] transition">📘</a>
        <a href="#" className="hover:text-[#39386A] transition">🐦</a>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} BAOLTISSU — All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
