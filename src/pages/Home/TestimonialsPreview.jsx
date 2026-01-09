// src/Components/TestimonialsPreview.jsx
import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TestimonialsPreview = () => {
  const testimonials = [
    {
      id: 1,
      name: "Amanda Wilson",
      tour: "Rome, Italy",
      text: "Best travel experience ever! Everything was perfectly organized and our guide was amazing.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      tripType: "Historic Escape",
    },
    {
      id: 2,
      name: "Robert James",
      tour: "Tokyo, Japan",
      text: "Loved every moment. Great balance of sightseeing and free time. Highly recommend!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      tripType: "City Adventure",
    },
    {
      id: 3,
      name: "Lisa & Mark",
      tour: "Paris, France",
      text: "Our honeymoon was magical. The team took care of all the details so we could just relax.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/47.jpg",
      tripType: "Romantic Getaway",
    },
  ];

  return (
    <section className="py-16 bg-slate-950 mt-10 rounded-3xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400">
            Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mt-3">
            What Our Travelers Say
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            Real stories from people who explored the world with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => {
            // card style আলাদা আলাদা করে দিচ্ছি
            const isMiddle = index === 1;

            return (
              <div
                key={item.id}
                className={`
                  relative rounded-3xl p-6 md:p-7 overflow-hidden
                  transition-all duration-300 cursor-default
                  border
                  ${
                    isMiddle
                      ? "bg-gradient-to-br from-sky-500 via-cyan-400 to-primary text-white border-transparent shadow-xl shadow-sky-500/40 scale-[1.02]"
                      : "bg-slate-900 border-slate-800 hover:border-sky-500/60 hover:shadow-lg hover:shadow-sky-500/20"
                  }
                `}
              >
                {/* subtle gradient glow for side cards */}
                {!isMiddle && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-purple-500/10 opacity-80" />
                )}

                {/* content wrapper to keep above glow */}
                <div className="relative flex flex-col h-full">
                  {/* top row: quote icon + rating */}
                  <div className="flex items-center justify-between mb-4">
                    <FaQuoteLeft
                      className={`text-2xl ${
                        isMiddle ? "text-white/80" : "text-sky-400/80"
                      }`}
                    />
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < item.rating ? "opacity-100" : "opacity-40"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* tour tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] mb-3 border">
                    <span
                      className={
                        isMiddle ? "bg-white/10 px-1.5 py-0.5 rounded-full" : ""
                      }
                    >
                      ✈️
                    </span>
                    <span
                      className={
                        isMiddle ? "text-white/90" : "text-sky-300/90"
                      }
                    >
                      {item.tripType}
                    </span>
                  </div>

                  {/* text */}
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isMiddle ? "text-white/90" : "text-slate-200"
                    }`}
                  >
                    “{item.text}”
                  </p>

                  {/* spacer so bottom section sticks at end */}
                  <div className="flex-1" />

                  {/* bottom: avatar + name + tour */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-700/60">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-sky-400/70"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900" />
                      </div>
                      <div>
                        <p
                          className={`font-semibold text-sm ${
                            isMiddle ? "text-white" : "text-slate-50"
                          }`}
                        >
                          {item.name}
                        </p>
                        <p
                          className={`text-[11px] ${
                            isMiddle ? "text-slate-100/80" : "text-slate-400"
                          }`}
                        >
                          {item.tour}
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-[11px]">
                      <p className={isMiddle ? "text-white/80" : "text-slate-300"}>
                        Verified Traveler
                      </p>
                      <p className={isMiddle ? "text-sky-100" : "text-sky-400"}>
                        ★ {item.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* bottom accent line */}
                <div
                  className={`
                    absolute bottom-0 left-0 right-0 h-1 
                    ${
                      isMiddle
                        ? "bg-gradient-to-r from-yellow-300 via-white to-yellow-300"
                        : "bg-gradient-to-r from-sky-500/50 via-cyan-400/60 to-sky-500/50"
                    }
                  `}
                />
              </div>
            );
          })}
        </div>

        {/* Small summary strip */}
        <div className="mt-10 text-center text-sm text-slate-400">
          Trusted by{" "}
          <span className="font-semibold text-sky-400">15,000+</span> happy
          travelers worldwide.
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;