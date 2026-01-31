import { useState } from "react";
import { X } from "lucide-react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authService";

const Signup = ({ setShowSignUp, openLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
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
      const data = await signupUser(form);

      if (data.token) {
        localStorage.setItem("token", data.token);
        setShowSignUp(false);
        navigate("/dashboard");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => setShowSignUp(false)}
    >
      <form
        className="bg-transparent p-8 rounded-xl w-100 relative border border-white"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShowSignUp(false)}
          className="absolute top-3 right-3 text-white"
        >
          <X />
        </button>

        <div className="text-white flex flex-col items-center gap-2">
          <img src={Logo} className="w-40 h-16" alt="CapitalIx" />
          <h2 className="text-3xl">Sign up to CapitalIx</h2>
        </div>

        <div className="mt-4">
          <h4 className="text-white text-xl">Name</h4>
          <input
            type="text"
            name="name"
            placeholder="Enter your name..."
            className="w-full mb-4 p-3 rounded border border-[#717171] text-white bg-transparent"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4">
          <h4 className="text-white text-xl">Email</h4>
          <input
            type="email"
            name="email"
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
            name="password"
            placeholder="Enter your password..."
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded border border-[#717171] text-white bg-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#835fdf] py-3 rounded text-white font-semibold mt-6 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <h2 className="mt-2 text-center text-white">
          Already have an account?{" "}
          <span
            className="text-[#3a0bf6] hover:cursor-pointer hover:underline"
            onClick={openLogin}
          >
            Login
          </span>
        </h2>
      </form>
    </div>
  );
};

export default Signup;
