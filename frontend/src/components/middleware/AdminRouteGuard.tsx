import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../../libs/AppContext";

interface AdminRouteGuardProps {
  children: ReactNode;
}


const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppContext();

  if (
    !user ||
    (user && location.pathname.startsWith("/admin") && user.role != "admin")
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
