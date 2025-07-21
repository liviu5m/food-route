import { useEffect, useState } from "react";
import type { Product as ProductType } from "../../../../libs/Types";
import axios from "axios";
import Product from "./Product";
import Pagination from "../Pagination";
import SmallLoader from "../SmallLoader";

const ProductsContainer = ({
  prices,
  selectedCategory,
  search,
  save,
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
  const [products, setProducts] = useState<ProductType[]>();
  const [loading, setLoading] = useState(true);
  const [displayType, setDisplayType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 12;
  console.log(selectedCategory);

  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + `/api/product`, {
        params: {
          page: currentPage,
          size: pageSize,
          ...(prices[0] && { min: prices[0] }),
          ...(prices[1] && { max: prices[1] }),
          ...(selectedCategory && { categoryId: selectedCategory }),
          ...(search && { search }),
          ...(sortingType && { sortingType }),
        },
      })
      .then((res) => {
        console.log(res.data);
        setTotalElements(res.data.totalElements);
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentPage, save, sortingType]);

  return (
    <div className="w-4/5">
      {loading ? (
        <SmallLoader />
      ) : (
        <div className="mb-10">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-[#808080] text-sm">
              Showing {currentPage * pageSize + 1}-
              {currentPage * pageSize + pageSize > totalElements
                ? totalElements
                : currentPage * pageSize + pageSize}{" "}
              of {totalElements} results
            </h1>
            <div>
              <select
                value={sortingType}
                onChange={(e) => {
                  setSortingType(e.target.value)
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
            className={`w-full h-full ${
              displayType == "grid" &&
              products &&
              "grid grid-cols-4 mt-5 gap-10"
            }`}
          >
            {products?.map((product, i) => {
              return (
                <Product key={i} product={product} displayType={displayType} />
              );
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;
