import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/API";

const Register = () => {
  const navigate = useNavigate();

  const t = {
    en: {
      title: "Create an account",
      subtitle: "Join BAOLTISSU and enjoy a premium shopping experience.",
      name: "Full name",
      email: "Email",
      password: "Password",
      confirm: "Confirm password",
      create: "Create account",
      haveAccount: "Already have an account?",
      login: "Sign in",
      errorMatch: "Passwords do not match.",
      errorServer: "Registration failed. Try again.",
    },
  };

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError(t.en.errorMatch);
      return;
    }

    try {
      setLoading(true);

      await API.post("/api/users/register", {
        name,
        email,
        password,
      });

      navigate("/login"); // redirect after success
    } catch (err) {
      console.error(err);
      setError(t.en.errorServer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#F7F3EE]">

      <div className="w-full max-w-md bg-white border border-[#E5E3DF] rounded-3xl shadow-sm p-12">

        <h1 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight">
          {t.en.title}
        </h1>

        <p className="text-center text-gray-600 mt-3 mb-10 leading-relaxed">
          {t.en.subtitle}
        </p>

        {error && (
          <p className="text-red-600 text-center font-semibold mb-4">{error}</p>
        )}

        <form className="space-y-7" onSubmit={handleRegister}>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              {t.en.name}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner focus:ring-2 focus:ring-[#39386A]"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              {t.en.email}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner focus:ring-2 focus:ring-[#39386A]"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              {t.en.password}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner focus:ring-2 focus:ring-[#39386A]"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              {t.en.confirm}
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner focus:ring-2 focus:ring-[#39386A]"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-[#39386A] text-white rounded-full font-semibold hover:bg-[#2F2E59] transition text-lg disabled:opacity-50"
          >
            {loading ? "..." : t.en.create}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-700 font-medium">
          {t.en.haveAccount}{" "}
          <Link to="/login" className="text-[#39386A] hover:underline font-semibold">
            {t.en.login}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
