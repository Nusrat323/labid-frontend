import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Image */}
      <img
        src="/signature-background.jpg"
        alt="Hero Background"
        className="absolute w-full h-full object-cover top-0 left-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text content */}
      <div className="relative z-10 px-6 max-w-3xl text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Capturing Life Through My Lens
        </h1>
        <p className="text-md md:text-xl lg:text-xl font-light">
          Showcasing the art of photography and video editing, turning moments into stories that last forever.
        </p>
      </div>
    </section>
  );
}

