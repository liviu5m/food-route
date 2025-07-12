import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthRouteGuardProps {
  children: ReactNode;
}

const isAuthenticated = (): boolean => {
  return !localStorage.getItem("token");
};

const AuthRouteGuard: React.FC<AuthRouteGuardProps> = ({ children }) => {
  const location = useLocation();

  if (isAuthenticated() && location.pathname.startsWith("/auth")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthRouteGuard;
