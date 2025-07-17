// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
