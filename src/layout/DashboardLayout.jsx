// src/layout/DashboardLayout.jsx
import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { TbBrandBooking } from "react-icons/tb";
import { FiSettings, FiHome } from "react-icons/fi";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";

import userImg from "../assets/user.jpg";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content min-h-screen bg-gray-50">
        {/* Top bar */}
        <nav className="navbar w-full bg-base-300 px-4 lg:px-10">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="size-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 font-semibold text-xl">
            Trave<span className="text-primary">lio</span> Dashboard
          </div>
          <div className="flex-none hidden sm:flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {user?.displayName || user?.email}
            </span>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={user?.photoURL || userImg}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </nav>

        {/* Page content */}
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-60">
          <ul className="menu w-full grow">
            {/* Back to site */}
            <li className="mt-2 mb-1">
              <NavLink
                to="/"
                className="flex items-center gap-2 px-4 py-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Back to Home"
              >
                <IoChevronBackOutline className="text-lg" />
                <span className="text-sm font-medium is-drawer-close:hidden">
                  Back to Home
                </span>
              </NavLink>
            </li>

            {/* Brand name only when drawer open */}
            <li className="mb-2 px-4 is-drawer-close:hidden">
              <span className="font-semibold text-lg">
                Travelio
              </span>
            </li>

            {/* Divider */}
            <li className="my-1">
              <span className="text-xs text-gray-400 is-drawer-close:hidden px-4">
                {isAdmin ? "Admin Panel" : "User Panel"}
              </span>
            </li>

            {/* Dashboard Home */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
              >
                <FiHome />
                <span className="is-drawer-close:hidden">Overview</span>
              </NavLink>
            </li>

            {/* User specific links */}
            <li>
              <NavLink
                to="/dashboard/my-booking"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Bookings"
              >
                <TbBrandBooking />
                <span className="is-drawer-close:hidden">
                  My Bookings
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <FaUser />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>

            {/* Admin links */}
            {isAdmin && (
              <>
                <li className="mt-3">
                  <span className="text-xs text-gray-400 is-drawer-close:hidden px-4">
                    Admin
                  </span>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/all-bookings"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Bookings"
                  >
                    <MdTravelExplore />
                    <span className="is-drawer-close:hidden">
                      Manage Bookings
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users"
                  >
                    <FaUsers />
                    <span className="is-drawer-close:hidden">
                      Manage Users
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Settings placeholder */}
            <li className="mt-auto mb-2">
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <FiSettings />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>

          {/* Bottom user info (mobile sidebar) */}
          <div className="w-full border-t border-base-300 px-4 py-3 flex items-center gap-2 is-drawer-open:flex is-drawer-close:hidden">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={user?.photoURL || userImg}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;