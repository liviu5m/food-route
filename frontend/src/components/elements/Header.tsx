import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronDown,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../../libs/AppContext";
import CartSidebar from "./CartSidebar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Header = () => {
  const { pathname } = useLocation();

  const { user, setUser } = useAppContext();
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [isFavoriteOpened, setIsFavoriteOpened] = useState(false);

  return (
    <div className="relative z-50 w-full">
      <div
        className={`w-full bg-white fixed top-0 left-0 right-0 shadow-md z-50 h-24 flex items-center justify-center`}
      >
        <div className="bg-white flex items-center justify-center w-full">
          <div className="container">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center justify-center gap-5">
                <img className="w-8" src="./imgs/logo.png" alt="" />
                <h2 className="text-3xl font-bold text-[#FFCC00]">FoodRoute</h2>
              </Link>
              <ul className="flex items-center justify-center gap-10">
                <Link
                  to="/"
                  className={`hover:text-[#FFCC00] font-semibold  ${
                    pathname == "/" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={`hover:text-[#FFCC00] font-semibold ${
                    pathname == "/products"
                      ? "text-[#FFCC00]"
                      : "text-[#1E1D23]"
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/orders"
                  className={`hover:text-[#FFCC00] font-semibold ${
                    pathname == "/orders" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Orders
                </Link>
                <Link
                  to="/contact"
                  className={`hover:text-[#FFCC00] font-semibold ${
                    pathname == "/contact" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Contact
                </Link>
              </ul>
              <div className="flex items-center justify-center gap-10">
                {user ? (
                  <div className="flex items-center justify-center gap-5">
                    <button
                      className=" inline-flex w-full justify-center gap-x-1.5 text-sm shadow-xs ring-gray-300 px-16 h-12 outline-none bg-[#FFCC00] text-[#1E1D23] rounded-lg font-semibold hover:text-[#FFCC00] hover:bg-[#1E1D23] items-center gap-5 border-none cursor-pointer"
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
                      className="dropdown menu w-52 rounded-box bg-white shadow-sm"
                      popover="auto"
                      id="popover-1"
                      style={
                        {
                          positionAnchor: "--anchor-1",
                        } as React.CSSProperties
                      }
                    >
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Account Data
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("jwtToken");
                            setUser(null);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                    <div className="flex items-center justify-center gap-5">
                      <div className="relative">
                        <button
                          className="h-12 w-12 bg-[#FFCC00] text-[#1E1D23] rounded-lg flex items-center justify-center hover:bg-[#1E1D23] hover:text-[#FFCC00] cursor-pointer"
                          onClick={() => setIsCartOpened(!isCartOpened)}
                        >
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {user.cart.cartProducts.length}
                        </span>
                      </div>
                      <div className="relative">
                        <Link
                          to="/wishlist"
                          className="h-12 w-12 bg-[#FFCC00] text-[#1E1D23] rounded-lg flex items-center justify-center hover:bg-[#1E1D23] hover:text-[#FFCC00] cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </Link>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {user.favorites.length}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="px-8 py-3 bg-[#FFCC00] text-[#1E1D23] rounded-lg font-semibold hover:text-[#FFCC00] hover:bg-[#1E1D23]"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/auth/signup"
                      className="px-8 py-3 bg-[#1E1D23] text-[#FFCC00] rounded-lg font-semibold hover:text-[#1E1D23] hover:bg-[#FFCC00]"
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
      </div>
    </div>
  );
};

export default Header;
