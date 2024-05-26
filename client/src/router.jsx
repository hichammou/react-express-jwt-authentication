/* eslint-disable react/display-name */
import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <GuestGuard>
        <Outlet />
      </GuestGuard>
    ),
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
