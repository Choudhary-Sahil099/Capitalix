import React, { useState } from "react";
import { X } from "lucide-react";
import Logo from "../../assets/logo.png";
import ForgotPassword from "./ForgotPassword";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowLogin, openSignup }) => {
  const [forgot, setForgot] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    try {
      const data = await loginUser(form);

      if (data.token) {
        localStorage.setItem("token", data.token);

        // ✅ CLOSE MODAL FIRST
        setShowLogin(false);

        // ✅ THEN NAVIGATE
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (forgot) {
    return (
      <ForgotPassword
        onBack={() => setForgot(false)}
        onClose={() => setShowLogin(false)}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => setShowLogin(false)}
    >
      <form
        className="bg-transparent p-8 rounded-xl w-[400px] relative border border-white"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()} // ✅ prevents auto-close
      >
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 text-white"
        >
          <X />
        </button>

        <div className="text-white flex flex-col items-center gap-2">
          <img src={Logo} className="w-40 h-16" alt="CapitalIx" />
          <h2 className="text-3xl">Login to CapitalIx</h2>
        </div>

        <div className="mt-4">
          <h4 className="text-white text-xl">Email</h4>
          <input
            type="email"
            name="email"               // ✅ REQUIRED
            placeholder="Enter your email..."
            className="w-full mb-4 p-3 rounded border border-[#717171] text-white bg-transparent"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4">
          <h4 className="text-white text-xl">Password</h4>
          <input
            type="password"
            name="password"            // ✅ REQUIRED
            placeholder="Enter your password..."
            className="w-full mb-4 p-3 rounded border border-[#717171] text-white bg-transparent"
            onChange={handleChange}
            required
          />
          <span
            className="text-white text-right block cursor-pointer"
            onClick={() => setForgot(true)}
          >
            Forgot password?
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#835fdf] py-3 rounded text-white font-semibold mt-6 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <h2 className="mt-2 text-center text-white">
          Don&apos;t have an account?{" "}
          <span
            className="text-[#3a0bf6] cursor-pointer hover:underline"
            onClick={openSignup}
          >
            SignUp
          </span>
        </h2>
      </form>
    </div>
  );
};

export default Login;
