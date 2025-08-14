import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getCategories } from "../../../api/categories";
import { getProduct } from "../../../api/products";
import type { Category, Product as ProductType } from "../../../../libs/Types";
import Loader from "../Loader";
import Product from "../products/Product";
import { Link } from "react-router-dom";

const PopularDishes = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProduct(0, 10, [], -1, "", "default"),
  });

  if (isLoading || isLoadingProducts) return <Loader />;
  console.log(categories);

  return (
    <div className="flex items-center justify-center">
      <div className="container">
        <div className="py-20 flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold text-center">Popular dishes</h1>
          <div className="flex items-center justify-center gap-10 mt-8">
            {categories.content.map((category: Category, i: number) => {
              return (
                <div
                  key={i}
                  className="px-10 py-5 rounded-2xl border border-[#EDEDED] text-lg font-semibold hover:bg-[#FFCC00] cursor-pointer"
                >
                  <h1>{category.name}</h1>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-5 gap-10 mt-10">
            {products.content.map((product: ProductType, i: number) => {
              return <Product key={i} product={product} />;
            })}
          </div>
          <Link to="/products" className="px-8 py-4 rounded-lg bg-[#FFCC00] font-semibold cursor-pointer hover:bg-[#f1c101] hover:text-white mt-5">All Products</Link>
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
