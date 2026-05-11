import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // store token
      login(res.data.token);

      // success toast
      toast.success("Login successful!");

      // redirect
      navigate("/courses");

    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-xl w-80"
      >
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
};

export default Login;