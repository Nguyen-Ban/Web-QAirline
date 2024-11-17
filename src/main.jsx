import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import AircraftManagement from "./pages/aircraftManagement/AircraftManagement.jsx";
import AddAircraft from "./pages/addAircraft/AddAircraft.jsx";
import FlightManagement from "./pages/flightManagement/FlightManagement.jsx";
import ScheduleFlight from "./pages/scheduleFlight/ScheduleFlight.jsx";
import PostManagement from "./pages/postManagement/PostManagement.jsx";
import AddPost from "./pages/addPost/AddPost.jsx";

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
        path: "/aircraft-management",
        element: <AircraftManagement />,
      },
      {
        path: "/add-aircraft",
        element: <AddAircraft />,
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
        path: "/post-management",
        element: <PostManagement />,
      },
      {
        path: "/add-post",
        element: <AddPost />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
