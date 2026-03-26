import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllCategories, getCategories } from "../../../api/categories";
import { getProduct } from "../../../api/products";
import type { Category, Product as ProductType } from "../../../../libs/Types";
import Loader from "../Loader";
import ProductCard from "../products/ProductCard";
import { Link } from "react-router-dom";

const PopularDishes = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const [selectedCategory, setSelectedCategory] = useState(-1);

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", { selectedCategory }],
    queryFn: () => getProduct(0, 10, [], selectedCategory, "", "default"),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  if (isLoading || isLoadingProducts) return <Loader />;

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
          <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
            Popular dishes
          </h1>
          <div className="mt-8 hidden flex-wrap items-center justify-center gap-4 md:flex lg:gap-6 xl:gap-10">
            {categories.content &&
              categories.content.map((category: Category, i: number) => {
                return (
                  <div
                    key={i}
                    className={`min-h-11 rounded-2xl border border-[#EDEDED] px-6 py-3 text-sm font-semibold transition-colors sm:px-8 sm:py-4 sm:text-base lg:text-lg ${
                      selectedCategory == category.id
                        ? "bg-[#FFCC00]"
                        : "lg:hover:bg-[#FFCC00]"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <h1>{category.name}</h1>
                  </div>
                );
              })}
          </div>
          <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-10 xl:grid-cols-5">
            {products.content &&
              products.content.map((product: ProductType, i: number) => {
                return <ProductCard key={i} product={product} />;
              })}
          </div>
          <Link
            to="/products"
            className="mt-5 min-h-11 min-w-[44px] rounded-lg bg-[#FFCC00] px-6 py-3 text-sm font-semibold transition-transform sm:px-8 sm:py-4 sm:text-base lg:hover:scale-[1.01] lg:hover:bg-[#f1c101] lg:hover:text-white"
          >
            All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
