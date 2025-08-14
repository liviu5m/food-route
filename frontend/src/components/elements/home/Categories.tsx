import axios from "axios";
import React, { useEffect, useState } from "react";
import type { Category } from "../../../../libs/Types";
import { Link } from "react-router-dom";
import GlareHover from "../../../../libs/reactbits/Animations/GlareHover/GlareHover";
import AnimatedContent from "../../../../libs/reactbits/Animations/AnimatedContent/AnimatedContent";
import Loader from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../api/categories";

const Categories = () => {
  const [loading, setLoading] = useState(true);

  const { data: categoriesContent, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (isLoading) return <Loader />;
  const categories: Category[] = categoriesContent.content;

  return (
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
                <GlareHover
                  glareColor="#FFCC00"
                  glareOpacity={0.8}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  style={{
                    width: "fit",
                    height: "fit",
                    background: "transparent",
                    border: 0,
                  }}
                >
                  <img
                    className="w-30 aspect-square rounded-lg object-cover"
                    src={category.image}
                    alt=""
                  />
                </GlareHover>
                <span className="font-semibold">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
