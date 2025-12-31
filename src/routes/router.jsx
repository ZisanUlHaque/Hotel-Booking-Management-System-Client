import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import PopularDestination from "../pages/Home/PopularDestination";
import Destination from "../pages/publicPage/Destination";
import TourDetails from "../pages/Private/TourDetails";
import AboutUs from "../pages/publicPage/AboutUs";
import ContactUs from "../pages/publicPage/ContactUs";


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
    path: "/destination",
    element: <Destination></Destination>,
    loader: () => fetch("/tours.json"),
  },
  {
     path: "/about",
  element: <AboutUs></AboutUs>
  },
  {
     path: "/contact",
  element: <ContactUs></ContactUs>

  },
  {
    path: "/tour/:id",
    element: <TourDetails></TourDetails>,
    loader: async ({ params }) => {
      const res = await fetch("/tours.json");
      const data = await res.json();
      const tour = data.find((t) => t.id === parseInt(params.id));
      return tour;
    },
  },
]);
