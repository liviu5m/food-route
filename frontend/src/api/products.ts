import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getProduct(
  currentPage: number,
  pageSize: number,
  prices?: number[],
  selectedCategory?: number,
  search?: string,
  sortingType?: string,
) {
  const response = await axios.get(`${baseUrl}/api/product`, {
    params: {
      page: currentPage,
      size: pageSize,
      ...(prices?.[0] !== undefined && { min: prices[0] }),
      ...(prices?.[1] !== undefined && { max: prices[1] }),
      ...(selectedCategory && { categoryId: selectedCategory }),
      ...(search?.trim() && { search: search.trim() }),
      ...(sortingType && { sortingType }),
    },
  });
  return response.data;
}

export async function createProductFunc(
  name: string,
  description: string,
  price: string | number,
  image: string,
  categoryId: string | undefined,
) {
  const response = await axios.post(
    `${baseUrl}/api/product`,
    {
      name,
      description,
      price,
      image,
      categoryId,
    },
    { withCredentials: true },
  );
  return response.data;
}

export async function updateProductFunc(
  id: number,
  name: string,
  description: string,
  price: string | number,
  image: string,
  categoryId: string | undefined,
) {
  const response = await axios.put(
    `${baseUrl}/api/product/${id}`,
    {
      name,
      description,
      price,
      image,
      categoryId,
    },
    { withCredentials: true },
  );
  return response.data;
}

export async function deleteProductFunc(id: number) {
  const response = await axios.delete(`${baseUrl}/api/product/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getProductMaxPrice() {
  const response = await axios.get(baseUrl + "/api/product/max");
  return response.data;
}

export async function getProductById(id: string) {
  const response = await axios.get(baseUrl + "/api/product/" + id);
  return response.data;
}

export async function getProductsByCategoryId(categoryId: number) {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "/api/product",
    {
      params: {
        categoryId,
      },
    },
  );
  return response.data;
}
