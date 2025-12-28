import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import PopularDestination from "../pages/Home/PopularDestination";
import Destination from "../pages/publicPage/Destination";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index: true,
            Component: Home,
            loader: () => fetch("/tours.json"),
        }
    ],
  },
  {
    path:'/destination',
    element: <Destination></Destination>,
    loader: () => fetch("/tours.json")
  }
]);