{/*import React, { useEffect, useState } from "react";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(10);
  const [fade, setFade] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const photoCategories = ["All", "Winter", "Spring", "City", "Autumn", "Summer", "Village", ];

  // 🌸 Static sample photos that always show
  const samplePhotos = [
    { src: "/img1.jpg", category: "Spring" },
    { src: "/img2.jpg", category: "Spring" },
    { src: "/img3.jpg", category: "City" },
    { src: "/img4.jpg", category: "City" },
    { src: "/img6.jpg", category: "Spring" },
    { src: "/img7.jpg", category: "Spring" },
    { src: "/img8.jpg", category: "Winter" },
    { src: "/img9.jpg", category: "Winter" },
    { src: "/img10.jpg", category: "Winter" },
    { src: "/img11.jpg", category: "Winter" },
    { src: "/img12.jpg", category: "Winter" },
    { src: "/img13.jpg", category: "Winter" },
    { src: "/img14.jpg", category: "Winter" },
    { src: "/img15.jpg", category: "Winter" },
    { src: "/img16.jpg", category: "Winter" },
    { src: "/img17.jpg", category: "Winter" },
    { src: "/img18.jpg", category: "Winter" },
    { src: "/img19.jpg", category: "Winter" },
    { src: "/img20.jpg", category: "Winter" },
    { src: "/img21.jpg", category: "Winter" },
    { src: "/img22.jpg", category: "Winter" },
    { src: "/img23.jpg", category: "City" },
    { src: "/img24.jpg", category: "City" },
    { src: "/img25.jpg", category: "City" },
    { src: "/img26.jpg", category: "City" },
    { src: "/img27.jpg", category: "City" },
    { src: "/img28.jpg", category: "City" },
    { src: "/img29.jpg", category: "City" },
    { src: "/signature-background.jpg", category: "Autumn" },
  ];

  // 📸 Fetch uploaded photos from backend
  useEffect(() => {
    fetch(`${API_URL}/api/photos`)
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.map((p) => ({
          src: `${API_URL}${p.url}`,
          category: p.category || "Uncategorized",
        }));
        setPhotos(transformed);
      })
      .catch(() => setPhotos([]));
  }, []);

  // 🧩 Combine static + uploaded photos
  const allPhotos = [...samplePhotos, ...photos];

  // 🗂️ Filter by selected category
  const filteredPhotos =
    selectedCategory === "All"
      ? allPhotos
      : allPhotos.filter((photo) => photo.category === selectedCategory);

  // 📱 Responsive layout for mobile/tablet
  useEffect(() => {
    const handleResize = () => setPhotosPerPage(window.innerWidth < 768 ? 6 : 10);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔢 Pagination logic
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

  const handlePageChange = (pageNumber) => {
    setFade(false);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setFade(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  // 💡 Lightbox controls
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
  const showNext = () => setLightboxIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen pt-32 pb-10 px-6 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-600 text-white">
      
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {photoCategories.map((cat) => (
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

      
      <div
        className={`columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {currentPhotos.map((photo, idx) => (
          <div
            key={idx}
            className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => openLightbox(indexOfFirstPhoto + idx)}
          >
            <img
              src={photo.src}
              alt={`Photo ${idx + 1}`}
              className="w-full object-cover hover:scale-105 transition-transform duration-500"
            />
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
          <img
            src={filteredPhotos[lightboxIndex].src}
            alt="Enlarged"
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}*/}



import React, { useEffect, useState } from "react";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(10);
  const [fade, setFade] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const photoCategories = ["All", "Winter", "Spring", "City", "Autumn", "Summer", "Village"];

  // 🌸 Static sample photos
  const samplePhotos = [
    { src: "/img1.jpg", category: "Spring" },
    { src: "/img2.jpg", category: "Spring" },
    { src: "/img3.jpg", category: "City" },
    { src: "/img4.jpg", category: "City" },
    { src: "/signature-background.jpg", category: "Autumn" },
  ];

  // 📸 Fetch uploaded photos from backend
  useEffect(() => {
    fetch(`${API_URL}/api/photos`)
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.map((p) => ({
          src: p.url.startsWith("http") ? p.url : `${API_URL}${p.url}`,
          category: p.category || "Uncategorized",
        }));
        setPhotos(transformed);
      })
      .catch(() => setPhotos([]));
  }, []);

  // 🧩 Combine static + uploaded photos
  const allPhotos = [...samplePhotos, ...photos];

  // 🗂️ Filter by category
  const filteredPhotos =
    selectedCategory === "All"
      ? allPhotos
      : allPhotos.filter((photo) => photo.category === selectedCategory);

  // 📱 Responsive layout
  useEffect(() => {
    const handleResize = () => setPhotosPerPage(window.innerWidth < 768 ? 6 : 10);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔢 Pagination
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

  const handlePageChange = (pageNumber) => {
    setFade(false);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setFade(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  // 💡 Lightbox
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
  const showNext = () => setLightboxIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen pt-32 pb-10 px-6 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-600 text-white">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {photoCategories.map((cat) => (
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

      <div className={`columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
        {currentPhotos.map((photo, idx) => (
          <div
            key={idx}
            className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => openLightbox(indexOfFirstPhoto + idx)}
          >
            <img src={photo.src} alt={`Photo ${idx + 1}`} className="w-full object-cover hover:scale-105 transition-transform duration-500" />
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
              currentPage === i + 1 ? "bg-yellow-500 text-gray-900" : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button onClick={closeLightbox} className="absolute top-5 right-5 text-3xl text-white hover:text-yellow-500 transition font-bold">&times;</button>
          <button onClick={showPrev} className="absolute left-5 text-3xl text-white hover:text-yellow-500 transition font-bold">&#10094;</button>
          <button onClick={showNext} className="absolute right-5 text-3xl text-white hover:text-yellow-500 transition font-bold">&#10095;</button>
          <img src={filteredPhotos[lightboxIndex].src} alt="Enlarged" className="max-h-full max-w-full object-contain rounded-xl shadow-2xl" />
        </div>
      )}
    </div>
  );
}





