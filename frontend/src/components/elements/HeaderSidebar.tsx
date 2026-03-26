import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../../libs/AppContext";

const HeaderSidebar = ({
  setIsSidebarOpened,
  isSidebarOpened,
}: {
  setIsSidebarOpened: (isOpen: boolean) => void;
  isSidebarOpened: boolean;
}) => {
  const { setUser } = useAppContext();
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
        className={`fixed right-0 top-0 z-30 h-full w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/3 2xl:w-1/4 bg-white shadow-lg ${
          isSidebarOpened ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="h-full w-full overflow-scroll scroll-container p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col items-center justify-between gap-5">
          <div className="w-full">
            <div className="flex items-center justify-between mb-5 w-full">
              <h1></h1>
              <FontAwesomeIcon
                icon={faX}
                className="min-h-11 min-w-11 rounded-lg text-[#FF0000] transition-transform hover:bg-red-50 lg:hover:scale-110 lg:hover:rotate-180 cursor-pointer"
                onClick={() => setIsSidebarOpened(false)}
              />
            </div>
            <div>
              <ul className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10">
                <Link
                  to="/"
                  className={`font-semibold lg:hover:text-[#FFCC00] ${
                    pathname == "/" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={`font-semibold lg:hover:text-[#FFCC00] ${
                    pathname == "/products"
                      ? "text-[#FFCC00]"
                      : "text-[#1E1D23]"
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/orders"
                  className={`font-semibold lg:hover:text-[#FFCC00] ${
                    pathname == "/orders" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Orders
                </Link>
                <Link
                  to="/contact"
                  className={`font-semibold lg:hover:text-[#FFCC00] ${
                    pathname == "/contact" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Contact
                </Link>
                <Link
                  to="/cart"
                  className={`font-semibold lg:hover:text-[#FFCC00] ${
                    pathname == "/cart" ? "text-[#FFCC00]" : "text-[#1E1D23]"
                  }`}
                >
                  Cart
                </Link>
                <Link
                  to="/wishlist"
                  className={`font-semibold lg:hover:text-[#FFCC00] ${
                    pathname == "/wishlist"
                      ? "text-[#FFCC00]"
                      : "text-[#1E1D23]"
                  }`}
                >
                  Wishlist
                </Link>
                <Link
                  to="/account"
                  className={`font-semibold lg:hover:text-[#FFCC00] ${
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
                    className="font-semibold block min-h-11 w-full px-4 py-2 text-left text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
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
