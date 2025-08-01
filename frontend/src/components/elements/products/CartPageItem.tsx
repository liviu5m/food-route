import React, { useEffect } from "react";
import type { Product } from "../../../../libs/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAppContext } from "../../../../libs/AppContext";

const CartPageItem = ({
  product,
  productQuantity,
  cartProductId,
  totalPrice,
  setTotalPrice,
}: {
  product: Product;
  productQuantity: number;
  cartProductId: number;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}) => {
  const [quantity, setQuantity] = React.useState(productQuantity);
  const { user, managedCart } = useAppContext();

  useEffect(() => {
    if (quantity != productQuantity) {
      axios
        .put(
          import.meta.env.VITE_API_URL + "/api/cart-product/" + cartProductId,
          {
            productId: product.id,
            quantity: quantity,
            cartId: user?.cart.id,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [quantity]);

  return (
    <div
      key={product.id}
      className="mb-4 flex gap-4 cart-item mt-10 py-5 border-t border-[#DFDFDF]"
    >
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-80 h-60 object-cover rounded"
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="h-full flex justify-between w-full items-start">
          <div>
            <h2 className="text-xl font-semibold ">{product.name}</h2>
            <h4 className="text-[#808080]">{product.category.name}</h4>
          </div>
          <p className=" text-gray-600">Price: ${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F4EF] text-xs font-bold cursor-pointer hover:text-[#FFCC00] outline-none"
              onClick={() => {
                setQuantity(quantity > 1 ? quantity - 1 : quantity);
                if (quantity > 1) setTotalPrice(totalPrice - product.price);
              }}
            >
              <FontAwesomeIcon icon={faMinus} className="text-sm " />
            </button>
            <span className="font-semibold w-8 flex items-center justify-center">
              {quantity}
            </span>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F4EF] text-xs font-bold cursor-pointer hover:text-[#FFCC00] outline-none"
              onClick={() => {
                setQuantity(quantity + 1);
                setTotalPrice(totalPrice + product.price);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="text-right">
            <h4>Total</h4>
            <h5 className="font-semibold">
              $ {(product.price * quantity).toFixed(2)}
            </h5>
          </div>
        </div>
        <div className="flex gap-5 text-sm ml-5">
          <button
            className="text-[#808080] cursor-pointer hover:text-[#FFCC00]"
            onClick={(e) => {
              setTotalPrice(totalPrice - product.price * quantity);
              managedCart(product.id, String(cartProductId), false);
            }}
          >
            Remove
          </button>
          <button
            className="text-[#808080] cursor-pointer hover:text-[#FFCC00]"
            onClick={(e) =>
              managedCart(product.id, String(cartProductId), false)
            }
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPageItem;
