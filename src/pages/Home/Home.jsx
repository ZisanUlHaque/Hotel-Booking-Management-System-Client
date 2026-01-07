// src/pages/Home.jsx
import React from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import PopularDestination from "../Components/PopularDestination";
import HowItWorks from "../Components/HowItWorks";
import TestimonialsPreview from "../Components/TestimonialsPreview";
import BlogPreview from "../Components/BlogPreview";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section (simple version) */}
        <section className="relative h-[450px] md:h-[520px]">
          <img
            src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg"
            alt="Travel Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">
              <h1 className="text-3xl md:text-5xl font-bold max-w-xl">
                Discover Your Next Dream Destination
              </h1>
              <p className="mt-4 max-w-lg text-white/90">
                Explore handpicked tours across the world with trusted guides
                and seamless booking experience.
              </p>

              {/* Simple Search Bar */}
              <div className="mt-8 bg-white/90 rounded-xl p-3 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="date"
                    className="px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="w-full px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg">
                    Search Tours
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* (Optional) Category section তুমি আগের example থেকে নিতে পারো */}

        {/* Popular Destinations */}
        <PopularDestination />

        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
        <TestimonialsPreview />

        {/* Blog Preview */}
        <BlogPreview />
      </main>

      <Footer />
    </div>
  );
};

export default Home;