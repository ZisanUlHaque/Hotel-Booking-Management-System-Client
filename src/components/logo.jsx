import React from "react";

import logo from "../assets/logo.jpg";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <img src={logo} alt="" className="h-13 w-13" />
        <h2 className="text-3xl font-bold text-black mb-3">
          Trave<span className="text-primary">lio</span>
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
