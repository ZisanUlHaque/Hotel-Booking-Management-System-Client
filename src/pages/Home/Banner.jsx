import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    img: "https://i.ibb.co.com/ymkj5r1K/pexels-meperdinaviagem-2064827.jpg",
    title: "Explore the World with Ease",
    desc: "Book hotels, tours, and transport from one trusted platform.",
  },
  {
    id: 2,
    img: "https://i.ibb.co.com/PzjFSF17/pexels-semanur-biber-12654341-11597784.jpg",
    title: "Plan Your Perfect Journey",
    desc: "Smart travel planning with secure online booking.",
  },
  {
    id: 3,
    img: "https://i.ibb.co.com/TxxkRQXr/pexels-sergk1-14789774.jpg",
    title: "Travel Smarter, Travel Better",
    desc: "From destinations to stays — everything in one place.",
  },
  {
    id: 4,
    img: "https://i.ibb.co.com/ccvRLKNx/pexels-clickerhappy-19972.jpg",
    title: "Discover New Destinations",
    desc: "Find exciting places and unforgettable experiences.",
  },
  {
    id: 5,
    img: "https://i.ibb.co.com/7tb74sNw/pexels-pixabay-34532.jpg",
    title: "Your Journey Starts Here",
    desc: "Simple, fast, and reliable travel booking system.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="px-4 md:px-0">
      <div
        className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            {/* Image */}
            <img
              src={slide.img}
              alt="Travel Banner"
              className="w-full h-[320px] sm:h-[420px] md:h-[550px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-2xl px-6 md:px-12 text-white"
              >
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-3 text-sm sm:text-base md:text-lg text-white/90">
                  {slide.desc}
                </p>

                {/* Button */}
                <Link to="/search">
                  <button className="mt-6 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition">
                    Start Your Journey
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        ))}

        {/* Prev */}
        <button
          onClick={() =>
            setCurrent((current - 1 + slides.length) % slides.length)
          }
          className="btn btn-circle absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white"
        >
          ❮
        </button>

        {/* Next */}
        <button
          onClick={() => setCurrent((current + 1) % slides.length)}
          className="btn btn-circle absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
