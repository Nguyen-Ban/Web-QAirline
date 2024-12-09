import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { SidebarProvider } from "./contexts/SidebarContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import Posts from "./pages/posts/Posts.jsx";
import Planes from "./pages/planes/Planes.jsx";
import Flights from "./pages/flights/Flights.jsx";
import PostForm from "./components/posts/PostForm.jsx";
import PlaneForm from "./components/planes/PlaneForm.jsx";
import Auth from "./pages/auth/Auth.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import FlightForm from "./components/flights/FlightForm.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import EditPostForm from "./components/posts/EditPostForm.jsx";
import EditPlaneForm from "./components/planes/EditPlaneForm.jsx";
import AddPostForm from "./components/posts/AddPostForm.jsx";
import AddPlaneForm from "./components/planes/AddPlaneForm.jsx";
import AddFlightForm from "./components/flights/AddFlightForm.jsx";
import EditFlightForm from "./components/flights/EditFlightForm.jsx";

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
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/add",
        element: <AddPostForm />,
      },
      {
        path: "/posts/edit/:id",
        element: <EditPostForm />,
      },
      {
        path: "/planes",
        element: <Planes />,
      },
      {
        path: "/planes/add",
        element: <AddPlaneForm />,
      },
      {
        path: "/planes/edit/:id",
        element: <EditPlaneForm />,
      },
      {
        path: "/flights",
        element: <Flights />,
      },
      {
        path: "/flights/add",
        element: <AddFlightForm />,
      },
      {
        path: "/flights/edit/:id",
        element: <EditFlightForm />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider>
      <SidebarProvider>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </SidebarProvider>
    </ThemeProvider>
  </AuthProvider>
);
