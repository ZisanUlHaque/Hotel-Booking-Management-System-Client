// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router";

import image from "../assets/image.jpg";
import Logo from "../Components/logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Logo />
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className="flex-1 flex items-center justify-center">
          <Outlet />
        </div>

        <div className="hidden md:block flex-1">
          <img
            src={image}
            alt="Auth Visual"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;