import type { Product as ProductType } from "../../../../libs/Types";
import Product from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategoryId } from "../../../api/products";
import Loader from "../Loader";

const RelatedProducts = ({ product }: { product: ProductType }) => {
  const { data: products, isPending } = useQuery({
    queryKey: ["get-products-category"],
    queryFn: () => getProductsByCategoryId(product.category.id),
  });

  return isPending ? (
    <Loader />
  ) : (
    <div className="my-12 sm:my-16 lg:my-20">
      <h1 className="text-center text-xl sm:text-2xl font-bold uppercase">
        Related Products
      </h1>
      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
        {products.content
          .slice(0, 4)
          ?.map((product: ProductType, i: number) => {
            return <Product product={product} key={i} />;
          })}
      </div>
    </div>
  );
};

export default RelatedProducts;
