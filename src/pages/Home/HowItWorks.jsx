// src/Components/HowItWorks.jsx
import React from "react";
import { FaSearchLocation, FaCreditCard, FaPlaneDeparture } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaSearchLocation className="text-2xl text-primary" />,
      title: "Find Your Destination",
      desc: "Browse our curated tours and choose the one that matches your dream trip.",
    },
    {
      id: 2,
      icon: <FaCreditCard className="text-2xl text-primary" />,
      title: "Book & Confirm",
      desc: "Securely book your tour online in just a few clicks. Instant confirmation.",
    },
    {
      id: 3,
      icon: <FaPlaneDeparture className="text-2xl text-primary" />,
      title: "Enjoy Your Trip",
      desc: "Pack your bags and enjoy a hassle-free travel experience with expert guides.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-primary font-medium uppercase tracking-wide text-3xl">
            How It Works
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
            Plan Your Trip in 3 Simple Steps
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
            From browsing to booking – everything is quick and effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-primary">
                    {step.id.toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;