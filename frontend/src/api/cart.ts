import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function addProductToCart(
  productId: number,
  quantity: number,
  cartId: number,
) {
  const response = await axios.post(
    baseUrl + "/api/cart-product",
    {
      quantity,
      productId,
      cartId,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function removeProductFromCart(id: number) {
  const response = await axios.delete(baseUrl + "/api/cart-product/" + id, {
    withCredentials: true,
  });
  return response.data;
}

export async function clearCartProducts(cartId: number) {
  const response = await axios.delete(baseUrl + "/api/cart-product", {
    params: {
      cartId,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function updateCartProductQuantity(
  cartProductId: number,
  productId: number,
  quantity: number,
  cartId: number,
) {
  const response = await axios.put(
    import.meta.env.VITE_API_URL + "/api/cart-product/" + cartProductId,
    {
      productId,
      quantity,
      cartId,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}
