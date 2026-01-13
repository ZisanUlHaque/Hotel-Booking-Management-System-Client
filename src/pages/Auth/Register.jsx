// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const travelStyles = [
  "Adventure",
  "Relax & Beach",
  "City & Culture",
  "Family Trips",
  "Luxury",
];

const countries = [
  "Bangladesh",
  "India",
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Japan",
  "Other",
];

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { registerUser, updateUserProfile, signInGoogle, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Password rule
  const isPasswordValid = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    return hasUppercase && hasLowercase && hasMinLength && hasSymbol;
  };

  // Password strength (visual)
  const passwordValue = watch("password") || "";
  const getPasswordStrength = () => {
    if (!passwordValue) return 0;
    let score = 0;
    if (/[A-Z]/.test(passwordValue)) score++;
    if (/[a-z]/.test(passwordValue)) score++;
    if (passwordValue.length >= 6) score++;
    if (/[^A-Za-z0-9]/.test(passwordValue)) score++;
    return score; // 0–4
  };
  const strength = getPasswordStrength();

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo?.[0];

      // 1) Firebase user create
      await registerUser(data.email, data.password);

      // 2) Optional image upload (imgbb)
      let photoURL = "";
      if (profileImg) {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const imgRes = await axios.post(image_API_URL, formData);
        photoURL = imgRes.data?.data?.url || "";
      }

      // 3) Firebase profile update
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      // 4) Optional: save user to your backend (if you want)
      const newUser = {
        name: data.name,
        email: data.email,
        avatar: photoURL,
        phone: data.phone || "",
        country: data.country || "",
        travelStyle: data.travelStyle || "",
      };

      const baseURL = import.meta.env.VITE_API_URL || "https://hotel-booking-management-system-ser.vercel.app";

      // যদি backend থাকে তখনই চালাও
      try {
        await axios.post(`${baseURL}/users`, newUser);
      } catch (err) {
        console.warn("Saving user to backend failed (optional):", err.message);
      }

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to TravelWorld ✈️",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location.state || "/");
    } catch (err) {
      console.error("Registration error:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInGoogle();
      Swal.fire({
        icon: "success",
        title: "Signed in with Google!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(location.state || "/");
    } catch (err) {
      console.error("Google sign in error:", err);
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: err.message || "Please try again.",
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-md shadow-2xl p-6">
      <h3 className="text-3xl font-semibold text-center">
        Create Your Travel Account
      </h3>
      <p className="text-center text-gray-500 mb-4">
        Join us and start planning your next adventure.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>
        {/* Name */}
        <div>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters",
              },
            })}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Photo (optional) */}
        <div>
          <input
            type="file"
            {...register("photo")}
            className="file-input file-input-bordered w-full"
          />
          <p className="text-[11px] text-gray-400 mt-1">
            Optional: Add a profile photo
          </p>
        </div>

        {/* Country */}
        <div>
          <select
            {...register("country")}
            className="select select-bordered w-full"
          >
            <option value="">Select Country (optional)</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            {...register("phone")}
            className="input input-bordered w-full"
            placeholder="Phone (optional)"
          />
        </div>

        {/* Travel Style */}
        <div>
          <select
            {...register("travelStyle")}
            className="select select-bordered w-full"
          >
            <option value="">Preferred Travel Style (optional)</option>
            {travelStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

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
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  isPasswordValid(value) ||
                  "Password must be at least 6 characters and include uppercase, lowercase, and a special character.",
              })}
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

          {/* Strength bar */}
          {passwordValue && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    className={`h-1 flex-1 rounded-full ${
                      strength >= lvl
                        ? strength <= 2
                          ? "bg-red-500"
                          : strength === 3
                          ? "bg-yellow-400"
                          : "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Use uppercase, lowercase, symbol and at least 6 characters.
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="input input-bordered w-full pr-10"
              placeholder="Confirm Password"
            />
            <span
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 text-xs mt-1">
          <input
            type="checkbox"
            {...register("terms", {
              required: "You must accept the terms to continue",
            })}
            className="checkbox checkbox-sm"
          />
          <p className="text-gray-600">
            I agree to the{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-xs mt-1">
            {errors.terms.message}
          </p>
        )}

        {/* Submit */}
        <button
          className="btn btn-neutral w-full mt-4"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-3 text-xs text-gray-400 uppercase">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Google */}
      <button
        onClick={handleGoogleSignUp}
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

      {/* Login link */}
      <p className="text-center text-sm mt-4">
        Already have an account?
        <Link to="/login" className="text-blue-400 underline ml-1">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;