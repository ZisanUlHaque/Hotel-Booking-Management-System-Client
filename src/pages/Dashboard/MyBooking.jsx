// src/pages/Dashboard/MyBooking.jsx
import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyBooking = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBooking", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${encodeURIComponent(user.email)}`
      );
      return res.data;
    },
  });

  // tour completed কিনা – এখন purely status দিয়ে
  const isTourCompleted = (b) => b.status === "completed";

  const handlePayNow = async (booking) => {
    // Admin confirm না করলে payment allow নয়
    if (booking.status !== "confirmed") {
      Swal.fire({
        icon: "warning",
        title: "Booking Not Confirmed",
        text: "Your booking must be confirmed by admin before payment. Please wait for confirmation.",
      });
      return;
    }

    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        bookingId: booking._id,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: "Unable to start payment. Please try again.",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text:
          error.response?.data?.message ||
          "Failed to initiate payment. Please try again.",
      });
    }
  };

  // ✅ User নিজে cancel করবে (no refund)
  const cancelBooking = async (booking) => {
    // already cancelled/completed হলে allow না
    if (booking.status === "cancelled" || booking.status === "completed") {
      return;
    }

    const result = await Swal.fire({
      title: "Cancel Booking?",
      html: `
        Are you sure you want to cancel this booking?<br/>
        <span style="color:#b91c1c;font-weight:500;">
          Note: No refund will be issued upon cancellation.
        </span>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/bookings/${booking._id}`, {
          status: "cancelled",
        });

        Swal.fire(
          "Cancelled!",
          "Your booking has been cancelled. No refund will be issued.",
          "success"
        );
        refetch();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to cancel booking. Please try again.",
        });
      }
    }
  };

  // ✅ User নিজে tour complete করবে
  const markAsCompleted = async (booking) => {
    // শুধুমাত্র paid + confirmed হলে allow করি
    if (booking.paymentStatus !== "paid" || booking.status !== "confirmed") {
      Swal.fire({
        icon: "warning",
        title: "Cannot mark as completed",
        text: "Only paid & confirmed bookings can be marked as completed.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Mark as Completed?",
      text: "Have you finished this trip?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, it's completed",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/bookings/${booking._id}`, {
          status: "completed",
        });

        Swal.fire(
          "Marked as Completed",
          "Thanks for traveling with us! 🌍",
          "success"
        );
        refetch();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update booking. Please try again.",
        });
      }
    }
  };

  if (loading || isLoading) {
    return (
      <div class="flex-col gap-4 w-full flex items-center justify-center">
        <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  const paidCount = bookings.filter((b) => b.paymentStatus === "paid").length;
  const confirmedCount = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const completedCount = bookings.filter(isTourCompleted).length;

  return (
    <div className="space-y-6">
      {/* Header summary */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Bookings ({bookings.length})</h2>
        <div className="text-sm text-gray-500 space-x-2">
          <span>{paidCount} paid</span>•<span>{confirmedCount} confirmed</span>•
          <span className="text-green-600 font-semibold">
            {completedCount} completed
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => {
          const completed = isTourCompleted(booking);

          return (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Tour Image */}
                <div className="w-full lg:w-48 h-32 lg:h-36 rounded-lg bg-gray-100 overflow-hidden">
                  {booking.tourImage ? (
                    <img
                      src={booking.tourImage}
                      alt={booking.tourTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Booking Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.tourTitle}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Booking ID: {booking._id}
                      </p>
                    </div>

                    {/* Status badges */}
                    <div className="flex flex-wrap gap-2 justify-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : booking.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.paymentStatus === "paid" ? "✓ Paid" : "Unpaid"}
                      </span>
                      {completed && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          ✅ Trip Completed
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Travel Date</p>
                      <p className="font-medium">📅 {booking.travelDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Guests</p>
                      <p className="font-medium">
                        👥 {booking.guests || booking.numberOfGuests}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Amount</p>
                      <p className="font-semibold text-lg text-primary">
                        ${booking.finalPrice || booking.originalTotal}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Booked On</p>
                      <p className="font-medium">
                        {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2 items-center">
                    {/* Pay Now – confirmed, unpaid, not completed */}
                    {!completed &&
                      booking.paymentStatus !== "paid" &&
                      booking.status === "confirmed" && (
                        <button
                          onClick={() => handlePayNow(booking)}
                          className="btn btn-primary btn-sm"
                        >
                          💳 Pay Now
                        </button>
                      )}

                    {/* Waiting text */}
                    {!completed &&
                      booking.paymentStatus !== "paid" &&
                      booking.status === "pending" && (
                        <div className="text-sm text-amber-600 flex items-center gap-1">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Waiting for admin confirmation
                        </div>
                      )}

                    {/* Mark Completed – only if paid + confirmed + not already completed */}
                    {!completed &&
                      booking.paymentStatus === "paid" &&
                      booking.status === "confirmed" && (
                        <button
                          onClick={() => markAsCompleted(booking)}
                          className="btn btn-success btn-sm"
                        >
                          ✅ Mark as Completed
                        </button>
                      )}

                    {/* Cancel Booking – not cancelled & not completed */}
                    {!completed && booking.status !== "cancelled" && (
                      <button
                        onClick={() => cancelBooking(booking)}
                        className="btn btn-ghost btn-sm text-error"
                      >
                        Cancel Booking
                      </button>
                    )}

                    {completed && (
                      <div className="text-sm text-emerald-600">
                        Thanks for traveling with us! 🌍
                      </div>
                    )}

                    {booking.transactionId && (
                      <div className="text-xs text-gray-500 ml-auto">
                        Transaction: {booking.transactionId}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {bookings.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H9m0-2h6a2 2 0 012 2v2M9 3a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-500 mb-4">You have no bookings yet.</p>
            <a href="/destination" className="btn btn-primary">
              Browse Tours
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
