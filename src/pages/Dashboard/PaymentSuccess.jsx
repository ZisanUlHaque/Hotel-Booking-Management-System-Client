// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import Navbar from "../Shared/Navbar";

const PaymentSuccess = () => {
  const location = useLocation();
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);

  const baseURL =
    import.meta.env.VITE_API_URL || "https://hotel-booking-management-system-ser.vercel.app";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`${baseURL}/booking-success?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success || res.message === "already exists") {
          setData(res);
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch((err) => {
        console.error("payment-success error:", err);
        setStatus("error");
      });
  }, [location.search, baseURL]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary mb-4" />
            <p className="text-gray-600 text-sm">
              Confirming your booking...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-500 mb-4">
              We couldn't verify your payment. If money was deducted,
              please contact support.
            </p>
            <Link
              to="/dashboard/my-booking"
              className="px-6 py-2 bg-primary text-white rounded-full"
            >
              Go to My Bookings
            </Link>
          </div>
        )}

        {status === "success" && (
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">
              Payment Successful! 🎉
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Your booking has been confirmed. Get ready for your next
              adventure.
            </p>

            {data?.booking && (
              <div className="bg-gray-50 rounded-xl p-4 mb-5 text-left">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Tour:</span>{" "}
                  {data.booking.tourTitle}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Travel Date:</span>{" "}
                  {data.booking.travelDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Guests:</span>{" "}
                  {data.booking.guests}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Total Paid:</span>{" "}
                  ${data.booking.finalPrice || data.booking.originalTotal}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">
                    Transaction ID:
                  </span>{" "}
                  {data.transactionId}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <Link
                to="/dashboard/my-booking"
                className="px-6 py-2 rounded-full bg-primary text-white text-sm font-medium"
              >
                View My Bookings
              </Link>
              <Link
                to="/destination"
                className="px-6 py-2 rounded-full border border-primary text-primary text-sm font-medium"
              >
                Explore More Destinations
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;