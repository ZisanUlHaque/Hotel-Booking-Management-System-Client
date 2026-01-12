import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import PopularDestination from "../pages/Home/PopularDestination";
import Destination from "../pages/publicPage/Destination";
import TourDetails from "../pages/Private/TourDetails";
import AboutUs from "../pages/publicPage/AboutUs";
import ContactUs from "../pages/publicPage/ContactUs";
import Blog from "../pages/publicPage/Blog";
import BlogDetails from "../pages/publicPage/BlogDetails";
import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import MyBooking from "../pages/Dashboard/MyBooking";
import DashboardLayout from "../layout/DashboardLayout";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings";
import UserProfile from "../pages/Dashboard/UserProfile";
import DashboardHome from "../pages/Dashboard/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("/tours.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  // router.jsx এ
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
path:'/dashboard',
Component: DashboardHome
      },
      {
        path: "my-booking",
        Component: MyBooking,
      },
          {
      path: "profile",
      Component: UserProfile,
    },
    ],
  },


{
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    // user routes...
    {
      path: "all-bookings",
      element: (
        <AdminRoute>
          <ManageBookings/>
        </AdminRoute>
      ),
    },
    {
      path: "users",
      element: (
        <AdminRoute>
          <ManageUsers />
        </AdminRoute>
      ),
    },
  ],
},
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-cancelled",
    element: <div className="p-10 text-center">Payment cancelled.</div>,
  },
  {
    path: "/destination",
    element: <Destination></Destination>,
    loader: () => fetch("/tours.json"),
  },
  {
    path: "/about",
    element: <AboutUs></AboutUs>,
  },
  {
    path: "/contact",
    element: <ContactUs></ContactUs>,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetails />,
  },
  {
    path: "/tour/:id",
    element: (
      <PrivateRoute>
        <TourDetails></TourDetails>
      </PrivateRoute>
    ),
    loader: async ({ params }) => {
      const res = await fetch("/tours.json");
      const data = await res.json();
      const tour = data.find((t) => t.id === parseInt(params.id));
      return tour;
    },
  },
]);
