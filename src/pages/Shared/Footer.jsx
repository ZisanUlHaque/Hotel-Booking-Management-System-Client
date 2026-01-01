import React from "react";
import { Link } from "react-router";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
          
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Trave<span className="text-primary">lio</span>
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Discover unforgettable experiences around the world with curated 
              tours, expert guides, and seamless travel planning.
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Follow us on social media:
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary transition-colors text-sm"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary transition-colors text-sm"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary transition-colors text-sm"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary transition-colors text-sm"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary transition-colors text-sm"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/destination" className="hover:text-primary">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories / Explore */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/destination?type=popular" className="hover:text-primary">
                  Popular Tours
                </Link>
              </li>
              <li>
                <Link to="/destination?type=beach" className="hover:text-primary">
                  Beach Destinations
                </Link>
              </li>
              <li>
                <Link to="/destination?type=cultural" className="hover:text-primary">
                  Cultural Trips
                </Link>
              </li>
              <li>
                <Link to="/destination?type=adventure" className="hover:text-primary">
                  Adventure Tours
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact & Updates
            </h3>

            {/* Contact Info */}
            <div className="space-y-2 text-sm mb-4">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <span>123 Travel Street, New York, USA</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-primary" />
                <a href="tel:+15551234567" className="hover:text-primary">
                  +1 (555) 123-4567
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <a href="mailto:info@travelworld.com" className="hover:text-primary">
                  info@travelworld.com
                </a>
              </p>
            </div>

            {/* Newsletter */}
            <p className="text-sm text-gray-400 mb-2">
              Subscribe for travel deals & updates:
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg text-sm text-gray-900 
                           focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg"
              >
                Join
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-1">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>
            © {year} <span className="text-gray-300 font-medium">TravelWorld</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-primary">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <span className="hidden md:inline-block text-gray-600">|</span>
            <span className="text-gray-600">
              Made with <span className="text-primary">♥</span> for travelers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;