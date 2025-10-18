
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    setIsAdminLoggedIn(!!loggedIn);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsAdminLoggedIn(false);
    navigate("/");
  };

  const isHome = location.pathname === "/";
  const isContact = location.pathname === "/contact";

  return (
    <nav className="navbar absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide uppercase text-white"
        >
          Labid Khan
        </Link>

        {/* Large screens */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium ${isHome ? "text-yellow-500" : "text-white"} ${
                isActive ? "underline underline-offset-8" : "hover:underline underline-offset-8"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/photos"
            className={({ isActive }) =>
              `text-lg font-medium text-white ${isActive ? "underline underline-offset-8" : "hover:underline underline-offset-8"}`
            }
          >
            Photography
          </NavLink>
          <NavLink
            to="/videos"
            className={({ isActive }) =>
              `text-lg font-medium text-white ${isActive ? "underline underline-offset-8" : "hover:underline underline-offset-8"}`
            }
          >
            Videos
          </NavLink>
          <NavLink
            to="/lifestyle"
            className={({ isActive }) =>
              `text-lg font-medium text-white ${isActive ? "underline underline-offset-8" : "hover:underline underline-offset-8"}`
            }
          >
            Lifestyle
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-lg font-medium text-white ${isActive ? "underline underline-offset-8" : "hover:underline underline-offset-8"}`
            }
          >
            About
          </NavLink>

          {!isContact && (
            <Link
              to="/contact"
              className="ml-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition"
            >
              Let's Talk
            </Link>
          )}

          {isAdminLoggedIn ? (
            <>
              <Link
                to="/admin"
                className="ml-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin-login"
              className="ml-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition"
            >
              Admin Login
            </Link>
          )}
        </div>

        {/* Hamburger menu */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost btn-circle text-white"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white/10 backdrop-blur-md text-white rounded-xl shadow-lg py-3 text-center">
              <NavLink to="/" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-white/20">Home</NavLink>
              <NavLink to="/photos" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-white/20">Photography</NavLink>
              <NavLink to="/videos" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-white/20">Videos</NavLink>
              <NavLink to="/lifestyle" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-white/20">Lifestyle</NavLink>
              <NavLink to="/about" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-white/20">About</NavLink>

              {!isContact && (
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 mt-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg"
                >
                  Let's Talk
                </Link>
              )}

              {isAdminLoggedIn ? (
                <>
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-4 py-2 mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">Dashboard</Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block px-4 py-2 mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg">Logout</button>
                </>
              ) : (
                <Link to="/admin-login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 mt-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg">Admin Login</Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
