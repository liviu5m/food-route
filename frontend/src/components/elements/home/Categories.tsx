import type { Category } from "../../../../libs/Types";
import { Link } from "react-router-dom";
import GlareHover from "../../../../libs/reactbits/Animations/GlareHover/GlareHover";
import Loader from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../api/categories";

const Categories = () => {
  const { data: categories, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });
  if (isPending) return <Loader />;

  return (
    <div className="bg-white flex w-full items-center justify-center py-10 text-[#1E1D23]">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-7 text-center text-xl sm:text-2xl font-semibold">
          Categories
        </h1>
        <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-8 overflow-y-scroll hide-scrollbar">
          {categories &&
            categories.map((category: Category, i: number) => {
              return (
                <Link
                  to={"/products?categoryId=" + category.id}
                  key={i}
                  className="flex flex-col items-center justify-center gap-4 sm:gap-5 p-1 cursor-pointer transition-transform lg:hover:scale-110 lg:hover:text-[#FFCC00]"
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
                    {category.image && (
                      <img
                        className="w-24 sm:w-28 md:w-30 aspect-square rounded-lg object-cover"
                        src={category.image}
                        alt=""
                      />
                    )}
                  </GlareHover>
                  <span className="text-sm sm:text-base font-semibold">
                    {category.name}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
