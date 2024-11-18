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
