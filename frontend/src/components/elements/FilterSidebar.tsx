import {
  faSearch,
  faX,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "./products/CartItem";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../../libs/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
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
  save,
  setSave,
  sortingType,
}: {
  setIsSidebarOpened: (isOpen: boolean) => void;
  isSidebarOpened: boolean;
  prices: number[];
  setPrices: (e: number[]) => void;
  selectedCategory: number;
  setSelectedCategory: (e: number) => void;
  search: string;
  setSearch: (e: string) => void;
  save: boolean;
  setSave: (e: boolean) => void;
  sortingType: string;
}) => {
  const { pathname } = useLocation();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(0);
  const [hoverId, setHoverId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "/api/category/all")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(import.meta.env.VITE_API_URL + "/api/product/max")
      .then((res) => {
        setMaxPrice(Math.round(res.data));
        setPrices([0, Math.round(res.data)]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
        className={`fixed right-0 top-0 h-full w-full sm:w-1/2 bg-white shadow-lg z-50 ${
          isSidebarOpened ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-10">
          <div className="flex items-center justify-between mb-5 w-full">
            <h1 className="text-center font-semibold text-xl">Filter</h1>
            <FontAwesomeIcon
              icon={faX}
              className="text-[#FF0000] hover:scale-110 hover:rotate-180 cursor-pointer"
              onClick={() => setIsSidebarOpened(false)}
            />
          </div>
          <div className="flex flex-col gap-10">
            <div className="rounded-2xl border border-[#e5e5e5] px-5 py-3">
              <h2 className="text-center font-bold text-lg">Categories</h2>
              <div className="bg-[#FBF7E8] rounded-2xl px-5 py-3 flex flex-col gap-5 text-[#808080] mt-4">
                {categories.map((category, i) => {
                  return (
                    <div
                      key={i}
                      className={`hover:text-[#FFCC00]  cursor-pointer ${
                        selectedCategory == category.id && "text-[#FFCC00]"
                      }`}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory == category.id ? -1 : category.id
                        )
                      }
                      onMouseOver={() => setHoverId(category.id)}
                      onMouseOut={() => setHoverId(null)}
                    >
                      <span className="py-2">{category.name}</span>
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
                className="pl-5 w-full pr-12 py-4 border border-[#FFCC00] outline-none rounded-2xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch as IconDefinition}
                className="absolute top-1/2 right-5 -translate-y-1/2"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Filter by price</h1>
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
              <h3 className="mt-3 text-[#808080]">
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
