import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function checkoutCart(amount: number, userId: number) {
  const response = await axios.post(
    baseUrl + "/api/payment/checkout",
    {
      amount: amount * 100,
      quantity: 1,
      name: "FoodRoute Cart Checkout",
      currency: "USD",
      userId,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function verifyPaymentFunc(sessionId: string, token: string) {
  const response = await axios.get(
    baseUrl + `/api/payment/verify?session_id=${sessionId}&token=${token}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
}
