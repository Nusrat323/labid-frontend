import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Photos from "./pages/Photos";
import Videos from "./pages/Videos";
import About from "./pages/About";
import Lifestyle from "./pages/Lifestyle";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact"; 

  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={isAdminLoggedIn ? <Admin /> : <Navigate to="/admin-login" />} />
          <Route path="*" element={<p className="text-center text-white p-8">Page not found</p>} />
        </Routes>
      </main>
      {!isContactPage && <Footer />}
    </div>
  );
}
