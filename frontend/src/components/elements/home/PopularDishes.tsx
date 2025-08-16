import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategories } from "../../../api/categories";
import { getProduct } from "../../../api/products";
import type { Category, Product as ProductType } from "../../../../libs/Types";
import Loader from "../Loader";
import ProductCard from "../products/ProductCard";
import { Link } from "react-router-dom";

const PopularDishes = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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
      <div className="container">
        <div className="py-20 flex items-center justify-center flex-col">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Popular dishes
          </h1>
          <div className="hidden md:flex items-center justify-center gap-10 mt-8">
            {categories.content.map((category: Category, i: number) => {
              return (
                <div
                  key={i}
                  className={`px-10 py-5 rounded-2xl border border-[#EDEDED] text-lg font-semibold  cursor-pointer ${
                    selectedCategory == category.id
                      ? "bg-[#FFCC00]"
                      : "hover:bg-[#FFCC00]"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <h1>{category.name}</h1>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 xl:grid-cols-5 gap-10 mt-10">
            {products.content.map((product: ProductType, i: number) => {
              return <ProductCard key={i} product={product} />;
            })}
          </div>
          <Link
            to="/products"
            className="px-8 py-4 rounded-lg bg-[#FFCC00] font-semibold cursor-pointer hover:bg-[#f1c101] hover:text-white mt-5"
          >
            All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
