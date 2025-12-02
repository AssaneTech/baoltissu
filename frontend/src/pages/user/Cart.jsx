import React from "react";
import { useCart } from "../../context/CartContext";

import { useNavigate } from "react-router-dom";
import API from "../../api/API";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

// HANDLE CHECKOUT
  const handleCheckout = async () => {
  if (!user) {
    alert("You must be logged in to checkout.");
    navigate("/login");
    return;
  }

  try {
    const res = await API.post(
      "/api/orders",
      {
        orderItems: cart,
        totalPrice: subtotal
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("ORDER SUCCESS:", res.data);

    // redirect to success page
    navigate(`/order-success/${res.data._id}`);

  } catch (err) {
    console.error("Order failed:", err);
    alert("Something went wrong. Try again.");
  }
};



  // TEXTS — ENGLISH ONLY
  const t = {
    title: "Your cart",
    subtitle: "Review the items you have selected.",
    product: "Product",
    price: "Price",
    qty: "Quantity",
    total: "Total",
    empty: "Your cart is empty.",
    continue: "Continue shopping",
    checkout: "Proceed to checkout",
    summary: "Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    finalTotal: "Total to pay",
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );




  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="mb-14 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          {t.title}
        </h1>
        <p className="text-gray-600 mt-3 text-lg">{t.subtitle}</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          {t.empty}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-10">

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-4 text-gray-500 uppercase text-sm font-semibold pb-3 border-b">
              <div>{t.product}</div>
              <div className="text-center">{t.price}</div>
              <div className="text-center">{t.qty}</div>
              <div className="text-right">{t.total}</div>
            </div>

            {/* ITEMS */}
            {cart.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-4 items-center border-b pb-6"
              >
                {/* Product Column */}
                <div className="flex items-center space-x-5 mb-4 md:mb-0">

                  {/* IMAGE */}
                  <div className="h-24 w-24 bg-gray-200 rounded-2xl overflow-hidden">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300"></div>
                    )}
                  </div>

                  {/* NAME + DELETE */}
                  <div className="flex justify-between w-full">
                    <p className="font-semibold text-gray-900">{item.name}</p>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600 hover:text-red-800 text-xl"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center font-semibold">
                  {item.price.toLocaleString()} FCFA
                </div>

                {/* Quantity Controls */}
                <div className="flex justify-center items-center space-x-3">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="px-4 py-1.5 bg-gray-200 rounded-full"
                  >
                    −
                  </button>

                  <span className="px-4 py-1.5 border rounded-lg">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="px-4 py-1.5 bg-gray-200 rounded-full"
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-right font-bold text-gray-900">
                  {(item.qty * item.price).toLocaleString()} FCFA
                </div>
              </div>
            ))}

            <a href="/" className="text-[#39386A] font-semibold hover:underline">
              {t.continue}
            </a>

          </div>

          {/* SUMMARY */}
          <div className="bg-[#F7F3EE] border rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-8">{t.summary}</h2>

            <div className="space-y-6">

              <div className="flex justify-between text-gray-700">
                <span>{t.subtotal}</span>
                <span className="font-semibold">
                  {subtotal.toLocaleString()} FCFA
                </span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>{t.shipping}</span>
                <span className="font-semibold text-green-700">{t.free}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>{t.finalTotal}</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-8 py-4 bg-[#39386A] text-white rounded-full hover:bg-[#2F2E59] transition"
              >
                {t.checkout}
              </button>


            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;
