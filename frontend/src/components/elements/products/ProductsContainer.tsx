import { useState } from "react";
import type { Product as ProductType } from "../../../../libs/Types";
import Product from "./ProductCard";
import Pagination from "../Pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProduct } from "../../../api/products";
import Loader from "../Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const ProductsContainer = ({
  prices,
  selectedCategory,
  search,
  sortingType,
  setSortingType,
  setIsSidebarOpened,
}: {
  prices: number[];
  selectedCategory: number;
  search: string;
  sortingType: string;
  setSortingType: (e: string) => void;
  setIsSidebarOpened: (e: boolean) => void;
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
    <div className="w-full xl:w-4/5">
      {
        <div className="mb-10 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-5">
            <div className="flex items-center justify-center gap-5">
              <h2
                className="flex xl:hidden mb-3 sm:mb-0 items-center justify-center gap-2 font-semibold"
                onClick={() => setIsSidebarOpened(true)}
              >
                <FontAwesomeIcon icon={faFilter} className="text-[#FFCC00]" />
                <span>Filter</span>
              </h2>
              <h1 className="text-[#808080] text-sm hidden sm:block">
                Showing {currentPage * pageSize + 1}-
                {currentPage * pageSize + pageSize > productsData.totalElements
                  ? productsData.totalElements
                  : currentPage * pageSize + pageSize}{" "}
                of {productsData.totalElements} results
              </h1>
            </div>
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
          <div
            className={`w-full h-full sm:grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex items-center justify-center flex-col mt-5 gap-10`}
          >
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
