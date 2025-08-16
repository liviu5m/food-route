import axios from "axios";

export async function getProduct(
  currentPage: number,
  pageSize: number,
  prices: number[],
  selectedCategory: number,
  search: string,
  sortingType: string
) {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "/api/product",
    {
      params: {
        page: currentPage,
        size: pageSize,
        ...(prices[0] && { min: prices[0] }),
        ...(prices[1] && { max: prices[1] }),
        ...(selectedCategory && { categoryId: selectedCategory }),
        ...(search && { search }),
        ...(sortingType && { sortingType }),
      },
    }
  );
  return response.data;
}
