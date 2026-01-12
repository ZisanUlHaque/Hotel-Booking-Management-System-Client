// src/pages/Dashboard/DashboardHome.jsx
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAdmin from "../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();

  // Admin stats
  const {
    data: adminStats,
    isLoading: adminLoading,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    enabled: isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-stats");
      return res.data;
    },
  });

  // User bookings
  const {
    data: userBookings = [],
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["dashboard-user-bookings", user?.email],
    enabled: !isAdmin && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${encodeURIComponent(user.email)}`
      );
      return res.data;
    },
  });

  if (isAdmin && adminLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!isAdmin && userLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const firstName = user?.displayName?.split(" ")[0] || "Traveler";

  /* ---------------------- USER DASHBOARD VIEW ---------------------- */
  if (!isAdmin) {
    const total = userBookings.length;
    const paid = userBookings.filter(
      (b) => b.paymentStatus === "paid"
    ).length;
    const upcoming = userBookings.filter((b) => {
      if (!b.travelDate) return false;
      const d = new Date(b.travelDate);
      return d >= new Date();
    }).length;
    const cancelled = userBookings.filter(
      (b) => b.status === "cancelled"
    ).length;
    const completed = userBookings.filter(
      (b) => b.status === "completed"
    ).length;

    return (
      <div className="p-6 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="opacity-90 mt-1">
            Here’s a quick overview of your trips and bookings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Bookings"
            value={total}
            icon="📊"
            color="bg-blue-50"
          />
          <StatCard
            title="Paid Bookings"
            value={paid}
            icon="💳"
            color="bg-green-50"
          />
          <StatCard
            title="Upcoming Trips"
            value={upcoming}
            icon="🧳"
            color="bg-amber-50"
          />
          <StatCard
            title="Completed Trips"
            value={completed}
            icon="✅"
            color="bg-emerald-50"
          />
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
          </div>
          {userBookings.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              You have no bookings yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {userBookings.slice(0, 3).map((b) => (
                <div
                  key={b._id}
                  className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {b.tourTitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      {b.travelDate} •{" "}
                      {b.guests || b.numberOfGuests} guest(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      ${b.finalPrice || b.originalTotal}
                    </p>
                    <p className="text-[11px] text-gray-500 capitalize">
                      {b.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="p-3 text-center">
            <a
              href="/dashboard/my-booking"
              className="text-primary text-sm font-medium"
            >
              View All My Bookings →
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------- ADMIN DASHBOARD VIEW --------------------- */
  const stats = adminStats || {
    totalBookings: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    totalRevenue: 0,
    totalUsers: 0,
    bookingChartData: [],
    recentBookings: [],
  };

  const bookingData = stats.bookingChartData || [];
  const statusData = [
    { name: "Confirmed", value: stats.confirmed || 0 },
    { name: "Pending", value: stats.pending || 0 },
    { name: "Cancelled", value: stats.cancelled || 0 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="opacity-90 mt-1">
          Here’s what’s happening across the platform today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings || 0}
          icon="📊"
          color="bg-blue-50"
        />
        <StatCard
          title="Confirmed"
          value={stats.confirmed || 0}
          icon="✅"
          color="bg-green-50"
        />
        <StatCard
          title="Pending"
          value={stats.pending || 0}
          icon="⏳"
          color="bg-amber-50"
        />
        <StatCard
          title="Revenue"
          value={`$${(
            (stats.totalRevenue || 0) / 100
          ).toLocaleString()}`}
          icon="💰"
          color="bg-purple-50"
        />
      </div>

      {/* Charts & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Bookings (Last 6 Months)
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="bookings"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">
            Booking Status
          </h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map((entry, index) => (
              <div
                key={entry.name}
                className="flex items-center gap-2 text-sm"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span>
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-3">Tour</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(stats.recentBookings || []).map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">
                    {b.tourTitle}
                  </td>
                  <td className="px-6 py-4">{b.userEmail}</td>
                  <td className="px-6 py-4">{b.travelDate}</td>
                  <td className="px-6 py-4 font-semibold">
                    ${b.finalPrice || b.originalTotal || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs capitalize ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : b.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : b.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(stats.recentBookings || []).length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Stat card
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${color}`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  </div>
);

export default DashboardHome;