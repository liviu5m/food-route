import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createFavoriteFunc(productId: number, userId: number) {
  const response = await axios.post(
    baseUrl + "/api/favorite",
    {
      productId,
      userId,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function deleteFavoriteFunc(productId: number, userId: number) {
  const response = await axios.delete(baseUrl + "/api/favorite", {
    params: {
      productId,
      userId,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function clearFavoriteFunc(userId: number) {
  const response = await axios.delete(baseUrl + "/api/favorite/all", {
    params: {
      userId,
    },
    withCredentials: true,
  });
  return response.data;
}
