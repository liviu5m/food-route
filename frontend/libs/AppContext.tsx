"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { Product, User } from "./Types";
import Loader from "../src/components/elements/Loader";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFunc } from "../src/api/user";
import {
  addProductToCart,
  clearCartProducts,
  removeProductFromCart,
} from "../src/api/cart";
import { queryClient } from "../src/App";
import { createFavoriteFunc, deleteFavoriteFunc } from "../src/api/favorite";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  managedCart: (
    productId: number,
    type: string,
    isToast?: boolean,
    quantity?: number,
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
  const [cartLoading, setCartLoading] = useState(-1); // here something to do
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cartProductId, setCartProductId] = useState(-1);
  const [favoriteProductId, setFavoriteProductId] = useState(-1);

  const { data, isPending } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUserFunc(),
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  const managedCart = (
    productId: number,
    type: string,
    isToast = true,
    quantity = 1,
  ) => {
    setCartLoading(productId);
    setCartLoading(productId);
    if (!user) navigate("/auth/login");
    if (type == "add") addToCart({ productId, quantity });
    else removeFromCart(productId);
  };

  const { mutate: addToCart } = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => addProductToCart(productId, quantity, user?.cart.id || -1),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Product added to cart successfully!");
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      setCartLoading(-1);
    },
    onError: (err) => {
      console.log(err);
      setCartLoading(-1);
    },
  });

  const { mutate: removeFromCart } = useMutation({
    mutationFn: (id: number) => removeProductFromCart(id),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Product removed from cart successfully!");
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      setCartLoading(-1);
    },
    onError: (err) => {
      console.log(err);
      setCartLoading(-1);
    },
  });

  const { mutate: clearCart } = useMutation({
    mutationFn: () => clearCartProducts(user?.cart.id || -1),
    onSuccess: (data) => {
      console.log(data);
      toast("Cart Cleared");
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const manageFavorite = (product: Product, type: string) => {
    setFavoriteProductId(product.id);
    if (type == "create") createFavorite(product);
    else deleteFavorite(product);
  };

  const { mutate: addFavorite } = useMutation({
    mutationFn: (productId: number) =>
      createFavoriteFunc(productId, user?.id || -1),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: deleteFavoriteItem } = useMutation({
    mutationFn: (productId: number) =>
      deleteFavoriteFunc(productId, user?.id || -1),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
    addFavorite(product.id);
  };

  const deleteFavorite = (product: Product) => {
    if (user)
      setUser({
        ...user,
        favorites: user.favorites.filter((fav) => fav.product.id != product.id),
      });
    deleteFavoriteItem(product.id);
  };

  return isPending || (data && !user) ? (
    <Loader />
  ) : (
    <AppContext.Provider
      value={{
        user,
        setUser,
        managedCart,
        cartLoading,
        manageFavorite,
        clearCart,
      }}
    >
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
