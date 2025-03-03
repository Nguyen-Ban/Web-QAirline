import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SidebarProvider } from "./contexts/SidebarContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import Posts from "./pages/posts/Posts.jsx";
import Planes from "./pages/planes/Planes.jsx";
import Flights from "./pages/flights/Flights.jsx";
import PlaneForm from "./components/planes/PlaneForm.jsx";
import Auth from "./pages/auth/Auth.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import FlightForm from "./components/flights/FlightForm.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import EditPostForm from "./components/posts/EditPostForm.jsx";
import AddPostForm from "./components/posts/AddPostForm.jsx";

import Admins from "./pages/admins/Admins.jsx";
import AdminProfile from "./pages/adminProfile/AdminProfile.jsx";
import PrivateRoute from "./pages/private.route.jsx";
import Customers from "./pages/customers/Customers.jsx";
import AdminForm from "./components/admins/AdminForm.jsx";
import FlightPrices from "./pages/flightPrices/FlightPrices.jsx";
import FlightPriceForm from "./components/flightPrices/FlightPriceForm.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "posts", element: <Posts /> },
      { path: "posts/add", element: <AddPostForm /> },
      { path: "posts/edit/:id", element: <EditPostForm /> },
      { path: "planes", element: <Planes /> },
      { path: "planes/add", element: <PlaneForm /> },
      { path: "planes/edit/:id", element: <PlaneForm /> },
      { path: "flight-prices", element: <FlightPrices /> },
      { path: "flight-prices/add", element: <FlightPriceForm /> },
      { path: "flight-prices/edit/:id", element: <FlightPriceForm /> },
      { path: "flights", element: <Flights /> },
      { path: "flights/add", element: <FlightForm /> },
      { path: "flights/edit/:id", element: <FlightForm /> },
      { path: "customers", element: <Customers /> },
      { path: "admins", element: <Admins /> },
      { path: "admins/add", element: <AdminForm /> },
      { path: "profile", element: <AdminProfile /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SidebarProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </SidebarProvider>
  </AuthProvider>
);
