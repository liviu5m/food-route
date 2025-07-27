import axios from "axios";
import { useEffect, useState } from "react";
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

const Header = () => {
  const { pathname } = useLocation();

  const { user, setUser } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpened, setIsCartOpened] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }, []);

  return (
    <div className="relative z-50 w-full">
      <div
        className={`w-full bg-white transition-all duration-300 ${
          isScrolled ? "fixed top-0 left-0 right-0 shadow-md z-50 py-4" : "py-8"
        }`}
      >
        <div className="bg-white flex items-center justify-center w-full">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-5">
                <img className="w-8" src="./imgs/logo.png" alt="" />
                <h2 className="text-3xl font-bold text-[#FFCC00]">FoodRoute</h2>
              </div>
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
                  to="/services"
                  className={`hover:text-[#FFCC00] font-semibold ${
                    pathname == "/services"
                      ? "text-[#FFCC00]"
                      : "text-[#1E1D23]"
                  }`}
                >
                  Services
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
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-sm shadow-xs ring-gray-300 px-10 h-12 cursor-pointer outline-none bg-[#FFCC00] text-[#1E1D23] rounded-lg font-semibold hover:text-[#FFCC00] hover:bg-[#1E1D23] items-center gap-5">
                          {user.username}
                          <FontAwesomeIcon icon={faChevronDown} />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      >
                        <div className="py-1">
                          {user.role == "admin" && (
                            <MenuItem>
                              <a
                                href="/admin/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                              >
                                Admin Dashboard
                              </a>
                            </MenuItem>
                          )}
                          <MenuItem>
                            <a
                              href="/account"
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                              Account Data
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => {
                                localStorage.removeItem("jwtToken");
                                setUser(null);
                              }}
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
                            >
                              Log out
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                    <div className="flex items-center justify-center gap-5">
                      <button
                        className="h-12 w-12 bg-[#FFCC00] text-[#1E1D23] rounded-lg flex items-center justify-center hover:bg-[#1E1D23] hover:text-[#FFCC00] cursor-pointer"
                        onClick={() => setIsCartOpened(!isCartOpened)}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                      <button className="h-12 w-12 bg-[#FFCC00] text-[#1E1D23] rounded-lg flex items-center justify-center hover:bg-[#1E1D23] hover:text-[#FFCC00] cursor-pointer">
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
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
