"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { Product, User } from "./Types";
import Loader from "../src/components/elements/Loader";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  getUser: () => void;
  managedCart: (
    productId: number,
    type: string,
    isToast?: boolean,
    quantity?: number
  ) => void;
  cartLoading: number;
  manageFavorite: (product: Product, type: string) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(-1);
  const navigate = useNavigate();

  const getUser = () => {
    const jwt = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
    console.log(jwt);

    if (jwt) {
      localStorage.setItem("jwtToken", jwt);
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
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
  useEffect(() => {
    getUser();
  }, []);

  const managedCart = (
    productId: number,
    type: string,
    isToast = true,
    quantity = 1
  ) => {
    if (type == "add") addToCart(productId, quantity);
    else removeFromCart(productId, type, isToast);
  };

  const addToCart = (productId: number, quantity: number) => {
    setCartLoading(productId);
    console.log(productId, user?.id);
    if (!user) navigate("/auth/login");
    axios
      .post(
        import.meta.env.VITE_API_URL + "/api/cart-product",
        {
          quantity,
          productId,
          cartId: user?.cart.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (user) {
          toast.success("Product added to cart successfully!");
          let updatedCart = user.cart;
          if (updatedCart) updatedCart.cartProducts.push(res.data);
          setUser({ ...user, cart: updatedCart });
          setCartLoading(-1);
        }
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        setCartLoading(-1);
      });
  };

  const removeFromCart = (productId: number, id: string, isToast: boolean) => {
    if (!user) navigate("/auth/login");
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/cart-product/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (user) {
          if (isToast) toast.success("Product removed from cart successfully!");
          let updatedCart = user.cart;
          if (updatedCart) {
            updatedCart.cartProducts = updatedCart.cartProducts.filter(
              (prod) => prod.product.id !== productId
            );
          }
          setUser({ ...user, cart: updatedCart });
          setCartLoading(-1);
        }
      })
      .catch((err) => {
        console.error("Error removing from cart:", err);
        setCartLoading(-1);
      });
  };

  const manageFavorite = (product: Product, type: string) => {
    if (type == "create") createFavorite(product);
    else deleteFavorite(product);
  };

  const createFavorite = (product: Product) => {
    if (user)
      setUser({
        ...user,
        favorites: [
          ...user?.favorites,
          {
            id: Math.floor(Math.random() * 1000000),
            product,
            createdAt: "",
            updatedAt: "",
          },
        ],
      });
    axios
      .post(
        import.meta.env.VITE_API_URL + "/api/favorite",
        {
          productId: product.id,
          userId: user?.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFavorite = (product: Product) => {
    if (user)
      setUser({
        ...user,
        favorites: user.favorites.filter((fav) => fav.product.id != product.id),
      });
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/favorite", {
        params: {
          productId: product.id,
          userId: user?.id,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearCart = () => {
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/cart-product", {
        params: {
          cartId: user?.cart.id,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
      })
      .then((res) => {
        if (user) {
          let updatedCart = { ...user.cart, cartProducts: [] };
          setUser({ ...user, cart: updatedCart });
        }
        toast("Cart Cleared");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <AppContext.Provider
      value={{
        user,
        setUser,
        getUser,
        managedCart,
        cartLoading,
        manageFavorite,
        clearCart,
      }}
    >
      {children}
      <ToastContainer />
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
