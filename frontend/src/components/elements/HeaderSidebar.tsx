import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "./products/CartItem";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../../libs/AppContext";

const HeaderSidebar = ({
  setIsSidebarOpened,
  isSidebarOpened,
}: {
  setIsSidebarOpened: (isOpen: boolean) => void;
  isSidebarOpened: boolean;
}) => {
  const { user, setUser } = useAppContext();
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/80 transition-opacity duration-300 ${
          isSidebarOpened
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpened(false)}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-1/2 lg:w-1/4 bg-white shadow-lg z-30 ${
          isSidebarOpened ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="h-full w-full overflow-scroll scroll-container p-10 flex flex-col items-center justify-between gap-5">
          <div className="w-full">
            <div className="flex items-center justify-between mb-5 w-full">
              <h1></h1>
              <FontAwesomeIcon
                icon={faX}
                className="text-[#FF0000] hover:scale-110 hover:rotate-180 cursor-pointer"
                onClick={() => setIsSidebarOpened(false)}
              />
            </div>
            <div>
              <ul className="flex items-center flex-col justify-center gap-10 mt-10">
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
                <Link
                  to="/cart"
                  className={`hover:text-[#FFCC00] font-semibold ${
                    pathname == "/cart" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Cart
                </Link>
                <Link
                  to="/wishlist"
                  className={`hover:text-[#FFCC00] font-semibold ${
                    pathname == "/wishlist"
                      ? "text-[#FFCC00]"
                      : "text-[#1E1D23]"
                  }`}
                >
                  Wishlist
                </Link>
                <Link
                  to="/account"
                  className={`hover:text-[#FFCC00] font-semibold ${
                    pathname == "/account" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Account Data
                </Link>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("jwtToken");
                      setUser(null);
                    }}
                    className="font-semibold block w-full px-4 py-2 text-left text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSidebar;
