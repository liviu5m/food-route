import React from "react";
import BodyLayout from "../layouts/bodyLayout";
import { useAppContext } from "../../../libs/AppContext";
import CartPageItem from "../elements/products/CartPageItem";
import StripePayment from "../elements/stripe/StripePayment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { user } = useAppContext();
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
            <div className="mb-4 flex gap-4 items-end cart-item mt-10 py-5 border-t border-[#DFDFDF]">
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold">Total Price:</h2>
                <h3 className="text-xl font-semibold">
                  ${totalPrice.toFixed(2)}
                </h3>
              </div>
            </div>
          <StripePayment amount={Number(totalPrice)} />
          </div>
        </div>
      </div>
    </BodyLayout>
  );
};

export default Cart;
