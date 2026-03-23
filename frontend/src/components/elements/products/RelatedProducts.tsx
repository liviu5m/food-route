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
  console.log(products);

  return isPending ? (
    <Loader />
  ) : (
    <div className="my-20">
      <h1 className="text-center font-bold uppercase text-2xl">
        Related Products
      </h1>
      <div className="grid grid-cols-4 gap-20 mt-10">
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
