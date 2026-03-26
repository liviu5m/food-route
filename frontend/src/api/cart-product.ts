import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function clearCartProductsFunc(cartId: number) {
  const response = await axios.delete(baseUrl + "/api/cart-product", {
    params: {
      cartId,
    },
    withCredentials: true,
  });
  return response.data;
}
