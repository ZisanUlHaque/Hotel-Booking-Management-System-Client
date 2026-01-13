// src/pages/Dashboard/UserProfile.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const travelStyles = [
  "Adventure",
  "Relax & Beach",
  "City & Culture",
  "Family Trips",
  "Luxury",
  "Budget Travel",
  "Solo Travel",
  "Romantic Getaway",
];

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    completed: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    // Profile load
    axiosSecure
      .get(`/users/profile/${user.email}`)
      .then((res) => {
        setProfile(res.data);
        setAvatarUrl(res.data.avatar || user.photoURL || "");
      })
      .catch((err) => console.error("Profile load error:", err));

    // Booking stats load
    axiosSecure
      .get(`/bookings?email=${encodeURIComponent(user.email)}`)
      .then((res) => {
        const bookings = res.data || [];
        const total = bookings.length;
        const completed = bookings.filter(
          (b) => b.status === "completed"
        ).length;

        setBookingStats({ total, completed });
      })
      .catch((err) => console.error("Booking stats error:", err));
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user?.email || !profile) return;
    setSaving(true);

    try {
      await axiosSecure.patch(`/users/profile/${user.email}`, {
        name: profile.name,
        phone: profile.phone,
        country: profile.country,
        travelStyle: profile.travelStyle,
        bio: profile.bio,
        avatar: avatarUrl,
      });

      Swal.fire({
        icon: "success",
        title: "Profile updated successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Could not update profile. Try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <div class="flex justify-center items-center h-screen">
        <div class="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
        <div class="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
        <div class="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
      </div>
    );
  }

  const memberSinceYear = (() => {
    const d =
      profile.memberSince ||
      profile.createdAt ||
      profile.updatedAt ||
      new Date().toISOString();
    return new Date(d).getFullYear();
  })();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-white">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur overflow-hidden border-4 border-white/50">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profile.name || "User"
                      )}&background=fff&color=6366f1`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/70">
                    {profile.name?.charAt(0) || user.email?.charAt(0)}
                  </div>
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white text-primary rounded-full p-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Name & Email */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {profile.name || "Welcome!"}
              </h1>
              <p className="text-white/80">{profile.email || user.email}</p>
              {profile.role === "admin" && (
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-medium">
                  Administrator
                </span>
              )}
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-sm btn-ghost text-white border-white/30"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email || user.email}
                disabled
                className="input input-bordered w-full bg-gray-50"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={profile.country || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
                placeholder="United States"
              />
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Travel Style
              </label>
              <select
                name="travelStyle"
                value={profile.travelStyle || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="select select-bordered w-full"
              >
                <option value="">Select style</option>
                {travelStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            {/* Avatar URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                disabled={!isEditing}
                className="input input-bordered w-full"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio / About Me
              </label>
              <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="textarea textarea-bordered w-full"
                placeholder="Tell us about yourself and your travel preferences..."
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {bookingStats.total}
              </p>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {bookingStats.completed}
              </p>
              <p className="text-sm text-gray-600">Completed Tours</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">
                {memberSinceYear}
              </p>
              <p className="text-sm text-gray-600">Member Since</p>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary flex-1"
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
