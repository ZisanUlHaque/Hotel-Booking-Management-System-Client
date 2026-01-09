// src/Components/TravelHeroSlider.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
  FaArrowRight,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";

// চাইলে tours prop থেকে data নিবে, না থাকলে demo data
const fallbackTours = [
  {
    id: 1,
    country: "Italy",
    city: "Rome",
    title: "Historic Rome Tour",
    duration: "5 Days",
    price: 1200,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/2676642/pexels-photo-2676642.jpeg",
    description:
      "Walk through centuries of history, from the Colosseum to the Vatican. Perfect blend of culture, food, and architecture.",
  },
  {
    id: 2,
    country: "France",
    city: "Paris",
    title: "Romantic Paris Getaway",
    duration: "4 Days",
    price: 1350,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
    description:
      "Experience the city of love with Eiffel Tower sunsets, cozy cafés, and moonlit Seine cruises.",
  },
  {
    id: 3,
    country: "Japan",
    city: "Tokyo",
    title: "Tokyo Modern Life Tour",
    duration: "7 Days",
    price: 2000,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg",
    description:
      "From neon streets and anime districts to silent shrines – discover the best of modern Japan.",
  },
  {
    id: 4,
    country: "Turkey",
    city: "Istanbul",
    title: "Istanbul Cultural Escape",
    duration: "6 Days",
    price: 950,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/12654341/pexels-photo-12654341.jpeg",
    description:
      "Where East meets West: mosques, bazaars, Bosphorus cruises and incredible Turkish cuisine.",
  },
];

const TravelHeroSlider = ({ tours }) => {
  const slides = tours && tours.length ? tours.slice(0, 6) : fallbackTours;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = slides[activeIndex];
  const total = slides.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goTo = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="bg-[#050816] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Top Center Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sky-400 mb-2">
              Travel Slider
            </p>
            <h1 className="text-3xl md:text-4xl font-bold">
              Travel around the world
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-md">
              Swipe through curated destinations and pick your next adventure.
            </p>
          </div>
          <Link
            to="/destination"
            className="text-xs md:text-sm font-medium text-sky-400 underline underline-offset-4"
          >
            View all trips
          </Link>
        </div>

        {/* Main Card (similar layout: left panel + right image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left: Dark info panel */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Location */}
              <div className="flex items-center gap-2 text-xs text-slate-300 mb-3">
                <FaMapMarkerAlt className="text-sky-400" />
                <span className="uppercase tracking-[0.25em]">
                  {active.country}
                </span>
              </div>

              {/* City + Title */}
              <h2 className="text-2xl md:text-3xl font-semibold mb-1">
                {active.city}
              </h2>
              <p className="text-sm text-slate-300 mb-4">{active.title}</p>

              {/* Description */}
              <p className="text-xs md:text-sm text-slate-300/90 mb-6 leading-relaxed">
                {active.description ||
                  "Explore this destination with our expert guides and carefully curated itinerary."}
              </p>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200">
                {active.duration && (
                  <div className="flex items-center gap-1">
                    <FaClock className="text-sky-400" />
                    <span>{active.duration}</span>
                  </div>
                )}
                {active.rating && (
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{active.rating}</span>
                    <span className="text-slate-400">/ 5.0</span>
                  </div>
                )}
                <div className="px-2 py-1 rounded-full bg-slate-800 text-[11px] uppercase tracking-wide">
                  #{String(activeIndex + 1).padStart(2, "0")} Destination
                </div>
              </div>
            </div>

            {/* Bottom: Price + CTA */}
            <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between gap-4">
              <div>
                {active.originalPrice && active.originalPrice > active.price && (
                  <span className="block text-xs text-slate-500 line-through">
                    ${active.originalPrice}
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-sky-400">
                    ${active.price}
                  </span>
                  <span className="text-xs text-slate-400">/ person</span>
                </div>
              </div>
              <Link
                to={`/tour/${active.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                           bg-sky-500 text-xs font-semibold hover:bg-sky-400 transition-colors"
              >
                View details
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>

          {/* Right: Image card */}
          <div className="relative">
            <div className="h-64 md:h-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800/60 bg-slate-900">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* City / Country label bottom-left (like original) */}
              <div className="absolute bottom-4 left-4">
                <div className="text-xs text-slate-300 uppercase tracking-[0.25em] mb-1">
                  {active.country}
                </div>
                <div className="text-lg font-semibold">
                  {active.city}
                </div>
              </div>

              {/* Index on top-right */}
              <div className="absolute top-4 right-4 text-xs text-slate-200 bg-black/40 px-3 py-1 rounded-full">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom controls (prev/next + progress + thumbnails) */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Prev/Next + Progress */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-200 hover:bg-slate-800"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-200 hover:bg-slate-800"
            >
              <FaArrowRight className="text-xs" />
            </button>

            <div className="hidden md:block w-40 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / total) * 100}%`,
                }}
              />
            </div>

            <span className="text-xs text-slate-400">
              {String(activeIndex + 1).padStart(2, "0")} of{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goTo(idx)}
                className={`relative w-16 h-12 rounded-xl overflow-hidden border 
                  ${
                    idx === activeIndex
                      ? "border-sky-400"
                      : "border-slate-700 opacity-60 hover:opacity-90"
                  } transition`}
              >
                <img
                  src={slide.image}
                  alt={slide.city}
                  className="w-full h-full object-cover"
                />
                {idx === activeIndex && (
                  <div className="absolute inset-0 border-2 border-sky-400 rounded-xl pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelHeroSlider;