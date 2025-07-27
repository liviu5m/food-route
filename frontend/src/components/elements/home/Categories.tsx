import axios from "axios";
import React, { useEffect, useState } from "react";
import type { Category } from "../../../../libs/Types";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/category/all", {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    categories && (
      <div className="bg-white flex items-center justify-center w-full py-10 text-[#1E1D23]">
        <div className="container">
          <h1 className="text-xl text-center mb-7 font-semibold">Categories</h1>
          <div className="flex items-center justify-center gap-8">
            {categories.map((category, i) => {
              return (
                <Link
                  to={"/products?categoryId=" + category.id}
                  key={i}
                  className="flex flex-col items-center justify-center gap-5 hover:text-[#FFCC00] cursor-pointer p-1 hover:scale-110"
                >
                  <img
                    className="w-30 aspect-square rounded-lg object-cover"
                    src={category.image}
                    alt=""
                  />
                  <span className="font-semibold">{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Categories;
