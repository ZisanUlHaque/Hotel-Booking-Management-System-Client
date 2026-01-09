// src/Components/FinalCTA.jsx
import React from "react";
import { Link } from "react-router";

const FinalCTA = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে তুমি বাস্তব নিউজলেটার logic / API call add করতে পারো
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary/90 to-sky-500 text-white mb-10 rounded-3xl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr,1.4fr] gap-8 items-center">
          {/* Left: Text / CTA */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-2">
              Ready to go?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Plan your next adventure with TravelWorld
            </h2>
            <p className="text-sm md:text-base text-white/80 mb-6 max-w-md">
              Get exclusive deals, travel tips, and handpicked destination
              ideas delivered straight to your inbox.
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-white/80">
              <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                ✅ No spam, ever
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                ✈️ Handpicked offers
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                🌍 Trending destinations
              </div>
            </div>
          </div>

          {/* Right: Newsletter form */}
          <div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 md:p-6 border border-white/15 shadow-lg">
              <p className="text-sm font-medium mb-3">
                Join <span className="font-bold">10,000+</span> travelers on our
                email list
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 rounded-full text-sm text-gray-900 
                             focus:outline-none focus:ring-2 focus:ring-white/80"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-sm font-semibold 
                             bg-white text-primary hover:bg-slate-100 
                             transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-2 text-[11px] text-white/70">
                You can unsubscribe at any time with a single click.
              </p>

              {/* Secondary CTA */}
              <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap gap-3 items-center justify-between">
                <p className="text-xs text-white/80">
                  Prefer to explore now?
                </p>
                <Link
                  to="/destination"
                  className="text-xs font-semibold underline underline-offset-4"
                >
                  View all destinations →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;