// src/Components/TestimonialsPreview.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

const TestimonialsPreview = () => {
  const testimonials = [
    {
      id: 1,
      name: "Amanda Wilson",
      tour: "Rome, Italy",
      text: "Best travel experience ever! Everything was perfectly organized and our guide was amazing.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 2,
      name: "Robert James",
      tour: "Tokyo, Japan",
      text: "Loved every moment. Great balance of sightseeing and free time. Highly recommend!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      id: 3,
      name: "Lisa & Mark",
      tour: "Paris, France",
      text: "Our honeymoon was magical. The team took care of all the details so we could just relax.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-primary font-medium uppercase tracking-wide text-3xl">
            Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
            What Our Travelers Say
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
            Real stories from people who explored the world with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex gap-1 text-yellow-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-5">“{item.text}”</p>
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-xs">{item.tour}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small summary strip */}
        <div className="mt-10 text-center text-sm text-gray-500">
          Trusted by <span className="font-semibold text-primary">15,000+</span>{" "}
          happy travelers worldwide.
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;