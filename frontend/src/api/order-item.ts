import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createOrderItem(
  orderId: number,
  productId: number,
  quantity: number,
) {
  const response = await axios.post(
    baseUrl + "/api/order-item",
    {
      orderId,
      productId,
      quantity,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}
