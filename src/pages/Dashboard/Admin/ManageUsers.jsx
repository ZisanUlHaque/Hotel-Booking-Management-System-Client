// src/pages/Dashboard/Admin/ManageUsers.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role: "admin" });
      Swal.fire({
        icon: "success",
        title: "Role updated",
        text: "User is now an admin.",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      console.error("Make admin error:", err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
      });
    }
  };

  const handleDeleteUser = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/users/${id}`);
      Swal.fire({
        icon: "success",
        title: "User deleted",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      console.error("Delete user error:", err);
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Manage Users ({users.length})
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs text-gray-500">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t text-gray-700">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      u.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {u.role || "user"}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(u._id)}
                      className="px-2 py-1 text-xs rounded-full border border-primary text-primary mr-2"
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    className="px-2 py-1 text-xs rounded-full border border-red-500 text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;