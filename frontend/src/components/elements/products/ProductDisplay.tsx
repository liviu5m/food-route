import React, { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import ProductsFilter from "./ProductsFilter";
import type { Category } from "../../../../libs/Types";

const ProductDisplay = () => {
  const [prices, setPrices] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [search, setSearch] = useState("");
  const [sortingType, setSortingType] = useState("default");
  const [save, setSave] = useState(false);

  return (
    <div className="flex w-full my-10 gap-10">
      <ProductsContainer
        prices={prices}
        selectedCategory={selectedCategory}
        search={search}
        save={save}
        sortingType={sortingType}
        setSortingType={setSortingType}
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
    </div>
  );
};

export default ProductDisplay;
