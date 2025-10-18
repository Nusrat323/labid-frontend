import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadForm({ type, onUpload }) {
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState(type === "video" ? "All" : "Travel");
  const [uploading, setUploading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleThumbnailChange = (e) => setThumbnail(e.target.files[0]);
  const handleRemoveFile = () => setFile(null);
  const handleRemoveThumbnail = () => setThumbnail(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return toast.warning(`Please select a ${type} to upload.`);
    if (type === "video" && !thumbnail) return toast.warning("Please upload a thumbnail.");
    if (!category && type !== "lifestyle") return toast.warning("Please select a category.");

    const formData = new FormData();
    formData.append("file", file);
    if (type !== "lifestyle") formData.append("category", category);
    if (type === "video" && thumbnail) formData.append("thumbnail", thumbnail);

    try {
      setUploading(true);

      const url =
        type === "photo"
          ? `${API_URL}/api/photos/upload`
          : type === "video"
          ? `${API_URL}/api/videos/upload`
          : `${API_URL}/api/lifestyle/upload`;

      await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFile(null);
      setThumbnail(null);
      onUpload();
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const photoCategories = ["All", "City", "Winter", "Spring", "Village", "Autumn", "Summer"];
  const videoCategories = ["All", "Lifestyle", "Travel", "Nature", "City"];

  return (
    <>
      <form
        onSubmit={handleUpload}
        className="mb-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>

        {/* Category Selection */}
        {type !== "lifestyle" && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded text-white bg-gray-500"
            >
              {(type === "photo" ? photoCategories : videoCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* File Input */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Select {type === "photo" || type === "lifestyle" ? "Photo" : "Video"}:
          </label>
          <input
            type="file"
            accept={type === "photo" || type === "lifestyle" ? "image/*" : "video/*"}
            onChange={handleFileChange}
            className="w-full text-white file:bg-yellow-500 file:text-gray-900 file:px-4 file:py-2 file:rounded-lg file:font-semibold hover:file:bg-yellow-600 transition"
          />
        </div>

        {/* File Preview */}
        {file && (
          <div className="mb-4 relative">
            {type === "photo" || type === "lifestyle" ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg shadow-lg border border-white/20"
              />
            ) : (
              <video
                src={URL.createObjectURL(file)}
                controls
                className="w-full max-h-64 object-cover rounded-lg shadow-lg border border-white/20"
              />
            )}
            <button
              type="button"
              onClick={handleRemoveFile}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-md transition"
            >
              Remove
            </button>
          </div>
        )}

        {/* Thumbnail for video */}
        {type === "video" && (
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Thumbnail:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full text-white file:bg-yellow-500 file:text-gray-900 file:px-4 file:py-2 file:rounded-lg file:font-semibold hover:file:bg-yellow-600 transition"
            />
            {thumbnail && (
              <div className="mt-4 relative">
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Thumbnail Preview"
                  className="w-full max-h-64 object-cover rounded-lg shadow-lg border border-white/20"
                />
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-md transition"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-2xl shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
