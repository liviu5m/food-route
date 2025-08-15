import React, { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import ProductsFilter from "./ProductsFilter";
import type { Category } from "../../../../libs/Types";
import { useParams, useSearchParams } from "react-router-dom";
import FilterSidebar from "../FilterSidebar";

const ProductDisplay = () => {
  const [prices, setPrices] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [search, setSearch] = useState("");
  const [sortingType, setSortingType] = useState("default");
  const [save, setSave] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = Number(searchParams.get("categoryId")) || -1;
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryId ? categoryId : -1);
  }, [categoryId]);

  return (
    <div className="flex w-full my-10 gap-10">
      <ProductsContainer
        prices={prices}
        selectedCategory={selectedCategory}
        search={search}
        save={save}
        sortingType={sortingType}
        setSortingType={setSortingType}
        setIsSidebarOpened={setIsSidebarOpened}
      />
      <ProductsFilter
        prices={prices}
        setPrices={setPrices}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        search={search}
        setSearch={setSearch}
        save={save}
        setSave={setSave}
        sortingType={sortingType}
      />
      <FilterSidebar
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
        prices={prices}
        setPrices={setPrices}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        search={search}
        setSearch={setSearch}
        save={save}
        setSave={setSave}
        sortingType={sortingType}
      />
    </div>
  );
};

export default ProductDisplay;
