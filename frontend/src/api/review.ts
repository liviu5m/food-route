import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAllReviewsByProductId(id: string) {
  const response = await axios.get(baseUrl + "/api/review/all", {
    params: {
      productId: id,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function updateReviewById(id: number, data: any) {
  const response = await axios.put(baseUrl + "/api/review/" + id, data, {
    withCredentials: true,
  });
  return response.data;
}

export async function createReviewFunc(data: any) {
  const response = await axios.post(baseUrl + "/api/review", data, {
    withCredentials: true,
  });
  return response.data;
}

export async function getReviewsPaginated(data: any) {
  const response = await axios.get(baseUrl + "/api/review", {
    params: data,
    withCredentials: true,
  });
  return response.data;
}

export async function deleteReviewById(reviewId: number) {
  const response = await axios.delete(baseUrl + "/api/review/" + reviewId, {
    withCredentials: true,
  });
  return response.data;
}
