import axios from "axios";
import { toast } from "react-toastify";
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

export async function createCategory(name: string, image: string) {
  
  const response = await axios.post(
    baseUrl + "/api/category",
    {
      name,
      image,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function editCategoryFunc(
  id: number,
  name: string,
  image: string,
) {
  
  const response = await axios.put(
    `${baseUrl}/api/category/${id}`,
    {
      name,
      image,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function getAllCategories() {
  const response = await axios.get(`${baseUrl}/api/category/all`, {
    withCredentials: true,
  });
  return response.data;
}
