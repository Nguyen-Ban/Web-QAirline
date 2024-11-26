import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AirplaneManagement from "./pages/AirplaneManagement/AirplaneManagement.jsx";
import AddAirplane from "./pages/addAirplane/AddAirplane.jsx";
import FlightManagement from "./pages/flightManagement/FlightManagement.jsx";
import ScheduleFlight from "./pages/scheduleFlight/ScheduleFlight.jsx";
import PostManagement from "./pages/postManagement/PostManagement.jsx";
import AddPost from "./pages/addPost/AddPost.jsx";
import PassengerList from "./pages/passengerList/passengerList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/post-management",
        element: <PostManagement />,
      },
      {
        path: "/add-post",
        element: <AddPost />,
      },
      {
        path: "/airplane-management",
        element: <AirplaneManagement />,
      },
      {
        path: "/add-airplane",
        element: <AddAirplane />,
      },
      {
        path: "/flight-management",
        element: <FlightManagement />,
      },
      {
        path: "/schedule-flight",
        element: <ScheduleFlight />,
      },
      {
        path: "/passenger-list",
        element: <PassengerList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
