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
      <div class="flex items-center justify-center min-h-[220px]">
        <div
          class="relative w-32 h-32 text-[#002D5A]"
          aria-label="Loading"
          role="status"
        >
          <div class="absolute inset-0 rounded-full blur-md opacity-20 bg-gradient-to-tr from-[#002D5A] via-[#0892A5] to-[#C9910D]"></div>

          <svg viewBox="0 0 120 120" class="relative w-full h-full">
            <g class="origin-center animate-[spin_8s_linear_infinite]">
              <circle
                cx="60"
                cy="60"
                r="54"
                class="fill-none"
                stroke="currentColor"
                stroke-width="3"
                opacity="0.25"
              ></circle>

              <g
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                opacity="0.6"
              >
                <g class="origin-center">
                  <line x1="60" y1="6" x2="60" y2="12"></line>
                  <line x1="60" y1="108" x2="60" y2="114"></line>
                  <line x1="6" y1="60" x2="12" y2="60"></line>
                  <line x1="108" y1="60" x2="114" y2="60"></line>
                </g>

                <g>
                  <g class="origin-center">
                    <line x1="60" y1="8" x2="60" y2="12"></line>
                  </g>
                  <g class="origin-center rotate-45">
                    <line x1="60" y1="8" x2="60" y2="12"></line>
                  </g>
                  <g class="origin-center rotate-90">
                    <line x1="60" y1="8" x2="60" y2="12"></line>
                  </g>
                  <g class="origin-center rotate-[135deg]">
                    <line x1="60" y1="8" x2="60" y2="12"></line>
                  </g>
                  <g class="origin-center rotate-[22.5deg]">
                    <line x1="60" y1="8" x2="60" y2="12"></line>
                  </g>
                  <g class="origin-center rotate-[67.5deg]">
                    <line x1="60" y1="8" x2="60" y2="12"></line>
                  </g>
                  <g class="origin-center rotate-[112.5deg]">
                    <line x1="60" y1="8" x2="60" y2="12"></line>
                  </g>
                  <g class="origin-center rotate-[157.5deg]">
                    <line x1="60" y1="8" x2="60" y2="12"></line>
                  </g>
                </g>
              </g>
            </g>

            <g class="origin-center animate-[spin_5s_linear_infinite_reverse]">
              <polygon
                points="60,22 66,60 60,98 54,60"
                fill="#C9910D"
                opacity="0.95"
              ></polygon>
              <polygon
                points="22,60 60,66 98,60 60,54"
                fill="#0892A5"
                opacity="0.9"
              ></polygon>
              <circle
                cx="60"
                cy="60"
                r="6"
                fill="white"
                stroke="currentColor"
                stroke-width="2"
              ></circle>
            </g>

            <g class="origin-center animate-[swing_1.8s_ease-in-out_infinite]">
              <line
                x1="60"
                y1="60"
                x2="60"
                y2="18"
                stroke="#C9910D"
                stroke-width="3"
                stroke-linecap="round"
              ></line>
              <circle cx="60" cy="60" r="3" fill="#C9910D"></circle>
            </g>

            <g class="origin-center">
              <path
                d="M12 82 Q 24 76 36 82 T 60 82 T 84 82 T 108 82"
                fill="none"
                stroke="#0892A5"
                stroke-width="3"
                class="animate-[waveDash_2.2s_linear_infinite]"
              ></path>
              <path
                d="M12 90 Q 24 84 36 90 T 60 90 T 84 90 T 108 90"
                fill="none"
                stroke="#4E3822"
                stroke-width="2"
                opacity="0.4"
                class="animate-[waveDash_3s_linear_infinite, bob_2.4s_ease-in-out_infinite]"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users ({users.length})</h2>
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
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
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
