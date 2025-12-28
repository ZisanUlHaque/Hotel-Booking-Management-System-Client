import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

const PopularDestination = () => {
  const data = useLoaderData();
  const popularTours = data?.slice(0, 8);
  const [wishlist, setWishlist] = useState([]);

  // Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Skeleton Card (For loading state)
  const SkeletonCard = () => (
    <div className="rounded-2xl overflow-hidden shadow-md animate-pulse bg-white">
      <div className="h-56 w-full bg-gray-300"></div>
      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  // 👉 ENHANCED TOUR CARD 👈
  const TourCard = ({ tour, index }) => (
    <div
      className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl 
                 transition-all duration-500 bg-white hover:-translate-y-2
                 animate-fadeIn"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* ===== IMAGE SECTION ===== */}
      <div className="relative overflow-hidden h-56">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-full w-full object-cover transition-transform 
                     duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* BADGES (Discount / Featured / Limited Spots) */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {tour.discount > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
              {tour.discount}% OFF
            </span>
          )}
          {tour.isFeatured && (
            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
              ⭐ Featured
            </span>
          )}
          {tour.availableSpots <= 5 && (
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              Only {tour.availableSpots} left!
            </span>
          )}
        </div>

        {/* ❤️ WISHLIST BUTTON */}
        <button
          onClick={() => toggleWishlist(tour.id)}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full
                     hover:bg-white transition-all duration-300 hover:scale-110
                     shadow-lg"
        >
          {wishlist.includes(tour.id) ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-600 text-xl" />
          )}
        </button>

        {/* CATEGORY BADGE */}
        <span
          className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 
                     text-gray-800 text-sm font-medium rounded-full"
        >
          {tour.category}
        </span>

        {/* RATING */}
        <div
          className="absolute bottom-4 right-4 flex items-center gap-1 
                     px-2 py-1 bg-white/90 rounded-full"
        >
          <FaStar className="text-yellow-500" />
          <span className="font-semibold text-sm">{tour.rating}</span>
          <span className="text-gray-500 text-xs">({tour.totalReviews})</span>
        </div>
      </div>

      {/* ===== CONTENT SECTION ===== */}
      <div className="p-5">
        {/* LOCATION */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <FaMapMarkerAlt className="text-primary" />
          <span>
            {tour.city}, {tour.country}
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1
                      group-hover:text-primary transition-colors">
          {tour.title}
        </h2>

        {/* DESCRIPTION (max 2 lines) */}
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {tour.description}
        </p>

        {/* TOUR INFO (Duration, Group Size, Difficulty) */}
        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FaClock className="text-primary" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-primary" />
            <span>Max {tour.maxGroupSize}</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium
              ${
                tour.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : tour.difficulty === "Moderate"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {tour.difficulty}
          </span>
        </div>

        {/* PRICE & BUTTON */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            {tour.originalPrice > tour.price && (
              <span className="text-gray-400 line-through text-sm block">
                ${tour.originalPrice}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">
                ${tour.price}
              </span>
              <span className="text-gray-500 text-sm">/person</span>
            </div>
          </div>

          <Link
            to={`/tour/${tour.id}`}
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl
                      hover:bg-primary/90 transition-all duration-300 
                      hover:shadow-lg hover:shadow-primary/30
                      active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary 
                          font-medium rounded-full text-sm mb-4">
            🌟 Top Picks
          </span>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Popular Destinations
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Discover the most loved destinations around the world
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTours?.length > 0 ? (
            popularTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))
          ) : (
            // Loading Skeleton
            [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          )}
        </div>

        {/* View More */}
        <div className="text-center mt-10">
          <Link
            to="/destination"
            className="inline-block px-6 py-3 bg-primary text-white 
                      font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestination;