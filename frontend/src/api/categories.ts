import axios from "axios";

export async function getCategories() {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "/api/category"
  );
  return response.data;
}
