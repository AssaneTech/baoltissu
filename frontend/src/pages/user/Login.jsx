import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/API";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const t = {
    en: {
      title: "Sign in",
      subtitle: "Glad to see you again. Log in to continue your fashion shopping.",
      email: "Email",
      password: "Password",
      forgot: "Forgot password?",
      login: "Log in",
      noAccount: "Don’t have an account?",
      create: "Create an account",
      error: "Invalid credentials.",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await API.post("/api/users/login", {
        email,
        password,
      });

      const user = {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        isAdmin: res.data.isAdmin,
      };

      const token = res.data.token;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token,
          user,
        })
      );

      login(user, token);

      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(t.en.error);
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

        {errorMsg && (
          <p className="text-red-500 text-center mb-4 font-semibold">
            {errorMsg}
          </p>
        )}

        <form className="space-y-7" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              {t.en.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner focus:ring-2 focus:ring-[#39386A]"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              {t.en.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 bg-white shadow-inner focus:ring-2 focus:ring-[#39386A]"
            />

            <Link
              to="/forgot-password"
              className="block mt-2 text-[#39386A] hover:underline text-sm font-medium text-right"
            >
              {t.en.forgot}
            </Link>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-[#39386A] text-white rounded-full font-semibold hover:bg-[#2F2E59] transition text-lg disabled:opacity-50"
          >
            {loading ? "..." : t.en.login}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-700 font-medium">
          {t.en.noAccount}{" "}
          <Link to="/register" className="text-[#39386A] hover:underline font-semibold">
            {t.en.create}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
