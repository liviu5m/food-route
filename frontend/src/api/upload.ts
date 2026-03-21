import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function uploadImage(data: FormData) {
  const response = await axios.post(baseUrl + "/api/upload", data, {
    withCredentials: true,
  });
  return response.data;
}
