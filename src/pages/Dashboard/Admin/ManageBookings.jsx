// src/pages/Dashboard/Admin/ManageBookings.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const updateStatus = async (bookingId, status) => {
    try {
      const result = await Swal.fire({
        title: `${status === 'confirmed' ? 'Confirm' : 'Cancel'} Booking?`,
        text: `Are you sure you want to ${status === 'confirmed' ? 'confirm' : 'cancel'} this booking?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: status === 'confirmed' ? '#10b981' : '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: `Yes, ${status} it!`
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/bookings/${bookingId}`, {
          status,
        });
        
        Swal.fire({
          icon: "success",
          title: `Booking ${status}!`,
          text: `The booking has been ${status} successfully.`,
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (err) {
      console.error("Status update error:", err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err.response?.data?.message || "Failed to update booking status",
      });
    }
  };

  const viewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  if (isLoading) {
    return (

<div class="flex-col gap-4 w-full flex items-center justify-center">
  <div
    class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
</div>

    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Manage All Bookings ({bookings.length})
        </h2>
        <div className="flex gap-2">
          <span className="badge badge-success">
            Confirmed: {bookings.filter(b => b.status === 'confirmed').length}
          </span>
          <span className="badge badge-warning">
            Pending: {bookings.filter(b => b.status === 'pending').length}
          </span>
          <span className="badge badge-error">
            Cancelled: {bookings.filter(b => b.status === 'cancelled').length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs text-gray-600 uppercase tracking-wider">
                <th className="px-4 py-3">User Info</th>
                <th className="px-4 py-3">Tour Details</th>
                <th className="px-4 py-3">Travel Date</th>
                <th className="px-4 py-3">Guests</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {booking.userName || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.userEmail}
                      </p>
                      {booking.phone && (
                        <p className="text-xs text-gray-500">
                          📞 {booking.phone}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.tourTitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {booking.tourId}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-700">{booking.travelDate}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge badge-ghost">
                      {booking.guests || booking.numberOfGuests} 👥
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">
                      ${booking.finalPrice || booking.originalTotal}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.paymentStatus === "paid" ? "✓ Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-center">
                      {booking.status !== 'confirmed' && (
                        <button
                          onClick={() => updateStatus(booking._id, "confirmed")}
                          className="btn btn-xs btn-success text-white"
                        >
                          Confirm
                        </button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => updateStatus(booking._id, "cancelled")}
                          className="btn btn-xs btn-error text-white"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => viewDetails(booking)}
                        className="btn btn-xs btn-ghost"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
              <p><strong>Tour:</strong> {selectedBooking.tourTitle}</p>
              <p><strong>Customer:</strong> {selectedBooking.userName}</p>
              <p><strong>Email:</strong> {selectedBooking.userEmail}</p>
              <p><strong>Travel Date:</strong> {selectedBooking.travelDate}</p>
              <p><strong>Guests:</strong> {selectedBooking.guests || selectedBooking.numberOfGuests}</p>
              <p><strong>Total Amount:</strong> ${selectedBooking.finalPrice || selectedBooking.originalTotal}</p>
              <p><strong>Status:</strong> <span className="badge">{selectedBooking.status}</span></p>
              <p><strong>Payment:</strong> <span className="badge">{selectedBooking.paymentStatus}</span></p>
              {selectedBooking.transactionId && (
                <p><strong>Transaction ID:</strong> {selectedBooking.transactionId}</p>
              )}
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedBooking(null)}>Close</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop" onClick={() => setSelectedBooking(null)}>
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManageBookings;