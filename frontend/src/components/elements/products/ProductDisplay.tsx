import { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import ProductsFilter from "./ProductsFilter";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../FilterSidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../api/categories";
import { getProductMaxPrice } from "../../../api/products";
import Loader from "../Loader";

const ProductDisplay = () => {
  const [prices, setPrices] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [search, setSearch] = useState("");
  const [sortingType, setSortingType] = useState("default");
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = Number(searchParams.get("categoryId")) || -1;
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryId ? categoryId : -1);
    setSearchParams();
  }, [categoryId]);

  const { data: categories, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const { data: price, isPending: isPendingPrice } = useQuery({
    queryKey: ["get-max-price"],
    queryFn: () => getProductMaxPrice(),
  });

  return isPending || isPendingPrice ? (
    <Loader />
  ) : (
    <div className="flex w-full my-10 gap-10">
      <ProductsContainer
        prices={prices}
        selectedCategory={selectedCategory}
        search={search}
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
        price={price}
        categories={categories}
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
        price={price}
        categories={categories}
      />
    </div>
  );
};

export default ProductDisplay;
