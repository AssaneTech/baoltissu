import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/API";

const ResetPassword = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Vérifier que userId existe
  useEffect(() => {
    console.log("USER ID FROM URL:", userId);
    if (!userId) {
      setError("Invalid reset password link.");
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Vérifications côté front
    if (!userId) {
      return setError("Invalid or missing user ID.");
    }

    if (password.length < 4) {
      return setError("Password must be at least 4 characters.");
    }

    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      console.log("SENDING BODY:", { userId, password });

      const res = await API.post("/api/users/reset-password", {
        userId,
        password,
      });

      console.log("BACKEND RESPONSE:", res.data);

      setSuccess("Password successfully updated!");
      
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      console.log("RESET PASSWORD ERROR:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Unable to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#F7F3EE]">
      <div className="w-full max-w-md bg-white border border-[#E5E3DF] rounded-3xl shadow-sm p-10">

        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          Reset Password
        </h1>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-600 text-center mt-4">{success}</p>}

        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
          
          <input
            type="password"
            placeholder="New password"
            className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#39386A]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full border border-[#DAD7D2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#39386A]"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-[#39386A] text-white py-3 rounded-full font-semibold hover:bg-[#2F2E59] disabled:opacity-50 transition"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;
