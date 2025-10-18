import React, { useEffect, useState } from "react";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(6);
  const [fade, setFade] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Categories
  const videoCategories = ["All", "Lifestyle", "Travel", "Nature", "City"];

  // ✅ Static videos with cover thumbnails
  const staticVideos = [
    {
      src: "/videos/vid1.mp4",
      cover: "/vidcov1.webp",
      category: "City",
    },
    {
      src: "/videos/vid2.mp4",
      cover: "/vidcov2.jpg",
      category: "Lifestyle",
    },
  ];

  // ✅ Fetch uploaded videos from backend
  useEffect(() => {
    fetch(`${API_URL}/api/videos`)
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.map((v) => ({
          src: `${API_URL}${v.url}`,
          cover: v.thumbnailUrl ? `${API_URL}${v.thumbnailUrl}` : `${API_URL}${v.url}`,
          category: v.category || "Uncategorized",
        }));
        // Combine static + uploaded videos
        setVideos([...staticVideos, ...transformed]);
      })
      .catch(() => setVideos(staticVideos));
  }, []);

  // ✅ Filter by category
  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  // ✅ Adjust per-page count for mobile
  useEffect(() => {
    const handleResize = () =>
      setVideosPerPage(window.innerWidth < 768 ? 4 : 6);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handlePageChange = (pageNumber) => {
    setFade(false);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setFade(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  // ✅ Lightbox controls
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((prev) =>
      prev === 0 ? filteredVideos.length - 1 : prev - 1
    );
  const showNext = () =>
    setLightboxIndex((prev) =>
      prev === filteredVideos.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="min-h-screen pt-32 pb-10 px-6 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-600 text-white">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {videoCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              selectedCategory === cat
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div
        className={`grid sm:grid-cols-2 md:grid-cols-3 gap-6 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {currentVideos.map((video, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer group"
            onClick={() => openLightbox(indexOfFirstVideo + idx)}
          >
            {/* Video with thumbnail */}
            <video
              src={video.src}
              poster={video.cover}
              className="w-full h-60 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              playsInline
              onMouseEnter={(e) => e.target.setAttribute("controls", "true")}
              onMouseLeave={(e) => e.target.removeAttribute("controls")}
            />

           
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      
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
          <video
            src={filteredVideos[lightboxIndex].src}
            poster={filteredVideos[lightboxIndex].cover}
            controls
            autoPlay
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}


