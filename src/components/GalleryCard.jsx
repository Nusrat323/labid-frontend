import React from "react";
import { Link } from "react-router-dom"; 

export default function GalleryCard({ type, title, coverSrc, link, buttonText }) {
  return (
    <Link
      to={link} 
      className="group relative block overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition duration-500"
    >
      
      <img
        src={coverSrc}
        alt={title}
        className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

      {/* Text & Button */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">
          {title}
        </h3>

        <span className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-full transition">
          {buttonText}
        </span>
      </div>
    </Link>
  );
}
