import React from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  const user = localStorage.getItem("userEmail");

  if (!user) {
    // user not logged in → redirect to login
    return <Navigate to="/LoginForm" replace />;
  }

  // user is logged in → render children (protected route)
  return children;
}
