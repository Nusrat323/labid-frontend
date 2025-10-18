import { useState, useEffect } from "react";
import UploadForm from "../components/UploadForm";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("upload");
  const [type, setType] = useState("photo"); 
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);
  const [manageTab, setManageTab] = useState("photo");

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch media for manage section
  const fetchMedia = async () => {
    try {
      const [photoRes, videoRes, lifestyleRes] = await Promise.all([
        axios.get(`${API_URL}/api/photos`),
        axios.get(`${API_URL}/api/videos`),
        axios.get(`${API_URL}/api/lifestyle`),
      ]);

      setPhotos(Array.isArray(photoRes.data) ? photoRes.data : []);
      setVideos(Array.isArray(videoRes.data) ? videoRes.data : []);
      setLifestyle(Array.isArray(lifestyleRes.data) ? lifestyleRes.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch media.");
    }
  };

  useEffect(() => {
    if (activeSection === "manage") fetchMedia();
  }, [activeSection]);

  // Delete media
  const handleDelete = async (id, mediaType) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete this ${mediaType}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const url =
          mediaType === "photo"
            ? `${API_URL}/api/photos/${id}`
            : mediaType === "video"
            ? `${API_URL}/api/videos/${id}`
            : `${API_URL}/api/lifestyle/${id}`;

        await axios.delete(url);
        toast.success(`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} deleted successfully!`);
        setTimeout(fetchMedia, 300);
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete media.");
      }
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-600 text-white">
      <h1 className="text-3xl font-bold mt-20 mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveSection("upload")}
          className={`px-4 py-2 rounded font-semibold ${activeSection === "upload" ? "bg-yellow-500 text-gray-900" : "bg-gray-800 hover:bg-gray-700"}`}
        >
          Upload
        </button>
        <button
          onClick={() => setActiveSection("manage")}
          className={`px-4 py-2 rounded font-semibold ${activeSection === "manage" ? "bg-yellow-500 text-gray-900" : "bg-gray-800 hover:bg-gray-700"}`}
        >
          Manage Uploads
        </button>
      </div>

      {/* Upload Section */}
      {activeSection === "upload" && (
        <div className="mb-12">
          <div className="mb-4 flex gap-4 items-center justify-center">
            <label className="font-semibold mr-2">Select Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 rounded text-white"
            >
              <option className="text-black" value="photo">Photo</option>
              <option className="text-black" value="video">Video</option>
              <option className="text-black" value="lifestyle">Lifestyle</option>
            </select>
          </div>

          <UploadForm type={type} onUpload={fetchMedia} />
        </div>
      )}

      {/* Manage Section */}
      {activeSection === "manage" && (
        <div>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setManageTab("photo")}
              className={`px-4 py-2 rounded font-semibold ${manageTab === "photo" ? "bg-yellow-500 text-gray-900" : "bg-gray-800 hover:bg-gray-700"}`}
            >
              Photos
            </button>
            <button
              onClick={() => setManageTab("video")}
              className={`px-4 py-2 rounded font-semibold ${manageTab === "video" ? "bg-yellow-500 text-gray-900" : "bg-gray-800 hover:bg-gray-700"}`}
            >
              Videos
            </button>
            <button
              onClick={() => setManageTab("lifestyle")}
              className={`px-4 py-2 rounded font-semibold ${manageTab === "lifestyle" ? "bg-yellow-500 text-gray-900" : "bg-gray-800 hover:bg-gray-700"}`}
            >
              Lifestyle
            </button>
          </div>

          {/* Manage Photos */}
          {manageTab === "photo" && (
            <div>
              {photos.length === 0 ? (
                <p className="text-gray-300">No photos uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {photos.map((p) => (
                    <div key={p._id} className="bg-white/10 backdrop-blur-md p-2 rounded-lg relative">
                      <img src={`${API_URL}${p.url}`} alt="photo" className="w-full h-32 object-cover rounded" />
                      <p className="text-sm mt-1 font-semibold">{p.category}</p>
                      <button
                        onClick={() => handleDelete(p._id, "photo")}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Manage Videos */}
          {manageTab === "video" && (
            <div>
              {videos.length === 0 ? (
                <p className="text-gray-300">No videos uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {videos.map((v) => (
                    <div key={v._id} className="bg-white/10 backdrop-blur-md p-2 rounded-lg relative">
                      <video
                        src={`${API_URL}${v.url}`}
                        poster={v.thumbnailUrl ? `${API_URL}${v.thumbnailUrl}` : ""}
                        controls
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-sm mt-1 font-semibold">{v.category}</p>
                      <button
                        onClick={() => handleDelete(v._id, "video")}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Manage Lifestyle */}
          {manageTab === "lifestyle" && (
            <div>
              {lifestyle.length === 0 ? (
                <p className="text-gray-300">No lifestyle photos uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {lifestyle.map((l) => (
                    <div key={l._id} className="bg-white/10 backdrop-blur-md p-2 rounded-lg relative">
                      <img src={`${API_URL}${l.url}`} alt="lifestyle" className="w-full h-32 object-cover rounded" />
                      <button
                        onClick={() => handleDelete(l._id, "lifestyle")}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </div>
  );
}
