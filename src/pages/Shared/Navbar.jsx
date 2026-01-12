// src/Shared/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../Components/logo";
import useAuth from "../../hooks/useAuth";
import userimg from "../../assets/user.jpg"; // fallback avatar

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logOut().catch((error) => {
      console.log(error);
    });
  };

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/destination", label: "Destinations" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "/blog", label: "Blog" },
  ];

  const renderLinks = (variant = "desktop") => (
    <ul
      className={
        variant === "desktop"
          ? "flex items-center gap-6"
          : "flex flex-col gap-2 py-3"
      }
    >
      {navItems.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              [
                "relative text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-gray-600 hover:text-primary",
              ].join(" ")
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {({ isActive }) => (
              <span className="inline-flex flex-col items-start">
                <span>{item.label}</span>
                {isActive && (
                  <span className="mt-1 h-0.5 w-6 rounded-full bg-primary" />
                )}
              </span>
            )}
          </NavLink>
        </li>
      ))}

      {/* 🔹 User logged in থাকলে Dashboard link (desktop + mobile দুই জায়গাতেই কাজ করবে) */}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              [
                "relative text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-gray-600 hover:text-primary",
              ].join(" ")
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {({ isActive }) => (
              <span className="inline-flex flex-col items-start">
                <span>Dashboard</span>
                {isActive && (
                  <span className="mt-1 h-0.5 w-6 rounded-full bg-primary" />
                )}
              </span>
            )}
          </NavLink>
        </li>
      )}
    </ul>
  );

  return (
    <header
      className={`sticky top-0 z-50 bg-white/80 backdrop-blur border-b 
      ${isScrolled ? "shadow-md" : "shadow-sm"} transition-shadow`}
    >
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-6">
        {/* Left: Logo + Brand */}
        <div className="navbar-start gap-2">
          {/* Mobile menu button */}
          <button
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-gray-900"
          >
            <Logo />
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          {renderLinks("desktop")}
        </div>

        {/* Right: Actions / Auth */}
        <div className="navbar-end">
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center px-3 py-1.5 text-sm 
                             font-medium text-gray-700 rounded-full border border-gray-300 
                             hover:border-primary hover:text-primary transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold 
                             rounded-full bg-primary text-white hover:bg-primary/90 
                             transition-colors"
                >
                  Book a Trip
                </Link>
              </>
            ) : (
              // user থাকলে avatar dropdown
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full overflow-hidden">
                    <img
                      src={user.photoURL || userimg}
                      alt="User Avatar"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content 
                             bg-base-100 rounded-box w-52"
                >
                  <li className="mb-1 px-2 text-sm text-gray-500">
                    {user.displayName || user.email}
                  </li>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 pb-4">
            {renderLinks("mobile")}

            {/* Mobile auth buttons */}
            {!user && (
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full px-3 py-2 text-sm font-medium text-center 
                             rounded-full border border-gray-300 text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full px-3 py-2 text-sm font-semibold text-center 
                             rounded-full bg-primary text-white"
                >
                  Book a Trip
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;