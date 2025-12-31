import React, { useState, useMemo } from "react";
import { useLoaderData, Link } from "react-router";
import Navbar from "../Shared/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  FaStar, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaLanguage,
  FaHeart,
  FaShare,
  FaChevronDown,
  FaChevronUp,
  FaMinus,
  FaPlus
} from "react-icons/fa";
import MapComponent from "../publicPage/MapComponent";

const TourDetails = () => {
  const tour = useLoaderData();
  const [activeDay, setActiveDay] = useState(1);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  
  // Booking State
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);

  // Calculate Total Price
  const totalPrice = useMemo(() => {
    return tour?.price * guests;
  }, [tour?.price, guests]);

  // Calculate Final Price with Discount
  const finalPrice = useMemo(() => {
    if (tour?.discount > 0) {
      return Math.round(totalPrice - (totalPrice * tour.discount / 100));
    }
    return totalPrice;
  }, [totalPrice, tour?.discount]);

  // Increase/Decrease guests
  const increaseGuests = () => {
    if (guests < (tour?.maxGroupSize || 10)) {
      setGuests(guests + 1);
    }
  };

  const decreaseGuests = () => {
    if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tour Not Found</h2>
          <Link to="/destination" className="text-primary underline">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/destination" className="hover:text-primary">Destinations</Link>
            <span>/</span>
            <span className="text-gray-800">{tour.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 mb-4">
              {tour.isFeatured && (
                <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
                  ⭐ Featured
                </span>
              )}
              {tour.isPopular && (
                <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                  🔥 Popular
                </span>
              )}
              <span className="px-3 py-1 bg-white/90 text-gray-800 text-sm font-medium rounded-full">
                {tour.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {tour.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt />
                <span>{tour.city}, {tour.country}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-bold">{tour.rating}</span>
                <span className="text-white/80">({tour.totalReviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-6 right-6 flex gap-3">
          <button className="p-3 bg-white rounded-full shadow-lg">
            <FaHeart className="text-gray-500 text-xl" />
          </button>
          <button className="p-3 bg-white rounded-full shadow-lg">
            <FaShare className="text-gray-500 text-xl" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaClock className="text-primary text-2xl mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Duration</p>
                  <p className="font-bold text-gray-800">{tour.duration}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaUsers className="text-primary text-2xl mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Group Size</p>
                  <p className="font-bold text-gray-800">Max {tour.maxGroupSize}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaLanguage className="text-primary text-2xl mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Languages</p>
                  <p className="font-bold text-gray-800">{tour.languages?.length || 2} Available</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <span className="text-2xl block mb-2">👤</span>
                  <p className="text-gray-500 text-sm">Min Age</p>
                  <p className="font-bold text-gray-800">{tour.minAge}+ Years</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Tour</h2>
              <p className="text-gray-600 leading-relaxed">{tour.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-gray-600">Difficulty:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${tour.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : ''}
                  ${tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : ''}
                  ${tour.difficulty === 'Challenging' ? 'bg-red-100 text-red-700' : ''}`}>
                  {tour.difficulty}
                </span>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(showAllHighlights ? tour.highlights : tour.highlights?.slice(0, 4))?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                      <FaCheck className="text-primary text-xs" />
                    </span>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
              {tour.highlights?.length > 4 && (
                <button 
                  onClick={() => setShowAllHighlights(!showAllHighlights)}
                  className="mt-4 text-primary font-medium flex items-center gap-1"
                >
                  {showAllHighlights ? (
                    <>Show Less <FaChevronUp /></>
                  ) : (
                    <>Show All {tour.highlights.length} Highlights <FaChevronDown /></>
                  )}
                </button>
              )}
            </div>

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Day by Day Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day) => (
                    <div 
                      key={day.day}
                      className={`border rounded-xl overflow-hidden
                        ${activeDay === day.day ? 'border-primary' : 'border-gray-200'}`}
                    >
                      <button
                        onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                        className={`w-full p-4 flex items-center justify-between text-left
                          ${activeDay === day.day ? 'bg-primary/5' : 'bg-white'}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                            ${activeDay === day.day ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                            {day.day}
                          </span>
                          <div>
                            <h3 className="font-bold text-gray-800">{day.title}</h3>
                            {day.meals && (
                              <p className="text-sm text-gray-500">🍽️ {day.meals.join(", ")}</p>
                            )}
                          </div>
                        </div>
                        {activeDay === day.day ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      
                      {activeDay === day.day && (
                        <div className="p-4 border-t bg-gray-50">
                          <p className="text-gray-600">{day.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included / Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheck className="text-green-600" />
                  </span>
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {tour.included?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <FaTimes className="text-red-600" />
                  </span>
                  What's Excluded
                </h2>
                <ul className="space-y-3">
                  {tour.excluded?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <FaTimes className="text-red-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tour Guide */}
            {tour.tourGuide && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tour Guide</h2>
                <div className="flex items-center gap-4">
                  <img
                    src={tour.tourGuide.avatar}
                    alt={tour.tourGuide.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{tour.tourGuide.name}</h3>
                    <p className="text-gray-500">{tour.tourGuide.experience} Experience</p>
                    <div className="flex items-center gap-1 mt-1">
                      <FaStar className="text-yellow-500" />
                      <span className="font-bold">{tour.tourGuide.rating}</span>
                      <span className="text-gray-500">Rating</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {tour.tourGuide.languages?.map((lang, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            {tour.reviews && tour.reviews.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Reviews ({tour.totalReviews})
                </h2>
                
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary">{tour.rating}</p>
                    <div className="flex gap-1 justify-center my-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(tour.rating) ? 'text-yellow-500' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">{tour.totalReviews} reviews</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {tour.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-gray-800">{review.user}</h4>
                            <span className="text-gray-500 text-sm">{review.date}</span>
                          </div>
                          <div className="flex gap-1 my-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'} 
                                size={12}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map Section */}
            {tour.location && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Meeting Point</h2>
                <div className="flex items-start gap-3 mb-4">
                  <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">{tour.location.meetingPoint}</p>
                    <p className="text-gray-500 text-sm">{tour.city}, {tour.country}</p>
                  </div>
                </div>
                
                <MapComponent 
                  lat={tour.location.lat}
                  lng={tour.location.lng}
                  meetingPoint={tour.location.meetingPoint}
                  city={tour.city}
                  country={tour.country}
                />
              </div>
            )}
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
              
              {/* Price Per Person */}
              <div className="mb-4">
                {tour.discount > 0 && (
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-sm font-bold rounded-full mb-2">
                    {tour.discount}% OFF
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  {tour.originalPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      ${tour.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-primary">${tour.price}</span>
                  <span className="text-gray-500">/person</span>
                </div>
              </div>

              <hr className="my-4" />

              {/* Simple Date Picker - Any Date */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  <FaCalendarAlt className="inline mr-2 text-primary" />
                  Select Your Travel Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  placeholderText="Pick a date"
                  dateFormat="dd MMMM, yyyy"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white 
                            focus:outline-none focus:ring-2 focus:ring-primary 
                            focus:border-primary cursor-pointer"
                  showPopperArrow={false}
                  isClearable
                />
              </div>

              {/* Guest Selector */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  <FaUsers className="inline mr-2 text-primary" />
                  Number of Guests
                </label>
                <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white">
                  <button
                    onClick={decreaseGuests}
                    disabled={guests <= 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${guests <= 1 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-primary text-white'}`}
                  >
                    <FaMinus />
                  </button>
                  
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-800">{guests}</span>
                    <p className="text-xs text-gray-500">
                      {guests === 1 ? 'Guest' : 'Guests'}
                    </p>
                  </div>
                  
                  <button
                    onClick={increaseGuests}
                    disabled={guests >= (tour.maxGroupSize || 10)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${guests >= (tour.maxGroupSize || 10)
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-primary text-white'}`}
                  >
                    <FaPlus />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Max {tour.maxGroupSize || 10} guests per booking
                </p>
              </div>

              <hr className="my-4" />

              {/* Price Calculation */}
              <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-3">Price Details</h3>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                    ${tour.price} × {guests} {guests === 1 ? 'guest' : 'guests'}
                  </span>
                  <span className="font-medium">${totalPrice}</span>
                </div>
                
                {tour.discount > 0 && (
                  <div className="flex justify-between items-center mb-2 text-green-600">
                    <span>Discount ({tour.discount}%)</span>
                    <span>-${Math.round(totalPrice * tour.discount / 100)}</span>
                  </div>
                )}
                
                <hr className="my-3" />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-primary">${finalPrice}</span>
                </div>
              </div>

              {/* Available Spots Warning */}
              {tour.availableSpots && tour.availableSpots <= 10 && (
                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-orange-600 font-medium text-center text-sm">
                    🔥 Only {tour.availableSpots} spots left!
                  </p>
                </div>
              )}

              {/* Book Button */}
              <button 
                disabled={!selectedDate}
                className={`w-full py-4 font-bold text-lg rounded-xl mb-3
                  ${selectedDate 
                    ? 'bg-primary text-white cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                {selectedDate ? `Book Now - $${finalPrice}` : 'Select a Date to Book'}
              </button>

              {/* Selected Summary */}
              {selectedDate && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm font-medium text-center">
                    ✓ {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-green-600 text-xs text-center mt-1">
                    {guests} {guests === 1 ? 'guest' : 'guests'} • {tour.duration}
                  </p>
                </div>
              )}

              {/* Contact */}
              <button className="w-full py-3 border-2 border-primary text-primary font-medium rounded-xl">
                Have Questions? Contact Us
              </button>

              {/* Quick Info */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  <span>Mobile voucher accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;