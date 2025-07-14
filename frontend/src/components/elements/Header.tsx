import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { User } from "../../../libs/Types";
import { useAppContext } from "../../../libs/AppContext";

const Header = () => {
  const { pathname } = useLocation();
  
  const {user, setUser} = useAppContext();

  console.log(user);
  

  return (
    <div className="flex items-center justify-between py-8">
      <div className="flex items-center justify-center gap-5">
        <img className="w-8" src="./imgs/logo.png" alt="" />
        <h2 className="text-3xl font-bold text-[#00ADB5]">FoodRoute</h2>
      </div>
      <ul className="flex items-center justify-center gap-10">
        <Link
          to="/"
          className={`hover:text-[#00ADB5] ${
            pathname == "/" && "text-[#00ADB5]"
          }`}
        >
          Home
        </Link>
        <Link
          to="/products"
          className={`hover:text-[#00ADB5] ${
            pathname == "/products" && "text-[#00ADB5]"
          }`}
        >
          Products
        </Link>
        <Link
          to="/services"
          className={`hover:text-[#00ADB5] ${
            pathname == "/services" && "text-[#00ADB5]"
          }`}
        >
          Services
        </Link>
        <Link
          to="/contact"
          className={`hover:text-[#00ADB5] ${
            pathname == "/contact" && "text-[#00ADB5]"
          }`}
        >
          Contact
        </Link>
      </ul>
      <div className="flex items-center justify-center gap-10">
        {user ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-sm shadow-xs ring-gray-300 px-10 py-3 cursor-pointer outline-none bg-[#00ADB5] text-[#eee] rounded-lg font-semibold hover:text-[#00ADB5] hover:bg-[#eee] items-center gap-5">
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
        ) : (
          <>
            <Link
              to="/auth/login"
              className="px-8 py-3 bg-[#00ADB5] text-[#eee] rounded-lg font-semibold hover:text-[#00ADB5] hover:bg-[#eee]"
            >
              Log In
            </Link>
            <Link
              to="/auth/signup"
              className="px-8 py-3 bg-[#eee] text-[#00ADB5] rounded-lg font-semibold hover:text-[#eee] hover:bg-[#00ADB5]"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
