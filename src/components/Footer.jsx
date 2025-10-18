import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-stone-900 via-stone-800 to-stone-700 text-white py-12 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Labid Khan</h2>
          <p className="text-gray-300 text-sm">
            Capturing moments through photography and video editing. Transforming life into stories that last forever.
          </p>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-500 transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Email: <a href="mailto:labidkhan2022@gmail.com" className="hover:text-yellow-500 transition">labidkhan2022@gmail.com</a></li>
            <li>Phone: <a href="tel:+19295281885" className="hover:text-yellow-500 transition">+1 929-528-1885</a></li>
            <li>Location: New York, USA</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/labidscitywalk9?igsh=MWZwOGF4cHZ1dWR0aA==" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-yellow-500 transition">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61570646052882" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-yellow-500 transition">
              <FaFacebook />
            </a>
            <a href="https://www.youtube.com/@LabidsCityWalk" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-yellow-500 transition">
              <FaYoutube />
            </a>
            <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-yellow-500 transition">
              {/* Threads SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current">
                <path d="M256 0C114.624 0 0 114.624 0 256s114.624 256 256 256 256-114.624 256-256S397.376 0 256 0zm0 472c-119.296 0-216-96.704-216-216S136.704 40 256 40s216 96.704 216 216-96.704 216-216 216z"/>
                <path d="M363.2 148.8c-6.4-6.4-16.8-6.4-23.2 0l-176 176c-6.4 6.4-6.4 16.8 0 23.2s16.8 6.4 23.2 0l176-176c6.4-6.4 6.4-16.8 0-23.2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Labid Khan. All rights reserved.
      </div>
    </footer>
  );
}
