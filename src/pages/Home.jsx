import React from "react";
import HeroSection from "../components/HeroSection";
import GalleryCard from "../components/GalleryCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-800 via-stone-700 to-stone-600 text-white">
      <HeroSection />

      {/* Preview Section */}
      <section className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Video Card */}
        <GalleryCard
          type="Videos"
          title=" Videos"
          coverSrc="/img2.jpg" 
          link="/videos"
          buttonText="View All Videos"
        />

        {/* Photo Card */}
        <GalleryCard
          type="Photos"
          title=" Photos"
          coverSrc="/img1.jpg"
          link="/photos"
          buttonText="View All Photos"
        />
      </section>
    </div>
  );
}
