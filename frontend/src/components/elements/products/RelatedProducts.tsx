import { useEffect, useState } from "react";
import type { Product as ProductType } from "../../../../libs/Types";
import axios from "axios";
import Product from "./ProductCard";

const RelatedProducts = ({ product }: { product: ProductType }) => {
  const [products, setProducts] = useState<ProductType[]>();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/product", {
        params: {
          categoryId: product.category.id,
        },
      })
      .then((res) => {
        setProducts(res.data.content.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(products);

  return (
    <div className="my-20">
      <h1 className="text-center font-bold uppercase text-2xl">
        Related Products
      </h1>
      <div className="grid grid-cols-4 gap-20 mt-10">
        {products?.map((product, i) => {
          return <Product product={product} key={i} />;
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
