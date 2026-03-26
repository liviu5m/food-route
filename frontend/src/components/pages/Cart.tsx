import React from "react";
import BodyLayout from "../layouts/BodyLayout";
import { useAppContext } from "../../../libs/AppContext";
import CartPageItem from "../elements/products/CartPageItem";
import StripePayment from "../elements/stripe/StripePayment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user, clearCart } = useAppContext();
  const [totalPrice, setTotalPrice] = React.useState<number>(
    user?.cart.cartProducts.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0) || 0
  );

  return (
    <BodyLayout>
      <div className="mx-auto w-full max-w-screen-xl min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-4">
          <FontAwesomeIcon icon={faShoppingBag} className="text-3xl" />
          <h1 className="text-3xl text-center font-bold">My Cart</h1>
        </div>
        <div className="flex flex-col gap-8 lg:gap-10">
          {user?.cart.cartProducts.length == 0 ? (
            <div className="mt-10 flex w-full items-center justify-center">
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-center text-lg font-semibold">
                  No Products added in cart
                </p>
                <Link
                  to={"/products"}
                  className="mt-5 w-full rounded-lg bg-[#1E1D23] p-3 text-center text-[#FFCC00] cursor-pointer transition-transform lg:hover:scale-105 lg:hover:shadow-md lg:hover:shadow-[#FFCC00]"
                >
                  {"Go Back To Shopping"}
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full">
              {user?.cart.cartProducts.map((el, i) => {
                return (
                  <CartPageItem
                    key={i}
                    product={el.product}
                    productQuantity={el.quantity}
                    cartProductId={el.id}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                  />
                );
              })}
              <div className="cart-item mt-10 mb-4 flex items-end gap-4 border-t border-[#DFDFDF] px-0 sm:px-5 py-5">
                <div className="flex justify-between w-full">
                  <h2 className="text-xl font-semibold">Total Price:</h2>
                  <h3 className="text-xl font-semibold">
                    ${totalPrice.toFixed(2)}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-0 sm:px-5">
                <button
                  onClick={() => clearCart()}
                  className="mb-2 sm:mb-10 flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#FFCC00] px-10 py-3 font-semibold text-[#1E1D23] cursor-pointer lg:hover:bg-[#1E1D23] lg:hover:text-[#FFCC00]"
                >
                  Clear
                </button>
                <StripePayment amount={Number(totalPrice)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </BodyLayout>
  );
};

export default Cart;
