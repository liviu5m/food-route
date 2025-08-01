import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface SessionRequiredRouteProps {
  children: ReactNode;
}

const isAuthenticated = (): boolean => {
  return localStorage.getItem("sessionId") != null;
};

const SessionRequiredRoute: React.FC<SessionRequiredRouteProps> = ({
  children,
}) => {
  const location = useLocation();
  console.log(location.pathname);

  if (
    localStorage.getItem("sessionId") == null &&
    (location.pathname == "/session/success" ||
      location.pathname == "/session/cancel")
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default SessionRequiredRoute;
