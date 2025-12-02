import React from "react";
import { Link } from "react-router-dom";

const TailoringSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#F7F3EE]">

      <div className="bg-white border border-[#E5E3DF] rounded-3xl shadow-xl p-12 max-w-lg text-center animate-fadeIn">

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-5xl">
            ✔️
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Request Sent!
        </h1>

        {/* TEXT */}
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          Your tailoring request has been received.  
          Our designers will review your measurements and model inspiration,  
          and we will contact you shortly to finalize your outfit.
        </p>

        {/* BUTTON */}
        <Link
          to="/"
          className="block w-full py-4 bg-[#39386A] text-white text-lg rounded-full font-semibold hover:bg-[#2F2E59] transition"
        >
          Back to Home
        </Link>
      </div>

      {/* Fade animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default TailoringSuccess;
