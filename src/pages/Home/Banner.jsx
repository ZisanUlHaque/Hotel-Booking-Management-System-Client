import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const slides = [
  {
    id: 1, // Italy
    img: "https://i.ibb.co.com/ymkj5r1K/pexels-meperdinaviagem-2064827.jpg",
    title: "Experience the Beauty of Italy",
    desc: "Explore historic cities, romantic canals, and world-famous Italian cuisine.",
  },
  {
    id: 2, // Turkey
    img: "https://i.ibb.co.com/PzjFSF17/pexels-semanur-biber-12654341-11597784.jpg",
    title: "Discover the Wonders of Turkey",
    desc: "Where ancient history meets vibrant culture and breathtaking landscapes.",
  },
  {
    id: 3, // Bangladesh
    img: "https://i.ibb.co.com/KzwrHmmb/pexels-mo-eid-1268975-17877081.jpg",
    title: "Explore the Heart of Bangladesh",
    desc: "From lush green villages to rivers, beaches, and rich cultural heritage.",
  },
  {
    id: 4, // London
    img: "https://i.ibb.co.com/ccvRLKNx/pexels-clickerhappy-19972.jpg",
    title: "Feel the Charm of London",
    desc: "Iconic landmarks, modern lifestyle, and a perfect blend of tradition and innovation.",
  },
  {
    id: 5, // Spain
    img: "https://i.ibb.co.com/7tb74sNw/pexels-pixabay-34532.jpg",
    title: "Enjoy the Spirit of Spain",
    desc: "Sun-kissed beaches, lively festivals, and unforgettable Mediterranean vibes.",
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
                className="max-w-2xl px-6 md:px-16 text-white"
              >
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-3 text-sm sm:text-base md:text-lg text-white/90">
                  {slide.desc}
                </p>

                {/* Button */}
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center
             mt-6 px-6 py-3 rounded-full 
             bg-primary text-white font-semibold 
             text-sm sm:text-base
             hover:bg-primary/90 
             active:scale-95 
             transition-all duration-200 
             shadow-lg"
                >
                  Start Your Journey
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
