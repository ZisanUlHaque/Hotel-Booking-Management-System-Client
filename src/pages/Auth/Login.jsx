// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInGoogle, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleLogin = async (data) => {
    try {
      await signInUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back 👋",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from);
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Invalid credentials. Please try again.",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInGoogle();

      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from);
    } catch (err) {
      console.error("Google login error:", err);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message || "Please try again.",
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-md shadow-2xl p-6">
      <h3 className="text-3xl font-semibold text-center">
        Welcome Back
      </h3>
      <p className="text-center text-gray-500 mb-4">
        Login to continue your journey
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
        {/* Email */}
        <div>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full pr-10"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-xs mt-1">
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-xs" />
            <span className="text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-blue-500 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          className="btn btn-neutral w-full mt-4"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-3 text-xs text-gray-400 uppercase">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center gap-2"
        type="button"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-4 h-4"
        />
        Continue with Google
      </button>

      {/* Register link */}
      <p className="text-center text-sm mt-4">
        Don&apos;t have an account?
        <Link to="/register" className="text-blue-400 underline ml-1">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;