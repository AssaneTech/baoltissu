import React from "react";
import { Link, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">

      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Order confirmed 🎉
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        Your order has been created successfully.<br />
        Order ID: <span className="font-semibold">{id}</span>
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-[#39386A] text-white rounded-full hover:bg-[#2F2E59] transition"
      >
        Back to home
      </Link>

    </div>
  );
};

export default OrderSuccess;
