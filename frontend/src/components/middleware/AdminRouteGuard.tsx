import axios from "axios";
import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { User } from "../../../libs/Types";
import Loader from "../elements/Loader";

interface AdminRouteGuardProps {
  children: ReactNode;
}

const isAuthenticated = (): boolean => {
  return localStorage.getItem("jwtToken") != null;
};

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const location = useLocation();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated())
      axios
        .get("http://localhost:8080/users/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  }, []);

  if(loading) return <Loader />

  if (
    !isAuthenticated() ||
    (user && location.pathname.startsWith("/admin") && user.role != "admin")
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
