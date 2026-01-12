// src/routes/AdminRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, adminLoading] = useAdmin();
  const location = useLocation();

  // Auth বা admin check এখনো হচ্ছে
  if (loading || adminLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    );
  }

  // User আছে এবং admin হলে pass
  if (user && isAdmin) {
    return children;
  }

  // না হলে home এ পাঠাও (বা অন্য কোথাও)
  return <Navigate to="/" state={location.pathname} replace />;
};

export default AdminRoute;