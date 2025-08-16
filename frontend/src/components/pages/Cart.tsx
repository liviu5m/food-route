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
      <div className="container min-h-screen">
        <div className="flex items-center justify-center gap-4 mt-10">
          <FontAwesomeIcon icon={faShoppingBag} className="text-3xl" />
          <h1 className="text-3xl text-center font-bold">My Cart</h1>
        </div>
        <div className="flex gap-10">
          {user?.cart.cartProducts.length == 0 ? (
            <div className="flex items-center justify-center w-full mt-10">
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-center text-lg font-semibold">
                  No Products added in cart
                </p>
                <Link
                  to={"/products"}
                  className="w-full p-3 mt-5 text-center text-[#FFCC00] bg-[#1E1D23] rounded-lg hover:scale-105 hover:shadow-md hover:shadow-[#FFCC00] cursor-pointer"
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
              <div className="mb-4 flex gap-4 items-end cart-item mt-10 py-5 border-t border-[#DFDFDF] px-5">
                <div className="flex justify-between w-full">
                  <h2 className="text-xl font-semibold">Total Price:</h2>
                  <h3 className="text-xl font-semibold">
                    ${totalPrice.toFixed(2)}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between px-5">
                <button
                  onClick={() => clearCart()}
                  className="btn px-10 py-3 rounded-lg bg-[#FFCC00] text-[#1E1D23] hover:bg-[#1E1D23] hover:text-[#FFCC00] font-semibold cursor-pointer mb-10 flex items-center justify-center gap-2"
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
