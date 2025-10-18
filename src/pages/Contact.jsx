import React, { useState } from "react";
import { 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, 
  FaInstagram, FaFacebook, FaYoutube, 
  FaUser, FaRegEnvelope, FaCommentDots 
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_doqv05q",      
      "template_j3nfemk",    
      formData,               
      "6kjG_bAhyYIesSn81"       
    )
    .then((result) => {
      console.log(result.text);
      toast.success("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.error(error.text);
      toast.error("❌ Failed to send message.");
    })
    .finally(() => setLoading(false));
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-700 text-white py-24 px-6">
      <ToastContainer />
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-yellow-500 text-center mb-6 animate-fadeIn">Let's Talk</h2>
        <p className="text-gray-300 text-center mb-14 text-lg animate-fadeIn delay-200">
          Have a project, collaboration idea, or just want to say hello? Fill out the form below or reach me directly  I’d love to connect!
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8 animate-fadeIn delay-400">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-yellow-500 text-3xl" />
              <span className="text-gray-300 text-lg">labidkhan2022@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-yellow-500 text-3xl" />
              <span className="text-gray-300 text-lg">+1 929 528 1885</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-yellow-500 text-3xl" />
              <span className="text-gray-300 text-lg">New York, USA</span>
            </div>

            <div className="flex gap-6 mt-6">
              <a href="https://www.instagram.com/labidscitywalk9?igsh=MWZwOGF4cHZ1dWR0aA==" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-yellow-500 transition">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61570646052882" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-yellow-500 transition">
                <FaFacebook />
              </a>
              <a href="https://www.youtube.com/@LabidsCityWalk" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-yellow-500 transition">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 bg-opacity-70 p-10 rounded-3xl shadow-2xl border border-yellow-500/30 flex flex-col gap-6 animate-fadeIn delay-600 transition-transform transform hover:scale-105"
          >
            <div className="relative">
              <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Name"
                className="w-full p-4 pl-12 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white transition placeholder-transparent"
              />
              <label className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none transition-all duration-300">
                Name
              </label>
            </div>

            <div className="relative">
              <FaRegEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full p-4 pl-12 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white transition placeholder-transparent"
              />
              <label className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none transition-all duration-300">
                Your Email
              </label>
            </div>

            <div className="relative">
              <FaCommentDots className="absolute top-4 left-4 text-gray-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Message"
                rows="6"
                className="w-full p-4 pl-12 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white resize-none transition placeholder-transparent"
              />
              <label className="absolute left-12 top-4 text-gray-400 text-sm pointer-events-none transition-all duration-300">
                Message
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 rounded-xl text-lg transition-transform transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

