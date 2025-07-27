import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CartSidebar = ({
  setIsCartOpened,
  isCartOpened,
}: {
  setIsCartOpened: (isOpen: boolean) => void;
  isCartOpened: boolean;
}) => {
  return (
    <div className="fixed z-20 h-screen top-0 left-0 w-full">
      <div className="flex h-full">
        <div
          className={`w-4/5 h-full bg-black/80 ${
            isCartOpened ? "z-30 opacity-100" : "-z-10 opacity-0"
          }`}
        ></div>
        <div
          className={`w-1/5 h-full p-10 bg-white shadow-lg z-40 ${
            isCartOpened ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-lg">Cart</h1>
            <FontAwesomeIcon
              icon={faX}
              className="text-[#FF0000] hover:scale-110 hover:rotate-180 cursor-pointer"
              onClick={() => setIsCartOpened(!isCartOpened)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
