import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../libs/AppContext";
import CartItem from "./products/CartItem";
import { Link } from "react-router-dom";

const CartSidebar = ({
  setIsCartOpened,
  isCartOpened,
}: {
  setIsCartOpened: (isOpen: boolean) => void;
  isCartOpened: boolean;
}) => {
  const { user, clearCart } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      user?.cart.cartProducts.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0) || 0
    );
  }, [user]);
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/80 transition-opacity duration-300 ${
          isCartOpened
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpened(false)}
      />

      <div
        className={`fixed right-0 top-0 h-full w-1/4 bg-white shadow-lg z-30 ${
          isCartOpened ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="h-full w-full overflow-scroll scroll-container p-10 flex flex-col items-center justify-between gap-5">
          <div className="w-full">
            <div className="flex items-center justify-between mb-5 w-full">
              <h1 className="text-lg uppercase">Shopping Cart</h1>
              <FontAwesomeIcon
                icon={faX}
                className="text-[#FF0000] hover:scale-110 hover:rotate-180 cursor-pointer"
                onClick={() => setIsCartOpened(false)}
              />
            </div>
            <div className="w-full">
              {user?.cart.cartProducts.length == 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-center">No Products added in cart</p>
                  <Link
                    onClick={() => setIsCartOpened(false)}
                    to={"/products"}
                    className="w-full p-3 mt-5 text-center text-[#FFCC00] bg-[#1E1D23] rounded-lg hover:scale-105 hover:shadow-md hover:shadow-[#FFCC00] cursor-pointer"
                  >
                    {"Go Back To Shopping"}
                  </Link>
                </div>
              ) : (
                <div className="w-full">
                  {user?.cart.cartProducts.map((el, i) => {
                    return (
                      <CartItem
                        key={i}
                        product={el.product}
                        productQuantity={el.quantity}
                        cartProductId={el.id}
                        totalPrice={totalPrice}
                        setTotalPrice={setTotalPrice}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {user?.cart.cartProducts.length != 0 && (
            <div className="flex items-center justify-between gap-5 w-full">
              <Link
                onClick={() => setIsCartOpened(false)}
                to={"/cart"}
                className="w-full p-3 text-center text-[#FFCC00] bg-[#1E1D23] rounded-lg hover:scale-105 hover:shadow-md hover:shadow-[#FFCC00] cursor-pointer"
              >
                {"Checkout - $" + totalPrice.toFixed(2)}
              </Link>
              <button
                className="w-full p-3 text-center text-[#FFCC00] bg-[#1E1D23] rounded-lg hover:scale-105 hover:shadow-md hover:shadow-[#FFCC00] cursor-pointer"
                onClick={() => clearCart()}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
