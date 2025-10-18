

import React, { useState, useEffect } from "react";

export default function Lifestyle() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(10);
  const [fade, setFade] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL; 

  // Static sample Lifestyle images
  const sampleLifestyle = [
    { src: "/labid1.jpg" },
    { src: "/labid2.jpg" },
    { src: "/labid3.jpg" },
    { src: "/labid4.jpg" },
    { src: "/labid5.jpg" },
    { src: "/labid6.jpg" },
    { src: "/labid7.jpg" },
    { src: "/labid8.jpg" },
    { src: "/labid9.jpg" },
    { src: "/labid10.jpg" },
  ];

  // Fetch uploaded Lifestyle photos from backend
  useEffect(() => {
    fetch(`${API_URL}/api/lifestyle`)
      .then((res) => res.json())
      .then((data) =>
        setPhotos(data.map((item) => ({ src: API_URL + item.url })))
      )
      .catch(() => setPhotos([]));
  }, []);

  const allPhotos = [...sampleLifestyle, ...photos];

  // Responsive photos per page
  useEffect(() => {
    const handleResize = () => {
      setPhotosPerPage(window.innerWidth < 768 ? 6 : 10);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pagination
  const indexOfLast = currentPage * photosPerPage;
  const indexOfFirst = indexOfLast - photosPerPage;
  const currentPhotos = allPhotos.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allPhotos.length / photosPerPage);

  const handlePageChange = (page) => {
    setFade(false);
    setTimeout(() => {
      setCurrentPage(page);
      setFade(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  // Lightbox
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
  };
  const showNext = () => {
    setLightboxIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen pt-32 pb-10 px-6 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-600 text-white">
      <h2 className="text-5xl font-bold text-yellow-500 text-center mb-12 animate-fadeIn">
        Lifestyle
      </h2>

      <div
        className={`columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {currentPhotos.map((photo, idx) => (
          <div
            key={idx}
            className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => openLightbox(indexOfFirst + idx)}
          >
            <img
              src={photo.src}
              alt={`Lifestyle ${idx + 1}`}
              className="w-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              currentPage === i + 1
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-3xl text-white hover:text-yellow-500 transition font-bold"
          >
            &times;
          </button>

          <button
            onClick={showPrev}
            className="absolute left-5 text-3xl text-white hover:text-yellow-500 transition font-bold"
          >
            &#10094;
          </button>

          <button
            onClick={showNext}
            className="absolute right-5 text-3xl text-white hover:text-yellow-500 transition font-bold"
          >
            &#10095;
          </button>

          <img
            src={allPhotos[lightboxIndex].src}
            alt="Enlarged"
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}


