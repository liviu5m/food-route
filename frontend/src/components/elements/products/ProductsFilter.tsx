import React, { useEffect, useState } from "react";
import type { Category, Product } from "../../../../libs/Types";
import axios from "axios";
import Loader from "../Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductsFilter = ({
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios.get(import.meta.env.VITE_API_URL + "/api/product/all").then((res) => {
      let maxVal = 0;
      res.data.map((product: Product) => {
        maxVal = Math.max(maxVal, product.price);
      });
      setMaxPrice(Math.round(maxVal));
      setPrices([0, Math.round(maxVal)]);
    });
    axios
      .get(import.meta.env.VITE_API_URL + "/api/category/all")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-1/5 flex flex-col gap-10">
      <div className="rounded-2xl border border-[#e5e5e5] px-5 py-3">
        <h2 className="text-center font-bold text-lg">Categories</h2>
        <div className="bg-[#FBF7E8] rounded-2xl px-5 py-3 flex flex-col gap-5 text-[#808080] mt-4">
          {categories.map((category, i) => {
            return (
              <div
                key={i}
                className={`hover:text-[#FFCC00] ${
                  selectedCategory == category.id && "text-[#FFCC00]"
                }`}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory == category.id ? -1 : category.id
                  )
                }
              >
                <span className="py-2 cursor-pointer ">{category.name}</span>
                <div className="border-t border-dotted border-gray-400 h-px"></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative z-30">
        <input
          type="text"
          placeholder="Search products..."
          className="pl-5 pr-12 py-4 border border-[#FFCC00] outline-none rounded-2xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute top-1/2 right-14 -translate-y-1/2"
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
      <button
        onClick={() => setSave(!save)}
        className="bg-[#FFCC00] text-[#1E1D23] w-full py-4 rounded-lg cursor-pointer hover:scale-110 outline-none"
      >
        Save
      </button>
    </div>
  );
};

export default ProductsFilter;
