import React, { useEffect } from "react";
import type { Product } from "../../../../libs/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAppContext } from "../../../../libs/AppContext";

const CartItem = ({
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
    <div key={product.id} className="mb-4 flex items-center gap-4 cart-item">
      <button
        className="text-sm text-[#FF0000] cursor-pointer hover:scale-120 p-1"
        onClick={(e) => managedCart(product.id, String(cartProductId), false)}
      >
        <FontAwesomeIcon icon={faX} />
      </button>
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
      </div>
      <div className="h-full">
        <h2 className="text-md font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600">
          Price: ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center mt-2">
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
      </div>
    </div>
  );
};

export default CartItem;
