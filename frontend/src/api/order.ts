import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getOrdersFunc(
  userId: number,
  currentPage: number,
  pageSize: number,
) {
  const response = await axios.get(baseUrl + "/api/order/user", {
    params: {
      userId: userId,
      page: currentPage,
      size: pageSize,
    },
    withCredentials: true,
  });
  return response.data;
}
