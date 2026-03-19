import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export async function getCategories(currentPage: number) {
  const response = await axios.get(
    baseUrl + `/api/category?page=${currentPage}&size=10`,
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function deleteCategoryFunc(id: number) {
  const response = await axios.delete(baseUrl + "/api/category/" + id, {
    withCredentials: true,
  });
  return response.data;
}
