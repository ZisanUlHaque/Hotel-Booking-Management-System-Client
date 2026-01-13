// src/Components/Marque.jsx
import React from "react";

const Marque = () => {
  const row1 = [
    { label: "Rome, Italy", meta: "5 Days · From $1200", emoji: "🇮🇹" },
    { label: "Paris, France", meta: "4 Days · From $1350", emoji: "🇫🇷" },
    { label: "Tokyo, Japan", meta: "7 Days · From $2000", emoji: "🇯🇵" },
    { label: "Bangkok, Thailand", meta: "5 Days · From $850", emoji: "🇹🇭" },
    { label: "Dubai, UAE", meta: "4 Days · From $1600", emoji: "🇦🇪" },
    { label: "Bali, Indonesia", meta: "6 Days · From $1000", emoji: "🇮🇩" },
  ];

  const row2 = [
    { label: "Cox's Bazar, BD", meta: "3 Days · From $400", emoji: "🌊" },
    { label: "London, UK", meta: "5 Days · From $1500", emoji: "🇬🇧" },
    { label: "New York, USA", meta: "6 Days · From $1800", emoji: "🇺🇸" },
    { label: "Sydney, AU", meta: "6 Days · From $1900", emoji: "🇦🇺" },
    { label: "Zurich, CH", meta: "6 Days · From $2200", emoji: "🇨🇭" },
    { label: "Seoul, KR", meta: "5 Days · From $1700", emoji: "🇰🇷" },
  ];

  const duplicate = (arr) => [...arr, ...arr];

  return (
    <>
      {/* Inline styles for animations */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .marquee-row {
            animation: marquee 25s linear infinite;
          }
          .marquee-row:hover {
            animation-play-state: paused;
          }
          .marquee-row-reverse {
            animation: marquee-reverse 25s linear infinite;
          }
          .marquee-row-reverse:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <section className="relative py-10 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 overflow-hidden rounded-3xl">
        {/* subtle blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-700/70 text-[11px] uppercase tracking-[0.25em] text-sky-400">
                Trending now
              </p>
              <h3 className="mt-2 text-lg md:text-xl font-semibold text-slate-50">
                Most searched destinations this week
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-400 max-w-sm">
              Swipe through popular spots travelers are booking right now – tap
              a card on desktop to pause.
            </p>
          </div>

          {/* Row 1 */}
          <div className="relative mb-4 overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <div className="marquee-row flex items-center gap-4 w-max">
              {duplicate(row1).map((item, idx) => (
                <div
                  key={idx}
                  className="group min-w-[200px] md:min-w-[230px] px-4 py-2.5 rounded-2xl 
                             bg-slate-900/70 border border-slate-700/80 
                             backdrop-blur shadow-[0_0_25px_rgba(15,23,42,0.7)]
                             hover:border-sky-500/80 hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]
                             transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-lg">
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {item.emoji}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-50 truncate">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {item.meta}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (reverse direction) */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <div className="marquee-row-reverse flex items-center gap-4 w-max">
              {duplicate(row2).map((item, idx) => (
                <div
                  key={idx}
                  className="group min-w-[200px] md:min-w-[230px] px-4 py-2.5 rounded-2xl 
                             bg-slate-900/70 border border-slate-700/80 
                             backdrop-blur shadow-[0_0_25px_rgba(15,23,42,0.7)]
                             hover:border-sky-500/80 hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]
                             transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-lg">
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {item.emoji}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-50 truncate">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {item.meta}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Small footer text */}
          <p className="mt-6 text-[11px] md:text-xs text-slate-500">
            Updated in real-time based on searches and bookings on our platform.
          </p>
        </div>
      </section>
    </>
  );
};

export default Marque;