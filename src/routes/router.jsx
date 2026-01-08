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
    Component:AuthLayout,
    children : [
      {
        path: "/register",
        Component: Register
      },
      {
        path: "/login",
        Component: Login
      }
    ]
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
    element: (<PrivateRoute>
      <TourDetails></TourDetails>
    </PrivateRoute>),
    loader: async ({ params }) => {
      const res = await fetch("/tours.json");
      const data = await res.json();
      const tour = data.find((t) => t.id === parseInt(params.id));
      return tour;
    },
  },
]);
