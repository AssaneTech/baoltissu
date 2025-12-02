import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/API";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const t = {
    title: "Forgot password",
    subtitle: "Enter your email to reset your password.",
    email: "Email",
    send: "Continue",
    back: "Back to login",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await API.post("/api/users/check-email", { email });

      // Redirection avec l'ID utilisateur
      navigate(`/reset-password/${res.data.userId}`);

    } catch (err) {
      console.error(err);
      setErrorMsg("Email not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#F7F3EE]">

      <div className="w-full max-w-md bg-white border border-[#E5E3DF] rounded-3xl shadow-sm p-12">

        <h1 className="text-4xl font-extrabold text-gray-900 text-center">
          {t.title}
        </h1>

        <p className="text-center text-gray-600 mt-3 mb-10">
          {t.subtitle}
        </p>

        {errorMsg && (
          <p className="text-red-500 text-center mb-4 font-semibold">
            {errorMsg}
          </p>
        )}

        <form className="space-y-7" onSubmit={handleSubmit}>

          <div>
            <label className="block mb-2 font-semibold">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner focus:ring-2 focus:ring-[#39386A]"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-[#39386A] text-white rounded-full font-semibold hover:bg-[#2F2E59] transition text-lg disabled:opacity-50"
          >
            {loading ? "..." : t.send}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-[#39386A] underline text-sm font-medium">
            {t.back}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
