import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../../libs/AppContext";
import CartSidebar from "./CartSidebar";
import HeaderSidebar from "./HeaderSidebar";
import { useMutation } from "@tanstack/react-query";
import { logoutUserFunc } from "../../api/user";
import { queryClient } from "../../App";

const Header = () => {
  const { pathname } = useLocation();

  const { user, setUser } = useAppContext();
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logoutUserFunc(),
    onSuccess: (data) => {
      setUser(null);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="relative z-50 w-full">
      <div className="fixed left-0 right-0 top-0 z-50 flex h-20 w-full items-center justify-center bg-white shadow-md sm:h-24">
        <div className="flex w-full items-center justify-center bg-white">
          <div className="mx-auto flex w-full max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
            <div className="flex w-full items-center justify-between gap-3 sm:gap-4">
              <Link to="/" className="flex items-center justify-center gap-2 sm:gap-3">
                <img className="w-7 sm:w-8" src="./imgs/logo.png" alt="" />
                <h2 className="text-xl font-bold text-[#FFCC00] sm:text-2xl md:text-3xl">
                  FoodRoute
                </h2>
              </Link>
              <ul className="hidden items-center justify-center gap-6 lg:flex xl:gap-10">
                <Link
                  to="/"
                  className={`font-semibold transition-colors lg:hover:text-[#FFCC00] ${
                    pathname == "/" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={`font-semibold transition-colors lg:hover:text-[#FFCC00] ${
                    pathname == "/products"
                      ? "text-[#FFCC00]"
                      : "text-[#1E1D23]"
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/orders"
                  className={`font-semibold transition-colors lg:hover:text-[#FFCC00] ${
                    pathname == "/orders" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Orders
                </Link>
                <Link
                  to="/contact"
                  className={`font-semibold transition-colors lg:hover:text-[#FFCC00] ${
                    pathname == "/contact" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Contact
                </Link>
              </ul>
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                {user ? (
                  <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                    <button
                      className="hidden min-h-11 w-auto items-center justify-center gap-x-1.5 gap-3 rounded-lg border-none bg-[#FFCC00] px-4 text-sm font-semibold text-[#1E1D23] shadow-xs outline-none ring-gray-300 transition-colors lg:hover:bg-[#1E1D23] lg:hover:text-[#FFCC00] xl:inline-flex"
                      popoverTarget="popover-1"
                      style={
                        {
                          anchorName: "--anchor-1",
                        } as React.CSSProperties
                      }
                    >
                      {user.username}
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>

                    <ul
                      className="dropdown menu w-52 max-w-[90vw] rounded-box bg-white shadow-sm"
                      popover="auto"
                      id="popover-1"
                      style={
                        {
                          positionAnchor: "--anchor-1",
                        } as React.CSSProperties
                      }
                    >
                      {user.role == "admin" && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className="flex min-h-11 items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                          >
                            Admin Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          to="/account"
                          className="flex min-h-11 items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Account Data
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            logout();
                          }}
                          className="flex min-h-11 w-full items-center px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                      <div className="relative">
                        <button
                          className="hidden min-h-11 min-w-11 items-center justify-center rounded-lg bg-[#FFCC00] text-[#1E1D23] transition-colors lg:hover:bg-[#1E1D23] lg:hover:text-[#FFCC00] xl:flex"
                          onClick={() => setIsCartOpened(!isCartOpened)}
                        >
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                        <span className="hidden absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 xl:flex items-center justify-center">
                          {user.cart ? user.cart.cartProducts.length : 0}
                        </span>
                      </div>
                      <div className="relative">
                        <Link
                          to="/wishlist"
                          className="hidden min-h-11 min-w-11 items-center justify-center rounded-lg bg-[#FFCC00] text-[#1E1D23] transition-colors lg:hover:bg-[#1E1D23] lg:hover:text-[#FFCC00] xl:flex"
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </Link>
                        <span className="hidden absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 xl:flex items-center justify-center">
                          {user.favorites ? user.favorites.length : 0}
                        </span>
                      </div>
                      <button
                        className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-[#FFCC00] text-[#1E1D23] transition-colors lg:hover:bg-[#1E1D23] lg:hover:text-[#FFCC00] xl:hidden"
                        onClick={() => setIsSidebarOpened(true)}
                      >
                        <FontAwesomeIcon icon={faBars} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="min-h-11 min-w-[44px] rounded-lg bg-[#FFCC00] px-4 py-3 text-sm font-semibold text-[#1E1D23] transition-colors sm:px-5 md:px-6 lg:text-base lg:hover:bg-[#1E1D23] lg:hover:text-[#FFCC00]"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/auth/signup"
                      className="min-h-11 min-w-[44px] rounded-lg bg-[#1E1D23] px-4 py-3 text-sm font-semibold text-[#FFCC00] transition-colors sm:px-5 md:px-6 lg:text-base lg:hover:bg-[#FFCC00] lg:hover:text-[#1E1D23]"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <CartSidebar
          setIsCartOpened={setIsCartOpened}
          isCartOpened={isCartOpened}
        />
        <HeaderSidebar
          isSidebarOpened={isSidebarOpened}
          setIsSidebarOpened={setIsSidebarOpened}
        />
      </div>
    </div>
  );
};

export default Header;
