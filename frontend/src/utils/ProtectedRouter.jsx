import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({ user, children, redirectTo = "/home" }) => {
  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};
