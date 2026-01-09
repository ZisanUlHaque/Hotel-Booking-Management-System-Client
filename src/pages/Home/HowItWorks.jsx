// src/Components/HowItWorks.jsx
import React, { useState } from "react";
import {
  FaSearchLocation,
  FaCreditCard,
  FaPlaneDeparture,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaSearchLocation className="text-xl text-sky-500" />,
      title: "Find Your Destination",
      desc: "Browse our curated tours and choose the one that matches your dream trip.",
      hint: "Filter by country, budget, or travel style to discover trips made for you.",
    },
    {
      id: 2,
      icon: <FaCreditCard className="text-xl text-sky-500" />,
      title: "Book & Confirm",
      desc: "Securely book your tour online in just a few clicks. Instant confirmation.",
      hint: "Pay with your preferred method and receive all details in your inbox.",
    },
    {
      id: 3,
      icon: <FaPlaneDeparture className="text-xl text-sky-500" />,
      title: "Enjoy Your Trip",
      desc: "Pack your bags and enjoy a hassle-free travel experience with expert guides.",
      hint: "We handle the logistics so you can focus on new places and memories.",
    },
  ];

  const [activeStep, setActiveStep] = useState(steps[0]);

  const progress = (activeStep.id / steps.length) * 100;

  return (
    <section className="py-16 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-600">
            How It Works
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3">
            Plan Your Trip in 3 Simple Steps
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">
            From browsing to booking – everything is designed to feel smooth,
            fast, and fun.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const isActive = activeStep.id === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onMouseEnter={() => setActiveStep(step)}
                onClick={() => setActiveStep(step)}
                className={`
                  group relative text-left rounded-2xl p-5 md:p-6 
                  border transition-all duration-300 
                  backdrop-blur
                  ${
                    isActive
                      ? "bg-slate-900 text-white border-sky-500 shadow-xl shadow-sky-500/20"
                      : "bg-white/70 border-slate-100 hover:border-sky-300 hover:shadow-md"
                  }
                `}
              >
                {/* Glow background for active */}
                {isActive && (
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/20 via-transparent to-sky-400/10" />
                )}

                <div className="relative flex items-start gap-4">
                  {/* Step Number */}
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center 
                      text-xs font-semibold shrink-0
                      ${
                        isActive
                          ? "bg-sky-500 text-white"
                          : "bg-sky-50 text-sky-600 group-hover:bg-sky-100"
                      }
                    `}
                  >
                    {step.id.toString().padStart(2, "0")}
                  </div>

                  {/* Icon + Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`
                          w-9 h-9 rounded-full flex items-center justify-center 
                          shadow-sm
                          ${
                            isActive
                              ? "bg-sky-100/20 border border-sky-400/60"
                              : "bg-white border border-slate-100 group-hover:border-sky-200"
                          }
                        `}
                      >
                        {step.icon}
                      </div>
                      <h3
                        className={`
                          text-sm md:text-base font-semibold
                          ${isActive ? "text-white" : "text-slate-900"}
                        `}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <p
                      className={`
                        text-xs md:text-sm
                        ${isActive ? "text-slate-200" : "text-slate-500"}
                      `}
                    >
                      {step.desc}
                    </p>

                    {/* Hover/Active micro-copy */}
                    <p
                      className={`
                        mt-3 text-[11px] 
                        ${
                          isActive
                            ? "text-sky-200"
                            : "text-slate-400 group-hover:text-slate-500"
                        }
                      `}
                    >
                      {step.hint}
                    </p>
                  </div>
                </div>

                {/* Bottom line accent */}
                <div
                  className={`
                    mt-4 h-0.5 rounded-full 
                    ${
                      isActive
                        ? "bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500"
                        : "bg-slate-100 group-hover:bg-sky-100"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>

        {/* Interactive progress + active step details */}
        <div className="mt-10 max-w-2xl mx-auto text-center">
          {/* Progress bar */}
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="w-40 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Step {activeStep.id} of {steps.length}
            </span>
          </div>

          {/* Active step text */}
          <p className="text-xs md:text-sm text-slate-500">
            <span className="font-semibold text-slate-800">
              {activeStep.title}
            </span>{" "}
            — {activeStep.desc}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;