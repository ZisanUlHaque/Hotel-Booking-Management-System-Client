import React from "react";

import logo from "../assets/logo.jpg";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <img src={logo} alt="" className="h-13 w-13" />
        <h3
          className="text-3xl font-bold"
          style={{ color: "oklch(76.9% 0.188 70.08)" }}
        >
          Travelio
        </h3>
      </div>
    </Link>
  );
};

export default Logo;