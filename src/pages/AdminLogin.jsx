// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Replace these with your admin credentials
  const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "admin";
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "password";

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Successful login
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin"); 
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-10 px-6 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-600 text-white flex justify-center items-start">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-10 flex flex-col items-center animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-yellow-400 text-center">
          Admin Login
        </h2>

        {error && <p className="text-red-400 mb-6">{error}</p>}

        <div className="w-full mb-6">
          <label className="block mb-2 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="w-full mb-8">
          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-2xl shadow-lg transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}


