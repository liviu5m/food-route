"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { User } from "./Types";
import Loader from "../src/components/elements/Loader";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  getUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = () => {
    const jwt = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
    if (jwt) {
      localStorage.setItem("jwtToken", jwt);
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    axios
      .get("http://localhost:8080/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("jwtToken");
        setLoading(false);
      });
  };
  useEffect(() => getUser(), []);

  return loading ? (
    <Loader />
  ) : (
    <AppContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
