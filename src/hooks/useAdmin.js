// src/hooks/useAdmin.js
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  const baseURL =
    import.meta.env.VITE_API_URL || "https://hotel-booking-management-system-ser.vercel.app";

  useEffect(() => {
    if (!user?.email || loading) return;

    setAdminLoading(true);

    fetch(`${baseURL}/users/${user.email}/role`) // বা `/user-by-email/${email}` যদি এভাবে থাকো
      .then((res) => res.json())
      .then((data) => {
        // যদি backend এ {role: 'admin'} ফেরত পাঠাও
        setIsAdmin(data?.role === "admin");
      })
      .catch((err) => {
        console.error("useAdmin error:", err);
        setIsAdmin(false);
      })
      .finally(() => setAdminLoading(false));
  }, [user, loading, baseURL]);

  return [isAdmin, adminLoading];
};

export default useAdmin;