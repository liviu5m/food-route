import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../../libs/AppContext";

interface AuthRouteGuardProps {
  children: ReactNode;
}

const AuthRouteGuard: React.FC<AuthRouteGuardProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppContext();
  if (user && location.pathname.startsWith("/auth")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthRouteGuard;
