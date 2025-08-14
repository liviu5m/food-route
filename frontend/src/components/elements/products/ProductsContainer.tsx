import { useEffect, useState } from "react";
import type { Product as ProductType } from "../../../../libs/Types";
import axios from "axios";
import Product from "./Product";
import Pagination from "../Pagination";
import SmallLoader from "../SmallLoader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProduct } from "../../../api/products";
import Loader from "../Loader";

const ProductsContainer = ({
  prices,
  selectedCategory,
  search,
  sortingType,
  setSortingType,
}: {
  prices: number[];
  selectedCategory: number;
  search: string;
  save: boolean;
  sortingType: string;
  setSortingType: (e: string) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  const { data: productsData, isLoading } = useQuery({
    queryKey: [
      "products",
      { currentPage, pageSize, prices, selectedCategory, search, sortingType },
    ],
    queryFn: () =>
      getProduct(
        currentPage,
        pageSize,
        prices,
        selectedCategory,
        search,
        sortingType
      ),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="w-4/5">
      {
        <div className="mb-10">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-[#808080] text-sm">
              Showing {currentPage * pageSize + 1}-
              {currentPage * pageSize + pageSize > productsData.totalElements
                ? productsData.totalElements
                : currentPage * pageSize + pageSize}{" "}
              of {productsData.totalElements} results
            </h1>
            <div>
              <select
                value={sortingType}
                onChange={(e) => {
                  setSortingType(e.target.value);
                  setCurrentPage(0);
                }}
                className="px-5 py-3 rounded-lg bg-[#FBF7E8] outline-none text-sm"
              >
                <option value="default">Default Sorting</option>
                <option value="rating">Sort by average rating</option>
                <option value="latest">Sort by latest</option>
                <option value="low">Sort by price: low to high</option>
                <option value="high">Sort by price: high to low</option>
              </select>
            </div>
          </div>
          <div className={`w-full h-full grid grid-cols-4 mt-5 gap-10`}>
            {productsData.content.map((product: ProductType, i: number) => {
              return <Product key={i} product={product} />;
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={productsData.totalPages}
            onPageChange={setCurrentPage}
            client={true}
          />
        </div>
      }
    </div>
  );
};

export default ProductsContainer;
