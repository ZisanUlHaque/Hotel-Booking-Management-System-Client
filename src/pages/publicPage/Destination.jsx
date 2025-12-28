import React, { useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router";
import Navbar from "../Shared/Navbar";
import { FaStar, FaHeart, FaRegHeart, FaClock, FaUsers, FaMapMarkerAlt, FaFilter } from "react-icons/fa";

const Destination = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  const isLoading = navigation.state === "loading";

  // Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter & Sort Logic
  const filteredData = data
    ?.filter((tour) => {
      if (filter === "all") return true;
      if (filter === "featured") return tour.isFeatured;
      if (filter === "popular") return tour.isPopular;
      return tour.category?.toLowerCase() === filter;
    })
    .filter((tour) =>
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "duration") return parseInt(a.duration) - parseInt(b.duration);
      return 0;
    });

  // Skeleton Card
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

  // Tour Card Component
  const TourCard = ({ tour, index }) => (
    <div
      className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl 
                 transition-all duration-500 bg-white hover:-translate-y-2
                 animate-fadeIn"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-full w-full object-cover transition-transform 
                     duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {tour.discount > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full
                           animate-pulse">
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

        {/* Wishlist Button */}
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

        {/* Category Badge */}
        <span className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 
                        text-gray-800 text-sm font-medium rounded-full">
          {tour.category}
        </span>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 
                       px-2 py-1 bg-white/90 rounded-full">
          <FaStar className="text-yellow-500" />
          <span className="font-semibold text-sm">{tour.rating}</span>
          <span className="text-gray-500 text-xs">({tour.totalReviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <FaMapMarkerAlt className="text-primary" />
          <span>{tour.city}, {tour.country}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1
                      group-hover:text-primary transition-colors">
          {tour.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {tour.description}
        </p>

        {/* Tour Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FaClock className="text-primary" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-primary" />
            <span>Max {tour.maxGroupSize}</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-xs font-medium
            ${tour.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : ''}
            ${tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : ''}
            ${tour.difficulty === 'Challenging' ? 'bg-red-100 text-red-700' : ''}`}>
            {tour.difficulty}
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            {tour.originalPrice > tour.price && (
              <span className="text-gray-400 line-through text-sm">
                ${tour.originalPrice}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">${tour.price}</span>
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Explore World Destinations
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-fadeIn"
             style={{ animationDelay: '100ms' }}>
            Discover {data?.length}+ incredible tours across the globe. 
            Your next adventure awaits!
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto animate-fadeIn"
               style={{ animationDelay: '200ms' }}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations, cities, or countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-800 
                          shadow-xl focus:outline-none focus:ring-4 
                          focus:ring-white/30 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 
                                px-6 py-2 bg-primary text-white rounded-full
                                hover:bg-primary/90 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start 
                       md:items-center gap-4 mb-8 animate-fadeIn">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {['all', 'featured', 'popular', 'cultural', 'beach', 'adventure', 'luxury', 'romantic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize
                          transition-all duration-300
                          ${filter === cat 
                            ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                            : 'bg-white text-gray-600 hover:bg-gray-100 shadow'}`}
              >
                {cat === 'all' ? '🌍 All' : cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white shadow
                        focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing <span className="font-bold text-primary">{filteredData?.length || 0}</span> destinations
        </p>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* Destinations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData?.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </div>

            {/* Empty State */}
            {(!filteredData || filteredData.length === 0) && (
              <div className="text-center py-20 animate-fadeIn">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No destinations found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search term
                </p>
                <button
                  onClick={() => {
                    setFilter('all');
                    setSearchTerm('');
                    setSortBy('default');
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-lg
                            hover:bg-primary/90 transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Load More Button (Optional) */}
        {filteredData?.length >= 8 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-primary text-primary 
                             font-medium rounded-xl hover:bg-primary hover:text-white
                             transition-all duration-300">
              Load More Destinations
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '30+', label: 'Destinations' },
              { number: '15K+', label: 'Happy Travelers' },
              { number: '4.8', label: 'Average Rating' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="animate-fadeIn" 
                   style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;