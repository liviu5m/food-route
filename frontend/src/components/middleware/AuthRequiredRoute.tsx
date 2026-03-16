import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../../libs/AppContext";

interface AuthRequiredRouteProps {
  children: ReactNode;
}

const AuthRequiredRoute: React.FC<AuthRequiredRouteProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppContext();

  if (!user && location.pathname.startsWith("/account")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthRequiredRoute;
