import {
  faSearch,
  faX,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import type { Category } from "../../../libs/Types";
import Slider from "rc-slider";

const FilterSidebar = ({
  isSidebarOpened,
  setIsSidebarOpened,
  prices,
  setPrices,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
  price,
  categories,
}: {
  setIsSidebarOpened: (isOpen: boolean) => void;
  isSidebarOpened: boolean;
  prices: number[];
  setPrices: (e: number[]) => void;
  selectedCategory: number;
  setSelectedCategory: (e: number) => void;
  search: string;
  setSearch: (e: string) => void;
  price: number;
  categories: Category[];
}) => {
  const [maxPrice, setMaxPrice] = useState(0);
  const [hoverId, setHoverId] = useState<number | null>(null);

  useEffect(() => {
    if (price) {
      setMaxPrice(Math.round(price));
      setPrices([0, Math.round(price)]);
    }
  }, [maxPrice]);

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/80 transition-opacity duration-300 ${
          isSidebarOpened
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpened(false)}
      />

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full bg-white shadow-lg transition-transform duration-300 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 ${
          isSidebarOpened ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex items-center justify-between mb-5 w-full">
            <h1 className="text-lg font-semibold sm:text-xl">Filter</h1>
            <FontAwesomeIcon
              icon={faX}
              className="min-h-11 min-w-11 rounded-lg text-[#FF0000] transition-transform hover:bg-red-50 lg:hover:rotate-180 lg:hover:scale-110 cursor-pointer"
              onClick={() => setIsSidebarOpened(false)}
            />
          </div>
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
            <div className="rounded-2xl border border-[#e5e5e5] px-4 py-3 sm:px-5">
              <h2 className="text-center text-base font-bold sm:text-lg">Categories</h2>
              <div className="bg-[#FBF7E8] rounded-2xl px-4 py-3 sm:px-5 flex flex-col gap-4 mt-4 text-[#808080]">
                {categories.map((category, i) => {
                  return (
                    <div
                      key={i}
                      className={`min-h-11 flex items-center px-2 transition-colors lg:hover:text-[#FFCC00] cursor-pointer ${
                        selectedCategory == category.id && "text-[#FFCC00]"
                      }`}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory == category.id ? -1 : category.id,
                        )
                      }
                      onMouseOver={() => setHoverId(category.id)}
                      onMouseOut={() => setHoverId(null)}
                    >
                      <span className="py-2 text-sm sm:text-base">{category.name}</span>
                      <div
                        className={`border-t border-dotted pb-2 ${
                          hoverId == category.id ||
                          selectedCategory == category.id
                            ? "border-[#FFCC00]"
                            : "border-gray-400"
                        } h-px`}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative z-30">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-2xl border border-[#FFCC00] py-3 pl-4 pr-12 text-sm outline-none sm:py-4 sm:pl-5 sm:text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch as IconDefinition}
                className="absolute top-1/2 right-4 sm:right-5 -translate-y-1/2"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Filter by price</h1>
              <div className="border-t border-dotted border-gray-400 h-px my-3"></div>
              <Slider
                range
                min={0}
                max={maxPrice}
                defaultValue={prices}
                onChange={(newValue: number | number[]) => {
                  if (Array.isArray(newValue)) {
                    setPrices(newValue as [number, number]);
                  }
                }}
                trackStyle={{ background: "#FFCC00" }}
                handleStyle={{
                  borderColor: "#FFCC00",
                  backgroundColor: "white",
                  width: "18px",
                  height: "18px",
                  opacity: 1,
                }}
              />
              <h3 className="mt-3 text-sm sm:text-base text-[#808080]">
                Price: ${prices[0]} - ${prices[1]}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
