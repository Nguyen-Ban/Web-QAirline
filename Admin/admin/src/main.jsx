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
        path: "/add-post",
        element: <PostForm />,
      },
      {
        path: "/planes",
        element: <Planes />,
      },
      {
        path: "/add-plane",
        element: <PlaneForm />,
      },
      {
        path: "/flights",
        element: <Flights />,
      },
      {
        path: "/add-flight",
        element: <FlightForm />,
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
