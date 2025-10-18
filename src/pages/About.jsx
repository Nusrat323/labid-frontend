import React from "react";
import OwnerImage from "../assets/labid.jpg"; 
import { FaCamera, FaVideo, FaPenNib, FaPlayCircle } from "react-icons/fa";
import { SiCanva, SiAdobephotoshop, SiAdobelightroom, SiAdobeaftereffects } from "react-icons/si";

export default function About() {
  const skills = [
    { name: "Adobe Photoshop", icon: <SiAdobephotoshop className="text-blue-400 text-xl" /> },
    { name: "Adobe Lightroom", icon: <SiAdobelightroom className="text-sky-400 text-xl" /> },
    { name: "Adobe After Effects", icon: <SiAdobeaftereffects className="text-purple-400 text-xl" /> },
    { name: "Canva", icon: <SiCanva className="text-cyan-400 text-xl" /> },
    { name: "Motion Graphics", icon: <FaPenNib className="text-yellow-400 text-xl" /> },
    { name: "InShot", icon: <FaPlayCircle className="text-pink-400 text-xl" /> }, 
    { name: "Video Editing", icon: <FaVideo className="text-red-400 text-xl" /> },
    { name: "Photography", icon: <FaCamera className="text-amber-400 text-xl" /> },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-700 text-white py-20 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:gap-16 gap-10">
        
        
        {/* Owner Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={OwnerImage}
            alt="Labid Khan"
            className="rounded-2xl shadow-2xl border-4 border-yellow-500 hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* About Content */}
        <div className="md:w-2/3 space-y-6">
        <h2 className="text-4xl font-bold text-yellow-500">About Me</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
  Hi, I'm <span className="text-yellow-400 font-semibold">Labid Khan</span> a creative{" "}
  <span className="text-yellow-400">photographer</span> and{" "}
  <span className="text-yellow-400">video editor</span> with over{" "}
  <strong>5 years of experience</strong> in visual storytelling.
</p>
<p className="text-gray-300 text-lg leading-relaxed">
  I love capturing <strong>nature</strong>, <strong>city life</strong>, and{" "}
  <strong>special moments</strong>, turning them into beautiful memories through my lens
  and creative editing. I’ve explored places like <strong>New York City</strong>,
  capturing its vibrant streets, architecture, and everyday stories through my photography.
</p>
<p className="text-gray-300 text-lg leading-relaxed">
  I specialize in <strong>photo retouching</strong>, <strong>motion graphics</strong>, and{" "}
  <strong>video post-production</strong>, using modern tools and creative techniques to
  deliver clean, professional, and eye-catching visuals that tell real stories.
</p>



          <h3 className="text-2xl font-semibold text-yellow-400">Tools & Expertise</h3>
          <div className="flex flex-wrap gap-4 mt-4">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 bg-gray-800 text-yellow-500 px-4 py-2 rounded-full font-medium hover:bg-yellow-500 hover:text-gray-900 transition"
              >
                {skill.icon}
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
