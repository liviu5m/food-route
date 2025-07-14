import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthRequiredRouteProps {
  children: ReactNode;
}

const isAuthenticated = (): boolean => {
  return localStorage.getItem("jwtToken") != null;
};

const AuthRequiredRoute: React.FC<AuthRequiredRouteProps> = ({ children }) => {
  const location = useLocation();
  
  if (!isAuthenticated() && location.pathname.startsWith("/account")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthRequiredRoute;
